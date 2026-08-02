import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

import CameraCard from "./CameraCard";

export default function AttendanceDialog({

    open,
    onClose,

    cameraRef,
    photo,
    setPhoto,

    loading,
    status,

    insideRadius,

    attendanceType,
    setAttendanceType,

    onConfirm

}) {

    return (

        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {
                    status === "checked-in"
                        ? "Check Out"
                        : "Check In"
                }

            </DialogTitle>

            <DialogContent>

                <CameraCard
                    ref={cameraRef}
                    photo={photo}
                    setPhoto={setPhoto}
                    loading={loading}

                />

                {insideRadius === false && status !== "checked-in" && (

                    <Box mt={3}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Jenis Absensi
                            </InputLabel>

                            <Select
                                value={attendanceType}
                                label="Jenis Absensi"
                                onChange={(e) =>
                                    setAttendanceType(e.target.value)
                                }
                            >

                                <MenuItem value="WFH">
                                    Work From Home
                                </MenuItem>

                                <MenuItem value="CLIENT">
                                    Kunjungan Client
                                </MenuItem>

                                <MenuItem value="MEETING">
                                    Meeting
                                </MenuItem>

                                <MenuItem value="BUSINESS_TRIP">
                                    Perjalanan Dinas
                                </MenuItem>

                                <MenuItem value="OTHER">
                                    Lainnya
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Box>

                )}

                <Box sx={{ mt: 2 }}>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                    >
                        Pastikan wajah terlihat jelas sebelum melanjutkan.
                    </Typography>

                </Box>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Batal
                </Button>

                <Button
                    variant="contained"
                    disabled={
                        loading ||
                        (
                            status !== "checked-in" &&
                            !photo
                        )
                    }
                    onClick={onConfirm}
                >
                    {
                        loading
                            ? "Memproses..."
                            : status === "checked-in"
                                ? "Konfirmasi Check Out"
                                : "Konfirmasi Check In"
                    }
                </Button>

            </DialogActions>

        </Dialog>

    );

}