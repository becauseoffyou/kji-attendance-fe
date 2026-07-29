import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box
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