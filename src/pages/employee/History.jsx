import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    MenuItem,
    Stack,
    Typography,
    Skeleton
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { IconButton } from "@mui/material";


import attendanceService from "../../services/attService";

export default function History() {



    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const now = new Date();
    const isCurrentMonth =
        selectedMonth === now.getMonth() &&
        selectedYear === now.getFullYear();
    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const prevMonth = () => {

        setSelectedDate(prev => {

            const d = new Date(prev);

            d.setMonth(d.getMonth() - 1);

            return d;

        });

    };

    const nextMonth = () => {

        setSelectedDate(prev => {

            const d = new Date(prev);

            d.setMonth(d.getMonth() + 1);

            return d;

        });

    };



    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            setLoading(true);

            await new Promise(resolve =>
                setTimeout(resolve, 2000)
            );

            const { data } = await leaveService.history();

            setHistory(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const formatTime = (time) => {

        if (!time) return "-";

        return time.substring(11, 16);

    };



    const filteredHistory = useMemo(() => {

        return history.filter(item => {

            const date = new Date(item.attendance_date);

            return (
                date.getMonth() === selectedMonth &&
                date.getFullYear() === selectedYear
            );

        });

    }, [history, selectedMonth, selectedYear]);

    const summary = useMemo(() => {

        return {

            hadir: filteredHistory.filter(
                x => x.status === "Pulang"
            ).length,

            terlambat: filteredHistory.filter(
                x => x.status === "Terlambat"
            ).length,

            izin: filteredHistory.filter(
                x => x.status === "Izin"
            ).length

        };

    }, [filteredHistory]);

    return (

        <Box
            sx={{
                bgcolor: "#f5f7fb",
                minHeight: "100vh"
            }}
        >

            {/* Header */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    bgcolor: "#F5F7FA",
                    px: 2,
                    pt: 2,
                    pb: 2,
                    borderBottom: "1px solid #ECEFF1",
                    boxShadow: "0 2px 10px rgba(0,0,0,.05)"
                }}
            >

                <Card
                    sx={{
                        mb: 3,
                        background: "linear-gradient(135deg,#0e7d63,#17a673)",
                        color: "#fff"
                    }}
                >
                    <CardContent>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            Riwayat Absensi
                        </Typography>


                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                bgcolor: "#fff",
                                borderRadius: 3,
                                px: 1,
                                py: .5,
                                color: "#000",
                                boxShadow: "0 2px 8px rgba(0,0,0,.04)"
                            }}
                        >

                            <IconButton onClick={prevMonth}>
                                <ChevronLeftRoundedIcon />
                            </IconButton>

                            <Typography
                                fontWeight={700}
                                fontSize={18}

                            >
                                {monthNames[selectedMonth]} {selectedYear}
                            </Typography>

                            <IconButton
                                onClick={nextMonth}
                                disabled={isCurrentMonth}
                            >
                                <ChevronRightRoundedIcon />
                            </IconButton>

                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: .5, textAlign: "center" }}
                        >
                            {summary.hadir} Hari Hadir | {summary.terlambat} Terlambat | 0 Izin
                        </Typography>


                    </CardContent>
                </Card>




            </Box>

            <Stack
                spacing={2} sx={{ px: 2, pt: 2, pb: 10 }}

            >

                {loading ? (

                    [...Array(4)].map((_, index) => (

                        <Card
                            key={index}
                            sx={{
                                borderRadius: 1
                            }}
                        >
                            <CardContent>

                                <Skeleton
                                    width="60%"
                                    height={30}
                                />

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3,1fr)",
                                        gap: 2,
                                        mt: 2,
                                        textAlign: "center"
                                    }}
                                >

                                    {[1, 2, 3].map((i) => (

                                        <Box key={i}>

                                            <Skeleton
                                                width={55}
                                                height={32}
                                                sx={{ mx: "auto" }}
                                            />

                                            <Skeleton
                                                width={70}
                                                height={18}
                                                sx={{ mx: "auto" }}
                                            />

                                        </Box>

                                    ))}

                                </Box>

                            </CardContent>
                        </Card>

                    ))

                ) : filteredHistory.length === 0 ? (

                    <Card
                        sx={{
                            borderRadius: 1
                        }}
                    >
                        <CardContent>

                            <Typography
                                align="center"
                                color="text.secondary"
                            >
                                Belum ada riwayat absensi.
                            </Typography>

                        </CardContent>
                    </Card>

                ) : (

                    filteredHistory.map(item => (

                        <Card
                            key={item.id}
                            elevation={2}
                            sx={{
                                borderRadius: 1
                            }}
                        >

                            <CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        mb: 2,
                                        gap: 2
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            flex: 1,
                                            fontWeight: 700,
                                            color: "primary.main",
                                            lineHeight: 1.4
                                        }}
                                    >
                                        {new Date(item.attendance_date).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </Typography>

                                    {item.attendance_status === "Terlambat" ? (
                                        <Chip
                                            label={`Terlambat ${item.late_minutes} Menit`}
                                            color="error"
                                            size="small"
                                        />
                                    ) : (
                                        <Chip
                                            label="Tepat Waktu"
                                            color="success"
                                            size="small"
                                        />
                                    )}

                                </Box>

                                {/* <Divider sx={{ mb: 2 }} /> */}

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3,1fr)",
                                        gap: 2,
                                        textAlign: "center"
                                    }}
                                >

                                    <Box>

                                        {/* <LoginIcon
                                        color="success"
                                        sx={{ mb: .5 }}
                                    /> */}

                                        <Typography
                                            fontWeight={700}
                                            fontSize={20}
                                        >
                                            {formatTime(item.check_in)}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Check In
                                        </Typography>

                                    </Box>

                                    <Box>

                                        {/* <LogoutIcon
                                        color="error"
                                        sx={{ mb: .5 }}
                                    /> */}

                                        <Typography
                                            fontWeight={700}
                                            fontSize={20}
                                        >
                                            {formatTime(item.check_out)}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Check Out
                                        </Typography>

                                    </Box>

                                    <Box>

                                        {/* <ScheduleIcon
                                        color="primary"
                                        sx={{ mb: .5 }}
                                    /> */}

                                        <Typography
                                            fontWeight={700}
                                            fontSize={20}
                                        >
                                            {item.working_hours || "-"}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Durasi
                                        </Typography>

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    ))

                )}





            </Stack>

        </Box>

    );

}