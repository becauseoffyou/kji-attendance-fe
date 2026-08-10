import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

export default function EmployeeCreate() {

    const [form, setForm] = useState({
        nik: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        join_date: "",
        address: "",

        employee_type: "TETAP",

        contract_start_date: "",
        contract_end_date: "",

        office_location_id: "",
        supervisor_id: "",

        photo: null,
        ktp: null,
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleFileChange = (e) => {

        const { name, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files[0] || null,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("EMPLOYEE FORM :", form);

    };

    return (

        <Box>

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Tambah Karyawan
            </Typography>


            <Card
                elevation={0}
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <Grid
                            container
                            spacing={2}
                        >

                            {/* FOTO */}

                            <Grid size={{ xs: 12 }}>

                                <Typography
                                    fontWeight={600}
                                    mb={1}
                                >
                                    Foto Karyawan
                                </Typography>

                                <Button
                                    variant="outlined"
                                    component="label"
                                >
                                    Pilih Foto

                                    <input
                                        hidden
                                        type="file"
                                        name="photo"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileChange}
                                    />

                                </Button>

                                {form.photo && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mt={1}
                                    >
                                        {form.photo.name}
                                    </Typography>
                                )}

                            </Grid>


                            {/* KTP */}

                            <Grid size={{ xs: 12 }}>

                                <Typography
                                    fontWeight={600}
                                    mb={1}
                                >
                                    KTP
                                </Typography>

                                <Button
                                    variant="outlined"
                                    component="label"
                                >
                                    Pilih KTP

                                    <input
                                        hidden
                                        type="file"
                                        name="ktp"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileChange}
                                    />

                                </Button>

                                {form.ktp && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mt={1}
                                    >
                                        {form.ktp.name}
                                    </Typography>
                                )}

                            </Grid>


                            {/* NIK */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    required
                                    label="NIK KTP"
                                    name="nik"
                                    value={form.nik}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 16,
                                    }}
                                />

                            </Grid>


                            {/* NAMA */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    required
                                    label="Nama Lengkap"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                            </Grid>


                            {/* EMAIL */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    required
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                            </Grid>


                            {/* PHONE */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="No. HP"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />

                            </Grid>


                            {/* DEPARTMENT */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    required
                                    label="Departemen"
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                />

                            </Grid>


                            {/* POSITION */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="Jabatan"
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                />

                            </Grid>


                            {/* JOIN DATE */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Tanggal Masuk"
                                    name="join_date"
                                    value={form.join_date}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>


                            {/* EMPLOYEE TYPE */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    select
                                    label="Jenis Karyawan"
                                    name="employee_type"
                                    value={form.employee_type}
                                    onChange={handleChange}
                                >

                                    <MenuItem value="TETAP">
                                        Pegawai Tetap
                                    </MenuItem>

                                    <MenuItem value="KONTRAK">
                                        Pegawai Kontrak
                                    </MenuItem>

                                </TextField>

                            </Grid>


                            {/* CONTRACT START */}

                            {form.employee_type === "KONTRAK" && (

                                <>

                                    <Grid size={{ xs: 12, md: 6 }}>

                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Mulai Kontrak"
                                            name="contract_start_date"
                                            value={form.contract_start_date}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>


                                    <Grid size={{ xs: 12, md: 6 }}>

                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Akhir Kontrak"
                                            name="contract_end_date"
                                            value={form.contract_end_date}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>

                                </>

                            )}


                            {/* ALAMAT */}

                            <Grid size={{ xs: 12 }}>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Alamat"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                />

                            </Grid>


                            {/* SAVE */}

                            <Grid size={{ xs: 12 }}>

                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                >

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                    >
                                        Simpan Karyawan
                                    </Button>

                                </Box>

                            </Grid>

                        </Grid>

                    </Box>

                </CardContent>

            </Card>

        </Box>

    );
}