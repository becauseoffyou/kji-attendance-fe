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

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

    const [filters, setFilters] = useState({
        date: dayjs(),
        department: "",
        status: "",
        search: ""
    });

    const [dailySummary, setDailySummary] = useState({
        hadir: 0,
        terlambat: 0,
        belum_pulang: 0,
        belum_checkin: 0
    });


    const [summaryData, setSummaryData] = useState([]);

    const [summaryFilters, setSummaryFilters] = useState({

        month: dayjs().month() + 1,

        year: dayjs().year(),

        department: "",

        search: ""

    });


    const [departments, setDepartments] = useState([]);

    const [tab, setTab] = useState(0);


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        loadDailySummary();

        loadSummary(summaryFilters);

        loadDepartments();

        loadDailyAttendance(filters);

    }, []);


    // =========================
    // DEPARTMENTS
    // =========================

    const loadDepartments = async () => {

        try {

            const result =
                await attendanceService.getDepartments();

            setDepartments(result.data);

        } catch (err) {

            console.error(err);

        }

    };


    // =========================
    // LOAD SUMMARY
    // =========================

    const loadSummary = async (
        params = summaryFilters
    ) => {

        try {

            setLoadingSummary(true);

            const result =
                await attendanceService.getAttendanceSummary(
                    params
                );

            setSummaryData(
                result.data || []
            );

        } catch (err) {

            console.error(err);

            setSummaryData([]);

        } finally {

            setLoadingSummary(false);

        }

    };


    // =========================
    // LOAD DAILY ATTENDANCE
    // =========================

    const loadDailyAttendance = async (
        params = filters
    ) => {

        try {

            setLoadingDaily(true);

            const payload = {

                ...params,

                date: params.date
                    ? dayjs(params.date).format(
                        "YYYY-MM-DD"
                    )
                    : ""

            };

            const result =
                await attendanceService.getDailyAttendance(
                    payload
                );

            setDailyAttendance(
                result.data || []
            );

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingDaily(false);

        }

    };


    // =========================
    // DAILY SUMMARY
    // =========================

    const loadDailySummary = async () => {

        try {

            const result =
                await attendanceService.getSummary();

            setDailySummary(
                result.data
            );

        } catch (err) {

            console.error(err);

        }

    };


    // =====================================================
    // HELPER DATA EXPORT
    // =====================================================

    const getEmployeeName = (item) => {

        return (
            item.name ||
            item.employee_name ||
            item.nama ||
            item.employee ||
            "-"
        );

    };


    const getDepartment = (item) => {

        return (
            item.department ||
            item.department_name ||
            item.division ||
            item.division_name ||
            item.departemen ||
            "-"
        );

    };


    const getValue = (
        item,
        keys,
        defaultValue = 0
    ) => {

        for (const key of keys) {

            if (
                item[key] !== undefined &&
                item[key] !== null
            ) {

                return item[key];

            }

        }

        return defaultValue;

    };


    // =====================================================
    // FORMAT MONTH
    // =====================================================

    const getMonthName = () => {

        return dayjs()
            .month(
                Number(summaryFilters.month) - 1
            )
            .format("MMMM");

    };


    // =====================================================
    // EXPORT DATA
    // =====================================================

    const getExportData = () => {

        return summaryData.map(
            (item, index) => {

                const hadir = Number(
                    getValue(
                        item,
                        [
                            "hadir",
                            "present",
                            "total_hadir"
                        ]
                    )
                );

                const terlambat = Number(
                    getValue(
                        item,
                        [
                            "terlambat",
                            "late",
                            "total_terlambat"
                        ]
                    )
                );

                const menitTelat = Number(
                    getValue(
                        item,
                        [
                            "menit_telat",
                            "late_minutes",
                            "total_late_minutes"
                        ]
                    )
                );

                const cuti = Number(
                    getValue(
                        item,
                        [
                            "cuti",
                            "total_cuti"
                        ]
                    )
                );

                const izin = Number(
                    getValue(
                        item,
                        [
                            "izin",
                            "total_izin"
                        ]
                    )
                );

                const sakit = Number(
                    getValue(
                        item,
                        [
                            "sakit",
                            "total_sakit"
                        ]
                    )
                );

                const alpha = Number(
                    getValue(
                        item,
                        [
                            "alpha",
                            "total_alpha"
                        ]
                    )
                );

                let kehadiran =
                    getValue(
                        item,
                        [
                            "kehadiran",
                            "attendance_percentage",
                            "attendance_percent",
                            "persentase_kehadiran"
                        ],
                        null
                    );

                if (
                    kehadiran === null
                ) {

                    const totalHari =
                        hadir +
                        cuti +
                        izin +
                        sakit +
                        alpha;

                    kehadiran =
                        totalHari > 0
                            ? (
                                hadir /
                                totalHari
                            ) * 100
                            : 0;

                }

                if (
                    typeof kehadiran === "string"
                ) {

                    kehadiran =
                        kehadiran.replace(
                            "%",
                            ""
                        );

                }

                return {

                    "No.": index + 1,

                    "Karyawan":
                        getEmployeeName(item),

                    "Divisi":
                        getDepartment(item),

                    "Hadir":
                        hadir,

                    "Terlambat":
                        terlambat,

                    "Menit Telat":
                        menitTelat,

                    "Cuti":
                        cuti,

                    "Izin":
                        izin,

                    "Sakit":
                        sakit,

                    "Alpha":
                        alpha,

                    "Kehadiran":
                        `${Number(
                            kehadiran
                        ).toFixed(2)}%`

                };

            }
        );

    };


    // =====================================================
    // EXPORT EXCEL
    // =====================================================

    const handleExportExcel = () => {
        if (!summaryData || summaryData.length === 0) {
            alert("Tidak ada data rekap untuk diekspor.");
            return;
        }

        const exportData = getExportData();

        // =========================
        // INFORMASI LAPORAN
        // =========================

        const monthName = getMonthName();

        const department =
            summaryFilters.department || "Semua Divisi";

        const employee =
            summaryFilters.search || "Semua Karyawan";


        // =========================
        // DATA SHEET
        // =========================

        const worksheetData = [

            ["REKAP ABSENSI KARYAWAN"],

            [`Periode : ${monthName} ${summaryFilters.year}`],

            [`Divisi : ${department}`],

            [`Karyawan : ${employee}`],

            [],

            [
                "No.",
                "Karyawan",
                "Divisi",
                "Hadir",
                "Terlambat",
                "Menit Telat",
                "Cuti",
                "Izin",
                "Sakit",
                "Alpha",
                "Kehadiran"
            ],

            ...exportData.map((item) => [
                item["No."],
                item["Karyawan"],
                item["Divisi"],
                item["Hadir"],
                item["Terlambat"],
                item["Menit Telat"],
                item["Cuti"],
                item["Izin"],
                item["Sakit"],
                item["Alpha"],
                item["Kehadiran"]
            ])

        ];


        // =========================
        // CREATE WORKSHEET
        // =========================

        const worksheet =
            XLSX.utils.aoa_to_sheet(
                worksheetData
            );


        // =========================
        // MERGE JUDUL
        // =========================

        worksheet["!merges"] = [
            {
                s: {
                    r: 0,
                    c: 0
                },
                e: {
                    r: 0,
                    c: 10
                }
            }
        ];


        // =========================
        // LEBAR KOLOM
        // =========================

        worksheet["!cols"] = [

            { wch: 6 },

            { wch: 28 },

            { wch: 20 },

            { wch: 10 },

            { wch: 12 },

            { wch: 15 },

            { wch: 10 },

            { wch: 10 },

            { wch: 10 },

            { wch: 10 },

            { wch: 15 }

        ];


        // =========================
        // FREEZE HEADER
        // =========================

        worksheet["!freeze"] = {
            xSplit: 0,
            ySplit: 6
        };


        // =========================
        // CREATE WORKBOOK
        // =========================

        const workbook =
            XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Rekap Absensi"
        );


        // =========================
        // FILE NAME
        // =========================

        const departmentName =
            summaryFilters.department
                ? `_${summaryFilters.department}`
                : "";

        const employeeName =
            summaryFilters.search
                ? `_${summaryFilters.search
                    .trim()
                    .replace(/\s+/g, "_")}`
                : "";


        const filename =
            `Rekap_Absensi_${monthName}_${summaryFilters.year}${departmentName}${employeeName}.xlsx`;


        // =========================
        // DOWNLOAD
        // =========================

        XLSX.writeFile(
            workbook,
            filename
        );
    };

    // =====================================================
    // EXPORT PDF
    // =====================================================

    const handleExportPDF = () => {

        if (
            !summaryData ||
            summaryData.length === 0
        ) {

            alert(
                "Tidak ada data rekap untuk diekspor."
            );

            return;

        }


        const exportData =
            getExportData();


        const doc =
            new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });


        // =========================
        // HEADER
        // =========================

        doc.setFontSize(16);

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.text(
            "REKAP ABSENSI KARYAWAN",
            148,
            15,
            {
                align: "center"
            }
        );


        doc.setFontSize(10);

        doc.setFont(
            "helvetica",
            "normal"
        );


        const department =
            summaryFilters.department
                ? summaryFilters.department
                : "Semua Divisi";


        doc.text(
            `Periode: ${getMonthName()} ${summaryFilters.year}`,
            14,
            24
        );


        doc.text(
            `Divisi: ${department}`,
            14,
            30
        );


        if (
            summaryFilters.search
        ) {

            doc.text(
                `Karyawan: ${summaryFilters.search}`,
                14,
                36
            );

        }


        // =========================
        // TABLE
        // =========================

        autoTable(
            doc,
            {

                startY:
                    summaryFilters.search
                        ? 42
                        : 36,

                head: [[
                    "No.",
                    "Karyawan",
                    "Divisi",
                    "Hadir",
                    "Terlambat",
                    "Menit Telat",
                    "Cuti",
                    "Izin",
                    "Sakit",
                    "Alpha",
                    "Kehadiran"
                ]],

                body:
                    exportData.map(
                        (item) => [

                            item["No."],

                            item["Karyawan"],

                            item["Divisi"],

                            item["Hadir"],

                            item["Terlambat"],

                            item["Menit Telat"],

                            item["Cuti"],

                            item["Izin"],

                            item["Sakit"],

                            item["Alpha"],

                            item["Kehadiran"]

                        ]
                    ),

                styles: {

                    fontSize: 8,

                    cellPadding: 3,

                    valign: "middle"

                },

                headStyles: {

                    fontSize: 8,

                    fontStyle: "bold"

                },

                columnStyles: {

                    0: {
                        cellWidth: 10
                    },

                    1: {
                        cellWidth: 38
                    },

                    2: {
                        cellWidth: 30
                    },

                    3: {
                        cellWidth: 16
                    },

                    4: {
                        cellWidth: 20
                    },

                    5: {
                        cellWidth: 22
                    },

                    6: {
                        cellWidth: 15
                    },

                    7: {
                        cellWidth: 15
                    },

                    8: {
                        cellWidth: 15
                    },

                    9: {
                        cellWidth: 15
                    },

                    10: {
                        cellWidth: 25
                    }

                },

                didDrawPage: () => {

                    const pageCount =
                        doc.internal
                            .getNumberOfPages();

                    doc.setFontSize(8);

                    doc.text(
                        `Halaman ${pageCount}`,
                        280,
                        200,
                        {
                            align: "right"
                        }
                    );

                }

            }
        );


        // =========================
        // FILE NAME
        // =========================

        const departmentName =
            summaryFilters.department
                ? `_${summaryFilters.department}`
                : "";

        const employeeName =
            summaryFilters.search
                ? `_${summaryFilters.search}`
                : "";

        const filename =
            `Rekap_Absensi_${getMonthName()}_${summaryFilters.year}${departmentName}${employeeName}.pdf`;

        doc.save(filename);

    };


    return (
        <>

            {/* ================= HEADER ================= */}
            {tab === 1 && (
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
                            onClick={handleExportExcel}
                        >
                            Export Excel
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={handleExportPDF}
                        >
                            Export PDF
                        </Button>
                    </Stack>
                </Box>
            )}


            {/* ================= FILTER ================= */}

            <Box sx={{ mb: 3 }}>

                <Tabs
                    value={tab}
                    onChange={
                        (e, value) =>
                            setTab(value)
                    }
                >

                    <Tab
                        label="Absensi Harian"
                    />

                    <Tab
                        label="Rekap Absensi"
                    />

                </Tabs>

            </Box>


            {/* ================= DAILY ================= */}

            {tab === 0 && (

                <>

                    <DailyFilter
                        filters={filters}
                        setFilters={setFilters}
                        departments={departments}
                        onSearch={(filter) =>
                            loadDailyAttendance(
                                filter || filters
                            )
                        }
                    />


                    <DailySummaryCards
                        data={dailySummary}
                    />


                    <DailyAttendanceTable
                        data={dailyAttendance}
                        loading={loadingDaily}
                    />

                </>

            )}


            {/* ================= SUMMARY ================= */}

            {tab === 1 && (

                <>

                    <SummaryFilter

                        filters={
                            summaryFilters
                        }

                        setFilters={
                            setSummaryFilters
                        }

                        departments={
                            departments
                        }

                        onSearch={
                            (filter) =>
                                loadSummary(
                                    filter ||
                                    summaryFilters
                                )
                        }

                    />


                    <AttendanceSummaryTable

                        data={
                            summaryData
                        }

                        loading={
                            loadingSummary
                        }

                        month={
                            summaryFilters.month
                        }

                        year={
                            summaryFilters.year
                        }

                    />

                </>

            )}

        </>
    );
}