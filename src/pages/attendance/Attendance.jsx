import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeroCard from "../../components/attendance/HeroCard";
import LocationCard from "../../components/attendance/LocationCard";
import CameraCard from "../../components/attendance/CameraCard";
import { Box } from "@mui/material";
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
    // const [insideRadius, setInsideRadius] = useState(false);
    const [insideRadius, setInsideRadius] = useState(null);
    useEffect(() => {
        loadLocation();

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheck = async () => {

        try {

            const current = await getCurrentLocation();

            const meter = calculateDistance(
                current.latitude,
                current.longitude,
                OFFICE.latitude,
                OFFICE.longitude
            );

            setLocation(current);
            setDistance(meter);
            setInsideRadius(meter <= OFFICE.radius);

            if (meter > OFFICE.radius) {
                Swal.fire({
                    icon: "warning",
                    title: "Di luar radius",
                    text: "Anda berada di luar area absensi.",
                });
                return;
            }

            setStatus(prev =>
                prev === "checkedin" ? "idle" : "checkedin"
            );

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Catch",
                text: err.message,
            });

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

    return (

        <>

            <HeroCard
                time={time}
                status={status}
                onCheck={handleCheck}
                insideRadius={insideRadius}
            />
            <Box sx={{ mt: 3 }}>
                <LocationCard />
            </Box>

            <Box sx={{ mt: 3 }}>
                <CameraCard />
            </Box>


        </>

    );

}