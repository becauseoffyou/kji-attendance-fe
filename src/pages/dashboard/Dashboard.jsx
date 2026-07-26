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
import attendanceToday from "../../data/attendance";

export default function Dashboard() {
    return (
        <>


            {/* ===================== */}
            {/* STAT CARD */}
            {/* ===================== */}

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Check In"
                        value="07:58"
                        icon={<LoginIcon />}
                        color="#2E7D32"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Check Out"
                        value="17:00"
                        icon={<LogoutIcon />}
                        color="#EF6C00"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Status"
                        value="Hadir"
                        icon={<EventAvailableIcon />}
                        color="#1565C0"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Jam Kerja"
                        value="8 Jam"
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