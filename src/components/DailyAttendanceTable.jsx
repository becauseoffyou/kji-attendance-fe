import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    Avatar,
    Box,
    Chip,
    IconButton, Skeleton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Divider
} from "@mui/material";
import { useState } from 'react';

import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function DailyAttendanceTable({

    data = [], loading = false


}) {
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [openAttendanceDetail, setOpenAttendanceDetail] = useState(false);
    return (
        <>
            <Card
                elevation={0}
                sx={{
                    mt: 2,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB"
                }}
            >

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={2}
                    >
                        Data Absensi Hari Ini
                    </Typography>

                    <Table >

                        <TableHead>

                            <TableRow hover
                                sx={{
                                    "& td": {
                                        py: 1
                                    }
                                }}>

                                <TableCell>Karyawan</TableCell>

                                <TableCell>Check In</TableCell>

                                <TableCell>Check Out</TableCell>

                                <TableCell>Status</TableCell>

                                <TableCell>Telat</TableCell>


                                <TableCell align="center">
                                    Detail
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {loading ? (

                                [...Array(6)].map((_, index) => (

                                    <TableRow key={index}>

                                        <TableCell>
                                            <Skeleton variant="circular" width={38} height={38} />
                                        </TableCell>

                                        <TableCell>
                                            <Skeleton width={70} />
                                        </TableCell>

                                        <TableCell>
                                            <Skeleton width={70} />
                                        </TableCell>

                                        <TableCell>
                                            <Skeleton width={100} />
                                        </TableCell>

                                        <TableCell>
                                            <Skeleton width={50} />
                                        </TableCell>


                                        <TableCell align="center">
                                            <Skeleton width={30} />
                                        </TableCell>

                                    </TableRow>

                                ))

                            ) : data.length === 0 ? (

                                <TableRow hover
                                    sx={{
                                        "& td": {
                                            py: 1
                                        }
                                    }}>

                                    <TableCell
                                        colSpan={8}
                                        align="center"
                                    >
                                        Belum ada data absensi.
                                    </TableCell>

                                </TableRow>

                            ) : (

                                data.map((item) => (

                                    <TableRow
                                        key={item.id}
                                        hover hover
                                        sx={{
                                            "& td": {
                                                py: 1
                                            }
                                        }}
                                    >

                                        {/* Karyawan */}

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

                                        {/* Check In */}

                                        <TableCell>

                                            {item.check_in
                                                ? item.check_in.substring(11, 16)
                                                : "-"}

                                        </TableCell>

                                        {/* Check Out */}

                                        <TableCell>

                                            {item.check_out
                                                ? item.check_out.substring(11, 16)
                                                : "-"}

                                        </TableCell>

                                        {/* Status */}

                                        <TableCell>

                                            <Chip
                                                label={item.status}
                                                size="small"
                                                color={
                                                    item.status === "Belum Check In"
                                                        ? "default"
                                                        : "success"
                                                }
                                            />

                                        </TableCell>

                                        {/* Telat */}

                                        <TableCell>

                                            {item.late_minutes} menit

                                        </TableCell>



                                        {/* Detail */}

                                        <TableCell align="center">

                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => {
                                                    console.log("ATTENDANCE DETAIL:", item);
                                                    setSelectedAttendance(item);
                                                    setOpenAttendanceDetail(true);
                                                }}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))

                            )}

                        </TableBody>

                    </Table>

                </CardContent>

            </Card>
            <Dialog
                open={openAttendanceDetail}
                onClose={() => {
                    setOpenAttendanceDetail(false);
                    setSelectedAttendance(null);
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Detail Absensi
                </DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={2}>

                        {/* Karyawan */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Karyawan
                            </Typography>

                            <Typography fontWeight={600}>
                                {selectedAttendance?.name || "-"}
                            </Typography>
                        </Box>

                        {/* Department */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Department
                            </Typography>

                            <Typography fontWeight={600}>
                                {selectedAttendance?.department || "-"}
                            </Typography>
                        </Box>

                        {/* Check In */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Check In
                            </Typography>

                            <Typography fontWeight={600}>
                                {selectedAttendance?.check_in
                                    ? selectedAttendance.check_in.substring(11, 16)
                                    : "-"}
                            </Typography>
                        </Box>

                        {/* Check Out */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Check Out
                            </Typography>

                            <Typography fontWeight={600}>
                                {selectedAttendance?.check_out
                                    ? selectedAttendance.check_out.substring(11, 16)
                                    : "-"}
                            </Typography>
                        </Box>

                        {/* Status */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Status
                            </Typography>

                            <Typography fontWeight={600}>
                                {selectedAttendance?.status || "-"}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Lokasi Check In */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Lokasi Check In
                            </Typography>

                            {selectedAttendance?.check_in_lat != null &&
                                selectedAttendance?.check_in_lng != null ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LocationOnIcon />}
                                    component="a"
                                    href={`https://www.google.com/maps?q=${selectedAttendance.check_in_lat},${selectedAttendance.check_in_lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Lihat Lokasi Check In
                                </Button>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Lokasi check in tidak tersedia
                                </Typography>
                            )}
                        </Box>

                        {/* Lokasi Check Out */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Lokasi Check Out
                            </Typography>

                            {selectedAttendance?.check_out_lat != null &&
                                selectedAttendance?.check_out_lng != null ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LocationOnIcon />}
                                    component="a"
                                    href={`https://www.google.com/maps?q=${selectedAttendance.check_out_lat},${selectedAttendance.check_out_lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Lihat Lokasi Check Out
                                </Button>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Lokasi check out tidak tersedia
                                </Typography>
                            )}
                        </Box>

                        {/* Foto */}
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Foto Absensi
                            </Typography>

                            {selectedAttendance?.photo_path ? (
                                <Box
                                    component="img"
                                    src={`https://kji-attendance-be-production.up.railway.app${selectedAttendance.photo_path}`}
                                    alt="Foto absensi"
                                    sx={{
                                        width: "100%",
                                        maxHeight: 300,
                                        objectFit: "contain",
                                        borderRadius: 2,
                                        border: "1px solid #E5E7EB",
                                    }}
                                />
                            ) : (
                                <Typography color="text.secondary">
                                    Foto tidak tersedia
                                </Typography>
                            )}
                        </Box>

                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenAttendanceDetail(false);
                            setSelectedAttendance(null);
                        }}
                    >
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}