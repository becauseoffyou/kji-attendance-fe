import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Divider
} from "@mui/material";

export default function AttendanceDetailDialog({
    open,
    onClose,
    data
}) {

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