import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Box } from "@mui/material";

import HeroCard from "../../components/attendance/HeroCard";
import AttendanceDialog from "../../components/attendance/AttendanceDialog";
import announcementService from "../../services/infoService";
import AnnouncementSlider from "../../components/attendance/AnnouncementSlider";
import attendanceService from "../../services/attService";

import {
    getCurrentLocation,
    calculateDistance
} from "../../services/locationService";

import officeService from "../../services/officeService";

export default function Attendance() {
    const [openDialog, setOpenDialog] = useState(false);
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

    const loadAnnouncements = async () => {

        try {

            const result = await announcementService.getAll();

            setAnnouncements(result.data);

        } catch (err) {

            console.error(err);

        }

    };

    const handleCheckIn = async () => {

        if (!photo) {

            Swal.fire({
                icon: "warning",
                title: "Foto belum diambil",
                text: "Silakan ambil foto terlebih dahulu."
            });

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
                photo,
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

            const result =
                await attendanceService.checkIn(formData);

            await loadToday();

            await loadLocation();

            setPhoto(null);

            setOpenDialog(false);

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

    const loadOffice = async () => {

        try {

            const officeData = await officeService.getOffice();

            console.log("Office API:", officeData);

            setOffice(officeData);

        } catch (err) {

            console.error(err);

        }

    };

    const handleCheckOut = async () => {

        try {

            setLoading(true);

            const result = await attendanceService.checkOut();

            await loadToday();
            await loadLocation();

            setOpenDialog(false);
            setPhoto(null);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: result.message
            });

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: err.response?.data?.message || "Check Out gagal."
            });

        } finally {

            setLoading(false);

        }

    };
    // get cordinat
    const loadLocation = async () => {

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

        setGpsReady(false);
        setInsideRadius(null);

        if (err.code === 1) {

            await Swal.fire({
                icon: "warning",
                title: "Izin Lokasi Ditolak",
                text: "Silakan izinkan akses lokasi pada aplikasi."
            });

        }

        else if (err.code === 2) {

            await Swal.fire({
                icon: "warning",
                title: "GPS Belum Aktif",
                text: "Aktifkan GPS terlebih dahulu, lalu tekan Coba Lagi."
            });

        }

        else if (err.code === 3) {

            await Swal.fire({
                icon: "warning",
                title: "GPS Timeout",
                text: "Lokasi tidak berhasil diperoleh."
            });

        }

        else {

            await Swal.fire({
                icon: "error",
                title: "Gagal Mendapatkan Lokasi",
                text: err.message || "Terjadi kesalahan."
            });

        }

        return null;

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

        } catch (err) {

            console.error(err);

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

                onOpenAttendance={() => setOpenDialog(true)}
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

                cameraRef={cameraRef}

                photo={photo}

                setPhoto={setPhoto}

                loading={loading}

                status={status}

                onConfirm={

                    status === "checked-in"

                        ? handleCheckOut

                        : handleCheckIn

                }

            />


        </>

    );

}