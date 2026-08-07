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
    Avatar,
    Box,
    LinearProgress,
    IconButton
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttendanceDetailDialog from "./AttendanceDetailDialog";

export default function AttendanceSummaryTable({ data = [] }) {
    const [selected, setSelected] = useState(null);

    const [open, setOpen] = useState(false);

    const handleDetail = (item) => {

        setOpen(false);

        setTimeout(() => {

            setSelected(item);

            setOpen(true);

        }, 100);

    };
    return (

        <Card
            elevation={0}
            sx={{
                mt: 2,
                borderRadius: 1,
                border: "1px solid #E5E7EB"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Rekap Absensi
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Karyawan</TableCell>

                            <TableCell align="center">
                                Hadir
                            </TableCell>

                            <TableCell align="center">
                                Terlambat
                            </TableCell>
                            <TableCell align="center">
                                Menit Telat
                            </TableCell>

                            <TableCell align="center">
                                Cuti
                            </TableCell>

                            <TableCell align="center">
                                Izin
                            </TableCell>
                            <TableCell align="center">
                                Sakit
                            </TableCell>

                            <TableCell align="center">
                                Alpha
                            </TableCell>

                            <TableCell>
                                Kehadiran
                            </TableCell>

                            <TableCell align="center">
                                Detail
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {data.map((item) => (

                            <TableRow key={item.id} hover>

                                <TableCell>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5
                                        }}
                                    >

                                        <Avatar
                                            sx={{
                                                width: 38,
                                                height: 38,
                                                fontSize: 16,
                                                bgcolor: "#D1D5DB",
                                                color: "#374151"
                                            }}
                                        >
                                            {item.name.charAt(0)}
                                        </Avatar>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1
                                            }}
                                        >

                                            <Typography
                                                fontWeight={600}
                                                fontSize={14}
                                            >
                                                {item.name}
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    bgcolor: "#F3F4F6",
                                                    px: 1,
                                                    py: .2,
                                                    borderRadius: 10
                                                }}
                                            >
                                                {item.department}
                                            </Typography>

                                        </Box>

                                    </Box>

                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={item.present}
                                        color="success"
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={item.late}
                                        color="warning"
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={`${item.late_minutes} mnt`}
                                        size="small"
                                        variant="outlined"
                                        color="warning"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {item.leave}
                                </TableCell>
                                <TableCell align="center">
                                    {item.sick}
                                </TableCell>

                                <TableCell align="center">
                                    {item.permission}
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={`${item.alpha} Hari`}
                                        color={item.alpha > 0 ? "error" : "success"}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>

                                    <LinearProgress
                                        variant="determinate"
                                        value={item.percent}
                                        sx={{
                                            height: 8,
                                            borderRadius: 5,
                                            mb: .5
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                    >
                                        {item.percent}%
                                    </Typography>

                                </TableCell>

                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                        onClick={() => handleDetail(item)}
                                    >

                                        <VisibilityIcon />

                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </CardContent>
            <AttendanceDetailDialog
                open={open}
                onClose={() => setOpen(false)}
                data={selected}
            />
        </Card>

    );

}