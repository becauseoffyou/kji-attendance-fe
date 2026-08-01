import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    MenuItem,
    Stack,
    Typography,
    Divider
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { IconButton } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ScheduleIcon from "@mui/icons-material/Schedule";

import attendanceService from "../../services/attService";

export default function History() {
    const now = new Date();

    const isCurrentMonth =
        selectedMonth === now.getMonth() &&
        selectedYear === now.getFullYear();

    const [history, setHistory] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());

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

    const [selectedDate, setSelectedDate] = useState(new Date());

    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const result = await attendanceService.getHistory();

            setHistory(result.data);

        } catch (err) {

            console.error(err);

        }

    };

    const formatTime = (time) => {

        if (!time) return "-";

        return new Date(time).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        });

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
                    px: 2,
                    pt: 2,
                    pb: 2
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={2}
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
                        boxShadow: "0 2px 10px rgba(0,0,0,.05)"
                    }}
                >

                    <IconButton
                        onClick={nextMonth}
                        disabled={isCurrentMonth}
                    >
                        <ChevronRightRoundedIcon />
                    </IconButton>

                    <Typography
                        fontWeight={700}
                        fontSize={18}
                    >
                        {monthNames[selectedMonth]} {selectedYear}
                    </Typography>

                    <IconButton onClick={nextMonth}>
                        <ChevronRightRoundedIcon />
                    </IconButton>

                </Box>

            </Box>

            <Stack
                spacing={2}
                sx={{
                    px: 2,
                    pb: 10
                }}
            >

                {filteredHistory.length === 0 && (

                    <Card
                        sx={{
                            borderRadius: 4
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

                )}

                {filteredHistory.map(item => (

                    <Card
                        key={item.id}
                        elevation={2}
                        sx={{
                            borderRadius: 4
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >

                                <Typography
                                    fontWeight={700}
                                    color="primary"
                                >
                                    {new Date(item.attendance_date).toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </Typography>

                                <Chip
                                    label={item.status}
                                    color={
                                        item.status === "Pulang"
                                            ? "success"
                                            : "warning"
                                    }
                                    size="small"
                                />

                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,1fr)",
                                    gap: 2,
                                    textAlign: "center"
                                }}
                            >

                                <Box>

                                    <LoginIcon
                                        color="success"
                                        sx={{ mb: .5 }}
                                    />

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

                                    <LogoutIcon
                                        color="error"
                                        sx={{ mb: .5 }}
                                    />

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

                                    <ScheduleIcon
                                        color="primary"
                                        sx={{ mb: .5 }}
                                    />

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

                ))}

            </Stack>

        </Box>

    );

}