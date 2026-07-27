import { Grid, Typography } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import StatCard from "../../components/layout/StatCard";
import AttendanceChart from "../../components/layout/AttChart";
import TodaySummary from "../../components/layout/TodaySummary";
import AttendanceTable from "../../components/layout/DataTable";

import attendanceChart from "../../data/charts";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import attendanceService from "../../services/attService";

export default function Dashboard() {

    const { user, loading } = useAuth();
const [today, setToday] = useState(null);
const [loadingToday, setLoadingToday] = useState(true);
    if (loading) {
        return <Typography>Loading...</Typography>;
    }


    useEffect(() => {
    const loadToday = async () => {
        try {
            const result = await attendanceService.getToday();
            setToday(result.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingToday(false);
        }
    };

    loadToday();
}, []);

    return (
        <>
            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ mb: 1 }}
            >
                Selamat Datang, {user?.name}
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                {user?.department} • {user?.position}
            </Typography>

            {/* ===================== */}
            {/* STAT CARD */}
            {/* ===================== */}

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Check In"
                        value={loadingToday ? "..." : (today?.checkIn ?? "-")}
                        icon={<LoginIcon />}
                        color="#2E7D32"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Check Out"
                        value={loadingToday ? "..." : (today?.checkOut ?? "-")}
                        icon={<LogoutIcon />}
                        color="#EF6C00"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Status"
                       value={loadingToday ? "..." : (today?.status ?? "-")}
                        icon={<EventAvailableIcon />}
                        color="#1565C0"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Jam Kerja"
                       value={loadingToday ? "..." : (today?.workingHours ?? "-")}
                        icon={<ScheduleIcon />}
                        color="#6A1B9A"
                    />
                </Grid>

            </Grid>

            {/* ===================== */}
            {/* CHART + SUMMARY */}
            {/* ===================== */}

            <Grid
                container
                spacing={3}
                sx={{ mt: 2 }}
            >

                <Grid size={{ xs: 12, lg: 9 }}>
                    <AttendanceChart data={attendanceChart} />
                </Grid>

                <Grid size={{ xs: 12, lg: 3 }}>
                    <TodaySummary />
                </Grid>

            </Grid>

            {/* ===================== */}
            {/* TABLE */}
            {/* ===================== */}

            <Grid
                container
                sx={{ mt: 2 }}
            >
                <Grid size={12}>
                    <AttendanceTable
                        data={attendanceToday}
                    />
                </Grid>
            </Grid>

        </>
    );
}