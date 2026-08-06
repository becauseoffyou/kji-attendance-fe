import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Box
} from "@mui/material";

import { useEffect, useState } from "react";
import {
    CircularProgress
} from "@mui/material";
import attendanceService from "../../services/attService";


export default function AttendanceDetailDialog({
    open,
    onClose,
    data
}) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        if (!open || !data) return;

        const loadHistory = async () => {

            try {

                setLoading(true);

                setHistory([]);

                const result =
                    await attendanceService.getEmployeeAttendance(data.id);

                setHistory(result.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        loadHistory();

    }, [open, data]);
    if (!data) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    height: "85vh",
                    display: "flex"
                }
            }}
        >

            <DialogTitle>
                Detail Rekap Absensi
            </DialogTitle>

            <DialogContent
                dividers
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    p: 3
                }}
            >
                <Box
                    sx={{
                        flexShrink: 0
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {data.name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mb={3}
                    >
                        {data.department}
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid size={6}>
                            <Typography>Hadir</Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography fontWeight={600}>
                                {data.present} Hari
                            </Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography>Terlambat</Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography fontWeight={600}>
                                {data.late}x
                            </Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography>Total Menit Telat</Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography fontWeight={600}>
                                {data.late_minutes} Menit
                            </Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography>Cuti</Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography fontWeight={600}>
                                {data.leave} Hari
                            </Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography>Izin</Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography fontWeight={600}>
                                {data.permission} Hari
                            </Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography>Sakit</Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography fontWeight={600}>
                                {data.sick} Hari
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        mt: 3
                    }}
                >
                    <Box
                        sx={{
                            position: "sticky",
                            top: 0,
                            bgcolor: "#fff",
                            zIndex: 10,
                            py: 1
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Riwayat Absensi
                        </Typography>

                    </Box>

                    {loading ? (

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 250
                            }}
                        >

                            <CircularProgress />

                        </Box>

                    ) : (

                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                                maxHeight: 320,
                                overflowY: "auto",
                                border: "1px solid #E5E7EB",
                                borderRadius: 2
                            }}
                        >

                            <Table
                                stickyHeader
                                size="small"
                            >
                                <TableHead>

                                    <TableRow>

                                        <TableCell>Tanggal</TableCell>

                                        <TableCell>Masuk</TableCell>

                                        <TableCell>Pulang</TableCell>

                                        <TableCell>Status</TableCell>

                                    </TableRow>

                                </TableHead>

                                <TableBody>

                                    {history.map((item, index) => (

                                        <TableRow key={index}>

                                            <TableCell>
                                                {new Date(item.attendance_date)
                                                    .toLocaleDateString("id-ID")}
                                            </TableCell>

                                            <TableCell>
                                                {item.check_in || "-"}
                                            </TableCell>

                                            <TableCell>
                                                {item.check_out || "-"}
                                            </TableCell>

                                            <TableCell>
                                                {item.status}
                                            </TableCell>

                                        </TableRow>

                                    ))}

                                </TableBody>

                            </Table>
                        </TableContainer>

                    )}
                </Box>
            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Tutup
                </Button>

            </DialogActions>

        </Dialog>

    );

}