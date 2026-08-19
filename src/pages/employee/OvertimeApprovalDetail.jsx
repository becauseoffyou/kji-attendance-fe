import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Button
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import overtimeService from "../../services/overtimeService";

export default function OvertimeApprovalDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDetail = async () => {

            try {

                setLoading(true);

                const response =
                    await overtimeService.managerDetail(id);

                setData(
                    response.data?.data ||
                    response.data
                );

            } catch (err) {

                console.error(
                    "OVERTIME DETAIL ERROR:",
                    err
                );

            } finally {

                setLoading(false);

            }

        };

        loadDetail();

    }, [id]);

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };

    const formatTime = (time) => {

        if (!time) return "-";

        return time.substring(0, 5);

    };

    const formatDuration = (minutes) => {

        if (
            minutes === undefined ||
            minutes === null
        ) {
            return "-";
        }

        const hours =
            Math.floor(minutes / 60);

        const remaining =
            minutes % 60;

        if (remaining === 0) {
            return `${hours} jam`;
        }

        return `${hours} jam ${remaining} menit`;

    };

    if (loading) {

        return (
            <Box p={3}>
                <Typography>
                    Memuat detail...
                </Typography>
            </Box>
        );

    }

    if (!data) {

        return (
            <Box p={3}>

                <Typography>
                    Data lembur tidak ditemukan.
                </Typography>

                <Button
                    sx={{ mt: 2 }}
                    onClick={() =>
                        navigate("/employee/approval")
                    }
                >
                    Kembali
                </Button>

            </Box>
        );

    }

    return (

        <Box
            sx={{
                p: 2,
                pb: 10
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
            >
                Detail Pengajuan Lembur
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 2 }}
            >
                Detail pengajuan lembur karyawan
            </Typography>

            <Card>

                <CardContent>

                    <Stack spacing={2}>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Nama Karyawan
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {data.name || "-"}
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Email
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {data.email || "-"}
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Tanggal Lembur
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {formatDate(
                                    data.overtime_date
                                )}
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Jam Lembur
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {formatTime(
                                    data.start_time
                                )}
                                {" - "}
                                {formatTime(
                                    data.end_time
                                )}
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Durasi
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {formatDuration(
                                    data.duration_minutes
                                )}
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Pekerjaan / Alasan
                            </Typography>

                            <Typography>
                                {data.reason || "-"}
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Status
                            </Typography>

                            <Chip
                                label={
                                    data.status ===
                                        "PENDING_MANAGER"
                                        ? "Pending"
                                        : data.status
                                }
                                color="warning"
                                size="small"
                            />

                        </Box>

                    </Stack>

                </CardContent>

            </Card>

            <Button
                sx={{ mt: 2 }}
                onClick={() =>
                    navigate("/employee/approval")
                }
            >
                Kembali
            </Button>

        </Box>

    );

}