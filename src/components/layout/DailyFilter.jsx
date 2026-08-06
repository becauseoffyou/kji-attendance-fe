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

export default function DailyFilter() {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                mb: 3
            }}
        >

            <CardContent>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            type="date"
                            label="Tanggal"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            select
                            label="Divisi"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                Semua Divisi
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
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
                            label="Cari Karyawan"
                            placeholder="Nama..."
                        />

                    </Grid>

                </Grid>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 3 }}
                >

                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                    >
                        Cari
                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

}