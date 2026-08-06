import { useState, useEffect } from "react";

import {
    Box,
    Button,
    Stack,
    Tabs,
    Tab
} from "@mui/material";
import dayjs from "dayjs";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import AttendanceSummaryTable from "../../components/attendance/AttendanceSummaryTable";
import DailyFilter from "../../components/layout/DailyFilter";
import DailySummaryCards from "../../components/attendance/DailySummaryCards";

import attendanceService from "../../services/attService";
import DailyAttendanceTable from "../../components/DailyAttendanceTable";


export default function AdminAttendance() {
    const [dailyAttendance, setDailyAttendance] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [filters, setFilters] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        search: "",
        department: "",
        status: ""
    });
    const [dailySummary, setDailySummary] = useState({
        present: 0,
        late: 0,
        checkout: 0,
        absent: 0
    });

    const [tab, setTab] = useState(0);
    useEffect(() => {

        const loadSummary = async () => {

            try {

                const result = await attendanceService.getSummary();

                setSummaryData(result.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadSummary();
        loadDailyAttendance();
    }, []);

    const loadDailyAttendance = async () => {

        try {

            const result =
                await attendanceService.getDailyAttendance();

            console.log(result);

            setDailyAttendance(result.data);
            console.log("Daily Attendance :", result.data);
        } catch (err) {

            console.error(err);

        }

    };

    return (
        <>
            {/* ================= HEADER ================= */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3
                }}
            >
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                    >
                        Export Excel
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<PictureAsPdfIcon />}
                    >
                        Export PDF
                    </Button>
                </Stack>
            </Box>

            {/* ================= FILTER ================= */}
            <Box sx={{ mb: 3 }}>

                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >

                    <Tab label="Absensi Harian" />

                    <Tab label="Rekap Absensi" />

                </Tabs>

            </Box>
            {tab === 0 && (

                <>

                    <DailyFilter />

                    <DailySummaryCards
                        data={dailySummary}
                    />

                    <DailyAttendanceTable
                        data={dailyAttendance}
                    />

                </>

            )}
            {tab === 1 && (

                <AttendanceSummaryTable
                    data={summaryData}
                />
            )}
        </>

    );

}