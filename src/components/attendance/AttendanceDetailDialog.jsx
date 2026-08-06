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
    TableBody
} from "@mui/material";

import { useEffect, useState } from "react";

import attendanceService from "../../services/attService";


export default function AttendanceDetailDialog({
    open,
    onClose,
    data
}) {
    const [history, setHistory] = useState([]);
    useEffect(() => {

        if (!open || !data) return;

        const loadHistory = async () => {

            try {

                const result =
                    await attendanceService.getEmployeeAttendance(data.id);

                setHistory(result.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadHistory();

    }, [open, data]);
    if (!data) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>
                Detail Rekap Absensi
            </DialogTitle>

            <DialogContent dividers>

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
                <Typography
                    variant="h6"
                    mt={4}
                    mb={2}
                >
                    Riwayat Absensi
                </Typography>

                <Table size="small">

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