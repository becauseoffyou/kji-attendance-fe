import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

export default function LeaveDialog({

    open,
    onClose

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Pengajuan

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Form Pengajuan

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Tutup

                </Button>

            </DialogActions>

        </Dialog>

    );

}