import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeroCard from "../../components/attendance/HeroCard";
import LocationCard from "../../components/attendance/LocationCard";
import CameraCard from "../../components/attendance/CameraCard";
import { Box } from "@mui/material";
import attendanceService from "../../services/attService";
import {
    OFFICE,
    getCurrentLocation,
    calculateDistance
} from "../../services/locationService";

export default function Attendance() {

    const [time, setTime] = useState(new Date());

    const [status, setStatus] = useState("idle");
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [photo, setPhoto] = useState(null);


    const [loading, setLoading] = useState(false);
    const [insideRadius, setInsideRadius] = useState(null);
    useEffect(() => {
        loadLocation();

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = async () => {

    if (!photo) {

        alert("Silakan ambil selfie.");

        return;

    }

    if (!location) {

        alert("Lokasi belum tersedia.");

        return;

    }

    setLoading(true);

    try {

        const file =
            dataURLtoFile(photo, "selfie.jpg");

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

       const result =
    await attendanceService.checkIn(formData);

setStatus("checked-in");

Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: result.message
});

    } catch (err) {

        alert(
            err.response?.data?.message ||
            "Check In gagal."
        );

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
        }
        catch (err) {
            setInsideRadius(null);

            Swal.fire({
                icon: "warning",
                title: "Lokasi",
                text: err.message,
            });
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
    return (

        <>

           <HeroCard
    time={time}
    status={status}
    onCheck={handleCheckIn}
    insideRadius={insideRadius}
/>
            <Box sx={{ mt: 3 }}>
                <LocationCard />
            </Box>

            <Box sx={{ mt: 3 }}>
               <CameraCard
    photo={photo}
    setPhoto={setPhoto}
/>
            </Box>


        </>

    );

}