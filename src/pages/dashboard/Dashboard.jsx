import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import StatCard from "../../components/layout/StatCard";
import AttendanceChart from "../../components/layout/AttChart";
import TodaySummary from "../../components/layout/TodaySummary";
import AttendanceTable from "../../components/layout/DataTable";

// import attendanceChart from "../../data/charts";

import { useAuth } from "../../context/AuthContext";
import dashboardService from "../../services/dashboardService";
export default function Dashboard() {

    const { user, loading } = useAuth();

    const [dashboard, setDashboard] = useState({
        totalEmployee: 0,
        present: 0,
        leave: 0,
        late: 0,
        chart: [],
        attendance: []
    });

    const [loadingToday, setLoadingToday] = useState(true);

    useEffect(() => {

        const loadToday = async () => {

            try {

                const result = await dashboardService.getDashboard();

                setDashboard(result.data);
            } catch (err) {

                console.error(err);

            } finally {

                setLoadingToday(false);

            }

        };

        loadToday();

    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>



            <Grid container spacing={3}>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Total Karyawan"
                        value={dashboard.totalEmployee}
                        subtitle="Tahun 2026"
                        color="#2E7D32"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Hadir Hari Ini"
                        value={dashboard.present}
                        subtitle={new Date().toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                        color="#EF6C00"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Cuti dan Izin"
                        value={dashboard.leave}
                        subtitle={new Date().toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                        color="#1565C0"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Terlambat"
                        value={dashboard.late}
                        subtitle={new Date().toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                        color="#6A1B9A"
                    />
                </Grid>

            </Grid>

            <Grid
                container
                spacing={3}
                sx={{ mt: 2 }}
            >

                <Grid size={{ xs: 12, lg: 9 }}>
                    <AttendanceChart
                        data={dashboard.chart}
                    />
                </Grid>

                <Grid size={{ xs: 12, lg: 3 }}>
                    <TodaySummary data={dashboard} />
                </Grid>

            </Grid>

            <Grid
                container
                sx={{ mt: 2 }}
            >

                <Grid size={12}>
                    <AttendanceTable
                        data={dashboard.attendance}
                    />
                </Grid>

            </Grid>

        </>
    );

}