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
import SummaryFilter from "../../components/attendance/SummaryFilter";
import DailySummaryCards from "../../components/attendance/DailySummaryCards";

import attendanceService from "../../services/attService";
import DailyAttendanceTable from "../../components/DailyAttendanceTable";


export default function AdminAttendance() {
    const [loadingDaily, setLoadingDaily] = useState(false);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [dailyAttendance, setDailyAttendance] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [filters, setFilters] = useState({
        date: dayjs(),
        department: "",
        status: "",
        search: ""
    });
    const [dailySummary, setDailySummary] = useState({
        present: 0,
        late: 0,
        checkout: 0,
        absent: 0
    });
    const [summaryFilters, setSummaryFilters] = useState({

        month: dayjs().month() + 1,

        year: dayjs().year(),

        department: "",

        search: ""

    });
    const [departments, setDepartments] = useState([]);
    const [tab, setTab] = useState(0);
    useEffect(() => {

        loadSummary(summaryFilters);
        loadDepartments();
        loadDailyAttendance(filters);

    }, []);

    const loadDepartments = async () => {

        const result = await attendanceService.getDepartments();

        setDepartments(result.data);

    };

    const loadSummary = async (params = summaryFilters) => {

        try {

            setLoadingSummary(true);

            console.log("SUMMARY FILTER :", params);

            const result =
                await attendanceService.getSummary(params);

            setSummaryData(result.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingSummary(false);

        }

    };
    const loadDailyAttendance = async (params = filters) => {

        try {

            setLoadingDaily(true);

            const payload = {
                ...params,
                date: params.date
                    ? dayjs(params.date).format("YYYY-MM-DD")
                    : null
            };

            const result =
                await attendanceService.getDailyAttendance(payload);

            setDailyAttendance(result.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingDaily(false);

        }

    }

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

                    <DailyFilter filters={filters}

                        setFilters={setFilters}
                        departments={departments}
                        onSearch={() => loadDailyAttendance(filters)} />

                    <DailySummaryCards
                        data={dailySummary}
                    />

                    <DailyAttendanceTable
                        data={dailyAttendance}
                        loading={loadingDaily}
                    />

                </>

            )}
            {tab === 1 && (
                <>
                    <SummaryFilter

                        filters={summaryFilters}

                        setFilters={setSummaryFilters}

                        departments={departments}

                        onSearch={(filter) =>
                            loadSummary(filter || summaryFilters)
                        }
                    />

                    <AttendanceSummaryTable
                        data={summaryData}
                        loading={loadingSummary}
                    /></>
            )}
        </>

    );

}