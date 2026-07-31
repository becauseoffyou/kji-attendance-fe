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

        <Box>

            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
            >
                Riwayat Absensi
            </Typography>

            <FormControl
                fullWidth
                sx={{ mb: 3 }}
            >

                <Select
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

            <Stack spacing={2}>

                {filteredHistory.map(item => (

                    <Card key={item.id}>

                        <CardContent>

                            <Typography
                                fontWeight={700}
                                mb={2}
                            >
                                {new Date(item.attendance_date)
                                    .toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                            </Typography>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={1}
                            >

                                <Stack direction="row" spacing={1}>
                                    <LoginIcon color="success" />
                                    <Typography>
                                        Masuk
                                    </Typography>
                                </Stack>

                                <Typography>
                                    {item.check_in
                                        ? new Date(item.check_in)
                                            .toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        : "-"}
                                </Typography>

                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={1}
                            >

                                <Stack direction="row" spacing={1}>
                                    <LogoutIcon color="error" />
                                    <Typography>
                                        Pulang
                                    </Typography>
                                </Stack>

                                <Typography>
                                    {item.check_out
                                        ? new Date(item.check_out)
                                            .toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        : "-"}
                                </Typography>

                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >

                                <Stack direction="row" spacing={1}>
                                    <ScheduleIcon color="primary" />
                                    <Typography>
                                        Jam Kerja
                                    </Typography>
                                </Stack>

                                <Typography>

                                    {item.working_hours}

                                </Typography>

                            </Stack>

                            <Box
                                mt={2}
                                display="flex"
                                justifyContent="flex-end"
                            >

                                <Chip
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