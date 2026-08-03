import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box

} from "@mui/material";


export default function LeaveDialog({

    open,
    onClose,

    leaveType,
    setLeaveType,
    startDate,
    setStartDate,

    endDate,
    setEndDate,
    reason,
    setReason

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

                            Sakit

                        </MenuItem>

                        <MenuItem value="IZIN">

                            Izin

                        </MenuItem>

                        <MenuItem value="CUTI">

                            Cuti

                        </MenuItem>


                    </Select>

                </FormControl>
                <Box sx={{ mt: 2 }}>

                    <TextField
                        fullWidth
                        type="date"
                        label="Tanggal Mulai"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                </Box>

                <Box sx={{ mt: 2 }}>

                    <TextField
                        fullWidth
                        type="date"
                        label="Tanggal Selesai"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                </Box>
                <Box sx={{ mt: 2 }}>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Keterangan"
                        placeholder="Masukkan alasan pengajuan..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />

                </Box>
            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Tutup

                </Button>

            </DialogActions>

        </Dialog>

    );

}