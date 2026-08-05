import {
    Typography,
    Box,
    Button,
    Stack,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Grid
} from "@mui/material";



import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

export default function AdminAttendance() {
    const [filters, setFilters] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        search: "",
        department: "",
        status: ""
    });
    return (

        <>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Absensi
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Kelola data absensi karyawan
                    </Typography>

                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                    >
                        Export Excel
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<PictureAsPdfIcon />}
                    >
                        Export PDF
                    </Button>

                </Stack>

            </Box>
            {/* datatable */}
            <Card
                elevation={0}
                sx={{
                    mt: 3,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB"
                }}
            >
                <CardContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={2}>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <DatePicker
                                    label="Dari"
                                    value={filters.startDate}
                                    onChange={(value) =>
                                        setFilters({
                                            ...filters,
                                            startDate: value
                                        })
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <DatePicker
                                    label="Sampai"
                                    value={filters.endDate}
                                    onChange={(value) =>
                                        setFilters({
                                            ...filters,
                                            endDate: value
                                        })
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Cari Karyawan"
                                    placeholder="Nama..."
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Divisi"
                                    defaultValue=""
                                >
                                    <MenuItem value="">Semua Divisi</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    defaultValue=""
                                >
                                    <MenuItem value="">Semua Status</MenuItem>
                                    <MenuItem value="Hadir">Hadir</MenuItem>
                                    <MenuItem value="Terlambat">Terlambat</MenuItem>
                                    <MenuItem value="Cuti">Cuti</MenuItem>
                                    <MenuItem value="Izin">Izin</MenuItem>
                                </TextField>
                            </Grid>

                        </Grid>
                    </LocalizationProvider>
                </CardContent>
            </Card>
        </>

    );

}