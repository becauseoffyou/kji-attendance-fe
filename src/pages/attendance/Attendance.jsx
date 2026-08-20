import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from "@mui/material";

import HeroCard from "../../components/attendance/HeroCard";
import AttendanceDialog from "../../components/attendance/AttendanceDialog";
import announcementService from "../../services/infoService";
import AnnouncementSlider from "../../components/attendance/AnnouncementSlider";
import attendanceService from "../../services/attService";
import overtimeService from "../../services/overtimeService";
import {
    getCurrentLocation,
    calculateDistance
} from "../../services/locationService";

import officeService from "../../services/officeService";

export default function Attendance() {
    const NORMAL_WORK_END = "18:00";
    const [openDialog, setOpenDialog] = useState(false);

    const [attendanceType, setAttendanceType] = useState("OFFICE");
    const [notes, setNotes] = useState("");
    const [office, setOffice] = useState(null);
    const [todayData, setTodayData] = useState(null);
    const [time, setTime] = useState(new Date());
    const [gpsReady, setGpsReady] = useState(false);
    const [status, setStatus] = useState("idle");
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [insideRadius, setInsideRadius] = useState(null);
    const [refreshingLocation, setRefreshingLocation] = useState(false);
    const [dialogAction, setDialogAction] = useState(null);
    //lebih dari 9 jam lembur?
    const [overtimeDialog, setOvertimeDialog] = useState(false);

    const [overtimeDate, setOvertimeDate] = useState("");
    const [overtimeStart, setOvertimeStart] = useState("");
    const [overtimeEnd, setOvertimeEnd] = useState("");
    const [overtimeReason, setOvertimeReason] = useState("");
    useEffect(() => {

        loadOffice();
        loadAnnouncements();

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        if (!office) return;

        loadLocation();
        loadToday();

    }, [office]);

    useEffect(() => {

        if (!openDialog) return;

        if (insideRadius === false) {

            setAttendanceType("WFH");

        } else {

            setAttendanceType("OFFICE");

        }

        setNotes("");

    }, [openDialog, insideRadius]);
    const loadOffice = async () => {

        try {

            const officeData = await officeService.getOffice();

            setOffice(officeData);

        } catch (err) {

            console.error(err);

        }

    };
    const loadAnnouncements = async () => {

        try {

            const result = await announcementService.getAll();

            setAnnouncements(result.data);

        } catch (err) {

            console.error(err);

        }

    };

    const handleCheckIn = async (image) => {

        if (!image) {
            return;

        }

        let currentLocation = location;

        if (!currentLocation) {

            currentLocation = await loadLocation();

        }

        if (!currentLocation) {

            Swal.fire({
                icon: "error",
                title: "Lokasi",
                text: "Lokasi belum berhasil didapatkan."
            });

            return;

        }

        setLoading(true);

        try {

            const file = dataURLtoFile(
                image,
                "selfie.jpg"
            );

            const formData = new FormData();

            formData.append("photo", file);

            formData.append(
                "latitude",
                currentLocation.latitude
            );

            formData.append(
                "longitude",
                currentLocation.longitude
            );

            formData.append(
                "attendance_type",
                attendanceType
            );

            formData.append(
                "notes",
                notes
            );

            const result =
                await attendanceService.checkIn(formData);
            setOpenDialog(false);
            setPhoto(null);
            setAttendanceType("OFFICE");

            setNotes("");
            await loadToday();

            await loadLocation();
            // Reset dialog




            Swal.fire({
                icon: "success",
                title: "Check In Berhasil",
                html: `
                <b>${result.office}</b><br>
                Jarak ${result.distance} meter
            `
            });

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Check In Gagal",
                text:
                    err.response?.data?.message ||
                    err.message
            });

        } finally {

            setLoading(false);

        }

    };


    const checkOvertime = (checkIn, checkOut) => {

        if (!checkIn || !checkOut) {
            return false;
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        const durationMinutes = Math.floor(
            (end - start) / 60000
        );

        return durationMinutes > 9 * 60;
    };

    const handleSubmitOvertime = async () => {

        if (!overtimeReason.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Pekerjaan Wajib Diisi",
                text: "Silakan isi pekerjaan yang dilakukan saat lembur."
            });

            return;
        }

        try {

            setLoading(true);

            await overtimeService.create({
                overtime_date: overtimeDate,
                start_time: overtimeStart,
                end_time: overtimeEnd,
                reason: overtimeReason
            });

            setOvertimeDialog(false);

            setOvertimeReason("");

            Swal.fire({
                icon: "success",
                title: "Lembur Berhasil Diajukan",
                text: "Pengajuan lembur menunggu persetujuan Manager."
            });

        } catch (err) {

            console.error(
                "CREATE OVERTIME ERROR:",
                err
            );

            Swal.fire({
                icon: "error",
                title: "Gagal Mengajukan Lembur",
                text:
                    err.response?.data?.message ||
                    "Pengajuan lembur gagal."
            });

        } finally {

            setLoading(false);

        }

    };
    const handleCheckOut = async () => {

        let currentLocation = location;

        if (!currentLocation) {

            currentLocation = await loadLocation();

        }

        if (!currentLocation) {

            Swal.fire({
                icon: "error",
                title: "Lokasi",
                text: "Lokasi belum berhasil didapatkan."
            });

            return;

        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append(
                "latitude",
                currentLocation.latitude
            );

            formData.append(
                "longitude",
                currentLocation.longitude
            );

            const result = await attendanceService.checkOut(formData);

            setOpenDialog(false);
            setPhoto(null);


            const today = await loadToday();

            await loadLocation();

            const checkoutTime = new Date();

            const overtime =
                checkOvertime(
                    todayData?.checkIn,
                    checkoutTime
                );
            // =====================================
            // CEK APAKAH JAM KERJA > 9 JAM
            // =====================================

            if (
                today?.checkIn &&
                today?.checkOut
            ) {

                const start = new Date(today.checkIn);
                const end = new Date(today.checkOut);

                const durationMinutes = Math.floor(
                    (end - start) / 60000
                );

                console.log(
                    "TOTAL JAM KERJA:",
                    durationMinutes,
                    "menit"
                );


                // Lebih dari 9 jam
                if (durationMinutes > 9 * 60) {

                    const hours =
                        Math.floor(durationMinutes / 60);

                    const minutes =
                        durationMinutes % 60;


                    const confirm = await Swal.fire({

                        icon: "question",

                        title: "Pengajuan Lembur",

                        html: `
                Jam kerja Anda adalah
                <b>${hours} jam ${minutes} menit</b>.
                <br><br>
                Apakah Anda melakukan lembur?
            `,

                        showCancelButton: true,

                        confirmButtonText:
                            "Ya, Ajukan Lembur",

                        cancelButtonText:
                            "Tidak"

                    });


                    if (confirm.isConfirmed) {

                        const todayDate =
                            new Date(today.checkOut)
                                .toISOString()
                                .split("T")[0];

                        // Tanggal lembur
                        setOvertimeDate(todayDate);

                        // Jam mulai lembur
                        setOvertimeStart(
                            NORMAL_WORK_END
                        );

                        // Jam selesai = jam checkout
                        const checkoutDate =
                            new Date(today.checkOut);

                        const checkoutHours =
                            String(
                                checkoutDate.getHours()
                            ).padStart(2, "0");

                        const checkoutMinutes =
                            String(
                                checkoutDate.getMinutes()
                            ).padStart(2, "0");

                        setOvertimeEnd(
                            `${checkoutHours}:${checkoutMinutes}`
                        );

                        // Kosongkan pekerjaan
                        setOvertimeReason("");

                        // Buka form lembur
                        setOvertimeDialog(true);
                    }

                }

            }


            // =====================================
            // ALERT CHECK OUT BERHASIL
            // =====================================

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: result.message
            });

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text:
                    err.response?.data?.message ||
                    "Check Out gagal."
            });

        } finally {

            setLoading(false);

        }

    };
    // get cordinat
    const loadLocation = async () => {

        setRefreshingLocation(true);

        try {

            const current = await getCurrentLocation();

            setLocation(current);

            if (!office) {
                setGpsReady(true);
                return current;
            }

            const meter = calculateDistance(
                current.latitude,
                current.longitude,
                Number(office.latitude),
                Number(office.longitude)
            );

            setDistance(meter);
            setInsideRadius(
                meter <= Number(office.radius)
            );
            setGpsReady(true);

            return current;

        } catch (err) {

            console.error("GPS Error:", err);

            setGpsReady(false);
            setInsideRadius(null);

            let title = "Gagal Mendapatkan Lokasi";
            let text = err.message || "Silakan coba lagi.";

            switch (err.code) {

                case 1:
                    title = "Izin Lokasi Ditolak";
                    text = "Silakan izinkan akses lokasi pada aplikasi melalui Pengaturan.";
                    break;

                case 2:
                    title = "GPS Belum Aktif";
                    text = "Aktifkan GPS terlebih dahulu, lalu tekan tombol refresh.";
                    break;

                case 3:
                    title = "GPS Timeout";
                    text = "Lokasi tidak berhasil diperoleh. Pastikan GPS aktif lalu coba lagi.";
                    break;

                default:
                    title = "Lokasi Tidak Tersedia";
                    text = err.message || "Terjadi kesalahan saat mengambil lokasi.";
            }

            await Swal.fire({
                icon: "warning",
                title,
                text,
                confirmButtonText: "OK"
            });

            return null;

        } finally {

            setRefreshingLocation(false);

        }

    };
    const dataURLtoFile = (dataurl, filename) => {

        const arr = dataurl.split(",");

        const mime = arr[0].match(/:(.*?);/)[1];

        const bstr = atob(arr[1]);

        let n = bstr.length;

        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File(
            [u8arr],
            filename,
            {
                type: mime
            }
        );

    };

    const loadToday = async () => {

        try {

            const result = await attendanceService.getToday();

            const today = result.data;

            setTodayData(today);

            if (today.checkIn && !today.checkOut) {
                setStatus("checked-in");

            } else if (today.checkIn && today.checkOut) {
                setStatus("checked-out");

            } else {
                setStatus("idle");
            }

            return today;

        } catch (err) {

            console.error(err);

            return null;

        }

    };


    return (

        <>
            <HeroCard
                time={time}
                status={status}
                insideRadius={insideRadius}
                loading={loading}
                todayData={todayData}
                gpsReady={gpsReady}
                onRetryLocation={loadLocation}
                refreshingLocation={refreshingLocation}
                onOpenAttendance={() => {

                    setDialogAction(
                        status === "checked-in"
                            ? "CHECK_OUT"
                            : "CHECK_IN"
                    );

                    setOpenDialog(true);

                }}
            />
            {/* <Box sx={{ mt: 3 }}>
                <LocationCard />
            </Box> */}
            <AnnouncementSlider announcements={announcements}
            />
            <AttendanceDialog

                open={openDialog}

                onClose={() => {

                    setOpenDialog(false);

                    setPhoto(null);

                }}
                insideRadius={insideRadius}
                attendanceType={attendanceType}
                setAttendanceType={setAttendanceType}

                cameraRef={cameraRef}
                notes={notes}
                setNotes={setNotes}
                photo={photo}

                setPhoto={setPhoto}

                loading={loading}

                status={status}

                onConfirm={
                    dialogAction === "CHECK_OUT"
                        ? handleCheckOut
                        : handleCheckIn
                }

            />
            <Dialog
                open={overtimeDialog}
                onClose={() => {
                    if (!loading) {
                        setOvertimeDialog(false);
                    }
                }}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Pengajuan Lembur
                </DialogTitle>

                <DialogContent>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        Jam kerja Anda sudah lebih dari 9 jam.
                        Silakan lengkapi pengajuan lembur.
                    </Typography>

                    <TextField
                        fullWidth
                        type="date"
                        label="Tanggal Lembur"
                        value={overtimeDate}
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled
                        sx={{ mb: 2 }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2
                        }}
                    >

                        <TextField
                            fullWidth
                            type="time"
                            label="Jam Mulai"
                            value={overtimeStart}
                            InputLabelProps={{
                                shrink: true
                            }}
                            disabled
                        />

                        <TextField
                            fullWidth
                            type="time"
                            label="Jam Selesai"
                            value={overtimeEnd}
                            InputLabelProps={{
                                shrink: true
                            }}
                            disabled
                        />

                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Pekerjaan / Keterangan"
                        placeholder="Jelaskan pekerjaan yang dilakukan saat lembur..."
                        value={overtimeReason}
                        onChange={(e) =>
                            setOvertimeReason(e.target.value)
                        }
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOvertimeDialog(false)
                        }
                        disabled={loading}
                    >
                        Nanti
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitOvertime}
                        disabled={
                            loading ||
                            !overtimeReason.trim()
                        }
                    >
                        {loading
                            ? "Mengirim..."
                            : "Ajukan Lembur"}
                    </Button>

                </DialogActions>

            </Dialog>

        </>

    );

}