import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    FormControl,
    MenuItem,
    Select,
    Stack,
    Typography
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ScheduleIcon from "@mui/icons-material/Schedule";

import attendanceService from "../../services/attService";

export default function History() {

    const [history, setHistory] = useState([]);

    const [month, setMonth] = useState(new Date().getMonth());

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

    const filteredHistory = useMemo(() => {

        return history.filter(item => {

            const date = new Date(item.attendance_date);

            return date.getMonth() === month;

        });

    }, [history, month]);
    return (

        <Box
            sx={{
                bgcolor: "#f5f7fb"
            }}
        >

            {/* Sticky Header */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    bgcolor: "#F5F7FA",
                    py: 1
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={2}
                >
                    Riwayat Absensi
                </Typography>

                <FormControl fullWidth>

                    <Select
                        size="small"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >

                        {[
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
                        ].map((m, i) => (

                            <MenuItem
                                key={i}
                                value={i}
                            >
                                {m}
                            </MenuItem>

                        ))}

                    </Select>

                </FormControl>

            </Box>

            {/* List */}
            <Stack
                spacing={2}
                sx={{
                    p: 2
                }}
            >

                {filteredHistory.map(item => (

                    <Card
                        key={item.id}
                        elevation={2}
                        sx={{
                            borderRadius: 3
                        }}
                    >

                        <CardContent>

                            <Typography
                                fontWeight={700}
                                color="primary"
                                mb={2}
                            >
                                {new Date(item.attendance_date).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </Typography>

                           <Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        mb: 2,
        textAlign: "center"
    }}
>

    {/* Masuk */}
    <Box sx={{ flex: 1 }}>
        <Typography
            variant="h6"
            fontWeight={700}
        >
            {item.check_in
                ? new Date(item.check_in).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "-"}
        </Typography>

        <Typography
            variant="caption"
            color="text.secondary"
        >
            Masuk
        </Typography>
    </Box>

    {/* Divider */}
    <Box
        sx={{
            width: 1,
            height: 40,
            bgcolor: "#e0e0e0"
        }}
    />

    {/* Pulang */}
    <Box sx={{ flex: 1 }}>
        <Typography
            variant="h6"
            fontWeight={700}
        >
            {item.check_out
                ? new Date(item.check_out).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "-"}
        </Typography>

        <Typography
            variant="caption"
            color="text.secondary"
        >
            Pulang
        </Typography>
    </Box>

    {/* Divider */}
    <Box
        sx={{
            width: 1,
            height: 40,
            bgcolor: "#e0e0e0"
        }}
    />

    {/* Durasi */}
    <Box sx={{ flex: 1 }}>
        <Typography
            variant="h6"
            fontWeight={700}
        >
            {item.working_hours}
        </Typography>

        <Typography
            variant="caption"
            color="text.secondary"
        >
            Durasi
        </Typography>
    </Box>

</Box>

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <Chip
                                    size="small"
                                    label={item.status}
                                    color={
                                        item.status === "Pulang"
                                            ? "success"
                                            : "warning"
                                    }
                                />
                            </Box>

                        </CardContent>

                    </Card>

                ))}

            </Stack>

        </Box>

    );

}