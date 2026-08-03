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
    Typography,
    Box

} from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

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
    setReason,
    attachment,
    setAttachment,
    loading,
    onSubmit

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
                <Box sx={{ mt: 2 }}>

                    <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        startIcon={<AttachFileRoundedIcon />}
                        sx={{
                            height: 50,
                            borderStyle: "dashed"
                        }}
                    >

                        Pilih Lampiran

                        <input
                            hidden
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {

                                if (e.target.files.length > 0) {

                                    setAttachment(
                                        e.target.files[0]
                                    );

                                }

                            }}
                        />

                    </Button>

                    {

                        attachment && (

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 1
                                }}
                            >

                                {attachment.name}

                            </Typography>

                        )

                    }

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
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Mengirim..."
                            : "Kirim"
                    }
                </Button>

            </DialogActions>

        </Dialog>

    );

}