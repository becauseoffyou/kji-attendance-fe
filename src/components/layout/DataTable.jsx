import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    TableContainer,
    Paper
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AttendanceTable({ data }) {
    return (
        <Card
            elevation={0}
            sx={{
                mt: 3,
                borderRadius: 4,
                border: "1px solid #E5E7EB",
            }}
        >
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Riwayat Absensi
                </Typography>

                <TableContainer component={Paper} elevation={0}>

                    <Table>

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor: "#F8FAFC",
                                }}
                            >
                                <TableCell><strong>Tanggal</strong></TableCell>
                                <TableCell><strong>Check In</strong></TableCell>
                                <TableCell><strong>Check Out</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Durasi</strong></TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {data.map((item, index) => (

                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{
                                        bgcolor:
                                            index % 2 === 0
                                                ? "#FFFFFF"
                                                : "#FCFCFC",
                                    }}
                                >

                                    <TableCell>
                                        {item.tanggal}
                                    </TableCell>

                                    <TableCell>

                                        <LoginIcon
                                            color="success"
                                            sx={{
                                                mr: 1,
                                                fontSize: 18
                                            }}
                                        />

                                        {item.checkIn}

                                    </TableCell>

                                    <TableCell>

                                        <LogoutIcon
                                            color="warning"
                                            sx={{
                                                mr: 1,
                                                fontSize: 18
                                            }}
                                        />

                                        {item.checkOut}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            size="small"
                                            label={item.status}
                                            color={
                                                item.status === "Hadir"
                                                    ? "success"
                                                    : item.status === "Belum Pulang"
                                                        ? "warning"
                                                        : "error"
                                            }
                                        />

                                    </TableCell>

                                    <TableCell>
                                        {item.durasi}
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            </CardContent>
        </Card>
    );
}