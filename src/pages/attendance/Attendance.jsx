import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Box } from "@mui/material";

import HeroCard from "../../components/attendance/HeroCard";
import AttendanceDialog from "../../components/attendance/AttendanceDialog";
// import AnnouncementSlider from "../../components/attendance/AnnouncementSlider";

import attendanceService from "../../services/attService";

import {
    OFFICE,
    getCurrentLocation,
    calculateDistance
} from "../../services/locationService";

export default function Attendance() {
    const [openDialog, setOpenDialog] = useState(false);

    const [todayData, setTodayData] = useState(null);
    const [time, setTime] = useState(new Date());
    const [gpsReady, setGpsReady] = useState(false);
    const [status, setStatus] = useState("idle");
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [insideRadius, setInsideRadius] = useState(null);
    useEffect(() => {
        loadLocation();
        loadToday();


        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = async () => {

        let currentPhoto = photo;

        if (!currentPhoto) {

            currentPhoto = cameraRef.current.capture();

        }

        if (!gpsReady) {

            await loadLocation();
            if (!gpsReady || !location) {

                Swal.fire({
                    icon: "error",
                    title: "Lokasi",
                    text: "Lokasi belum berhasil didapatkan."
                });

                return;

            }
        }
        setLoading(true);

        try {

            const file =
                dataURLtoFile(currentPhoto, "selfie.jpg");

            const formData = new FormData();

            formData.append("photo", file);

            formData.append(
                "latitude",
                location.latitude
            );

            formData.append(
                "longitude",
                location.longitude
            );
            const result = await attendanceService.checkIn(formData);

            await loadToday();
            setOpenDialog(false);
            setPhoto(null);
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: result.message
            });

        } catch (err) {

            console.log(err);

            console.log(err.response);

            console.log(err.response?.data);

            Swal.fire({
                icon: "error",
                title: "Check In Gagal",
                text: err.response?.data?.message || err.message
            });

        } finally {

            setLoading(false);

        }

    };

    const handleCheckOut = async () => {

        try {

            setLoading(true);

            const result = await attendanceService.checkOut();

            await loadToday();
            setOpenDialog(false);
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

            const meter = calculateDistance(
                current.latitude,
                current.longitude,
                OFFICE.latitude,
                OFFICE.longitude
            );

            setDistance(meter);
            setInsideRadius(meter <= OFFICE.radius);

            setGpsReady(true);

        } catch (err) {

            setGpsReady(false);
            setInsideRadius(null);

            console.error(err);

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
                onOpenAttendance={() => setOpenDialog(true)}
            />
            {/* <Box sx={{ mt: 3 }}>
                <LocationCard />
            </Box> */}
            {/* <AnnouncementSlider /> */}
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