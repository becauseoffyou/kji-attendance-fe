import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button,
    Stack
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DailyFilter() {
    const [date, setDate] = useState(dayjs());
    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                mb: 3
            }}
        >

            <CardContent sx={{
                py: 2,
                "&:last-child": {
                    pb: 2
                }
            }}>

                <Grid container spacing={2} alignItems="center">

                    <Grid size={{ xs: 12, md: 2.5 }}>

                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >
                            <DatePicker
                                label="Tanggal"
                                value={date}
                                onChange={setDate}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small"
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <TextField
                            fullWidth
                            size="small"
                            select
                            label="Divisi"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                Semua Divisi
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <TextField
                            fullWidth
                            size="small"
                            select
                            label="Status"
                            defaultValue=""
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

                            <MenuItem value="Belum Pulang">
                                Belum Pulang
                            </MenuItem>

                            <MenuItem value="Tidak Hadir">
                                Tidak Hadir
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            size="small"
                            label="Cari Karyawan"
                            placeholder="Nama..."
                        />

                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 2.5 }}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1
                        }}
                    >


                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                        >
                            Reset
                        </Button>

                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<SearchIcon />}
                        >
                            Cari
                        </Button>


                    </Grid>

                </Grid>


            </CardContent>

        </Card>

    );

}