import { useState } from "react";

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
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
            {/* ================= HEADER ================= */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 2
                }}
            >

                <Box>

                    <Typography
                        variant="h3"
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

            {/* ================= FILTER ================= */}

            <Card
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: "1px solid #E5E7EB"
                }}
            >

                <CardContent>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                    >

                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                        >

                            {/* Dari */}

                            <Grid size={{ xs: 12, md: 2 }}>

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
                                            fullWidth: true,
                                            size: "small"
                                        }
                                    }}
                                />

                            </Grid>

                            {/* Sampai */}

                            <Grid size={{ xs: 12, md: 2 }}>

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
                                            fullWidth: true,
                                            size: "small"
                                        }
                                    }}
                                />

                            </Grid>

                            {/* Search */}

                            <Grid size={{ xs: 12, md: 2.5 }}>

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Cari Karyawan"
                                    value={filters.search}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            search: e.target.value
                                        })
                                    }
                                />

                            </Grid>

                            {/* Divisi */}

                            <Grid size={{ xs: 12, md: 2 }}>

                                <TextField
                                    fullWidth
                                    select
                                    size="small"
                                    label="Divisi"
                                    value={filters.department}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            department: e.target.value
                                        })
                                    }
                                >

                                    <MenuItem value="">
                                        Semua Divisi
                                    </MenuItem>

                                </TextField>

                            </Grid>

                            {/* Status */}

                            <Grid size={{ xs: 12, md: 2 }}>

                                <TextField
                                    fullWidth
                                    select
                                    size="small"
                                    label="Status"
                                    value={filters.status}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            status: e.target.value
                                        })
                                    }
                                >

                                    <MenuItem value="">
                                        Semua Status
                                    </MenuItem>

                                    <MenuItem value="Hadir">
                                        Hadir
                                    </MenuItem>

                                    <MenuItem value="Terlambat">
                                        Terlambat
                                    </MenuItem>

                                    <MenuItem value="Cuti">
                                        Cuti
                                    </MenuItem>

                                    <MenuItem value="Izin">
                                        Izin
                                    </MenuItem>

                                </TextField>

                            </Grid>

                            {/* Button */}

                            <Grid
                                size={{ xs: 12, md: 1 }}
                                sx={{
                                    display: "flex",
                                    gap: 1
                                }}
                            >

                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    fullWidth
                                >
                                    <RestartAltIcon />
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                >
                                    <SearchIcon />
                                </Button>

                            </Grid>

                        </Grid>

                    </LocalizationProvider>

                </CardContent>

            </Card>

        </>
    );

}