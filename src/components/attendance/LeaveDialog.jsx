import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";


export default function LeaveDialog({

    open,
    onClose,

    leaveType,
    setLeaveType

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

                <FormControl
                    fullWidth
                    sx={{
                        mt: 1
                    }}
                >

                    <InputLabel>

                        Jenis Pengajuan

                    </InputLabel>

                    <Select
                        value={leaveType}
                        label="Jenis Pengajuan"
                        onChange={(e) =>
                            setLeaveType(e.target.value)
                        }
                    >

                        <MenuItem value="SAKIT">

                            🏥 Sakit

                        </MenuItem>

                        <MenuItem value="IZIN">

                            📝 Izin

                        </MenuItem>

                        <MenuItem value="CUTI">

                            🌴 Cuti

                        </MenuItem>

                        <MenuItem value="DINAS">

                            🚗 Perjalanan Dinas

                        </MenuItem>

                    </Select>

                </FormControl>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Tutup

                </Button>

            </DialogActions>

        </Dialog>

    );

}