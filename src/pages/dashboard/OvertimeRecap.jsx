import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Paper
} from "@mui/material";

import { useEffect, useState } from "react";
import api from "../../services/api";

const getStatusLabel = (status) => {

    switch (status) {

        case "PENDING_MANAGER":
            return "Menunggu";

        case "APPROVED":
            return "Disetujui";

        case "REJECTED":
            return "Ditolak";

        case "CANCELLED":
            return "Dibatalkan";

        default:
            return status || "-";
    }
};


const getStatusColor = (status) => {

    switch (status) {

        case "APPROVED":
            return "success";

        case "REJECTED":
            return "error";

        case "PENDING_MANAGER":
            return "warning";

        case "CANCELLED":
            return "default";

        default:
            return "default";
    }
};


const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
};


const formatDuration = (minutes) => {

    if (
        minutes === null ||
        minutes === undefined
    ) {
        return "-";
    }

    const hours =
        Math.floor(minutes / 60);

    const remainingMinutes =
        minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} menit`;
    }

    if (remainingMinutes === 0) {
        return `${hours} jam`;
    }

    return `${hours} jam ${remainingMinutes} menit`;
};


export default function OvertimeRecap() {

    const [data, setData] = useState([]);

    const [loading, setLoading] =
        useState(true);


    const loadData = async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    "/overtime/admin/recap"
                );

            console.log(
                "OVERTIME RECAP:",
                response.data
            );

            setData(
                response.data.data || []
            );

        } catch (err) {

            console.error(
                "OVERTIME RECAP ERROR:",
                err
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadData();

    }, []);


    return (

        <Box>

            <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mb: 2 }}
            >
                Rekap Lembur
            </Typography>


            <Card>

                <CardContent>

                    <TableContainer
                        component={Paper}
                        elevation={0}
                    >

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Karyawan
                                    </TableCell>

                                    <TableCell>
                                        Tanggal
                                    </TableCell>

                                    <TableCell>
                                        Jam
                                    </TableCell>

                                    <TableCell>
                                        Durasi
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell>
                                        Pembayaran
                                    </TableCell>

                                    <TableCell>
                                        Pekerjaan
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {loading ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                        >
                                            Memuat data...
                                        </TableCell>

                                    </TableRow>

                                ) : data.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                        >
                                            Belum ada data lembur.
                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    data.map((item) => (

                                        <TableRow
                                            key={item.id}
                                            hover
                                        >

                                            <TableCell>
                                                {item.employee_name}
                                            </TableCell>


                                            <TableCell>
                                                {formatDate(
                                                    item.overtime_date
                                                )}
                                            </TableCell>


                                            <TableCell>
                                                {item.start_time?.substring(
                                                    0,
                                                    5
                                                )}
                                                {" - "}
                                                {item.end_time?.substring(
                                                    0,
                                                    5
                                                )}
                                            </TableCell>


                                            <TableCell>
                                                {formatDuration(
                                                    item.duration_minutes
                                                )}
                                            </TableCell>


                                            <TableCell>

                                                <Chip
                                                    label={
                                                        getStatusLabel(
                                                            item.status
                                                        )
                                                    }
                                                    size="small"
                                                    color={
                                                        getStatusColor(
                                                            item.status
                                                        )
                                                    }
                                                />

                                            </TableCell>


                                            <TableCell>

                                                {item.status ===
                                                    "APPROVED" ? (

                                                    <Chip
                                                        label={
                                                            item.payment_status ===
                                                                "PAID"
                                                                ? "Sudah Dibayar"
                                                                : "Belum Dibayar"
                                                        }
                                                        size="small"
                                                        color={
                                                            item.payment_status ===
                                                                "PAID"
                                                                ? "success"
                                                                : "warning"
                                                        }
                                                    />

                                                ) : (

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        -
                                                    </Typography>

                                                )}

                                            </TableCell>


                                            <TableCell>

                                                {item.reason || "-"}

                                            </TableCell>

                                        </TableRow>

                                    ))

                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </CardContent>

            </Card>

        </Box>

    );

}