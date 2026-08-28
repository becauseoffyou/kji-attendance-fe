import { useEffect, useRef, useState } from "react";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import attendanceService from "../../services/attService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function EmployeeCreate({
    open,
    onClose,
    onSuccess,
    employee = null,
    mode = "create",
}) {
    const [saving, setSaving] = useState(false);
    const [roles, setRoles] = useState([]);
    const [form, setForm] = useState({
        nik: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        role_id: "",
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

    useEffect(() => {

        if (open) {
            loadRoles();
        }

    }, [open]);
    useEffect(() => {

        if (mode === "edit" && employee) {

            setForm({
                nik: employee.nik || "",
                name: employee.name || "",
                email: employee.email || "",
                phone: employee.phone || "",
                department: employee.department || "",
                position: employee.position || "",
                role_id: employee.role_id || "",
                join_date: employee.join_date
                    ? dayjs(employee.join_date).format("YYYY-MM-DD")
                    : "",
                address: employee.address || "",

                employee_type:
                    employee.employee_type || "TETAP",

                contract_start_date:
                    employee.contract_start_date
                        ? dayjs(
                            employee.contract_start_date
                        ).format("YYYY-MM-DD")
                        : "",

                contract_end_date:
                    employee.contract_end_date
                        ? dayjs(
                            employee.contract_end_date
                        ).format("YYYY-MM-DD")
                        : "",

                office_location_id:
                    employee.office_location_id || "",

                supervisor_id:
                    employee.supervisor_id || "",

                // File tidak kita isi dari data lama
                photo: null,
                ktp: null,
            });

        }

    }, [mode, employee]);
    const generatedPassword =
        form.nik.length >= 4
            ? `kancha${form.nik.slice(-4)}`
            : "";

    const openDatePicker = (e) => {
        if (e.currentTarget.showPicker) {
            e.currentTarget.showPicker();
        }
    };
    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };
    const loadRoles = async () => {
        try {

            const result =
                await attendanceService.getRoles();

            if (result.success) {
                setRoles(result.data || []);
            }

        } catch (err) {

            console.error(
                "GET ROLES ERROR:",
                err
            );

        }
    };

    const handleFileChange = (e) => {

        const {
            name,
            files
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files[0] || null,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const formData = new FormData();

            formData.append("nik", form.nik);
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("department", form.department);
            formData.append("position", form.position);
            formData.append("role_id", form.role_id);
            formData.append("join_date", form.join_date);
            formData.append("address", form.address);
            formData.append(
                "employee_type",
                form.employee_type
            );

            if (form.employee_type === "KONTRAK") {

                formData.append(
                    "contract_start_date",
                    form.contract_start_date
                );

                formData.append(
                    "contract_end_date",
                    form.contract_end_date
                );

            }

            if (form.office_location_id) {

                formData.append(
                    "office_location_id",
                    form.office_location_id
                );

            }

            if (form.supervisor_id) {

                formData.append(
                    "supervisor_id",
                    form.supervisor_id
                );

            }

            if (form.photo) {

                formData.append(
                    "photo",
                    form.photo
                );

            }

            if (form.ktp) {

                formData.append(
                    "ktp",
                    form.ktp
                );

            }

            const result =
                mode === "edit"
                    ? await attendanceService.updateEmployee(
                        employee.id,
                        formData
                    )
                    : await attendanceService.createEmployee(
                        formData
                    );

            console.log(
                "SAVE EMPLOYEE RESULT:",
                result
            );

            if (!result.success) {
                throw new Error(
                    result.message ||
                    "Gagal menyimpan data karyawan"
                );

            }

            alert(
                mode === "edit"
                    ? "Data karyawan berhasil diperbarui"
                    : "Karyawan berhasil ditambahkan"
            );

            onSuccess?.();
            onClose();

            console.log(
                "CREATE EMPLOYEE RESULT:",
                result
            );

            if (result.success) {

                alert(
                    "Karyawan berhasil ditambahkan"
                );

                onSuccess?.();

                onClose();

            }

        } catch (err) {

            console.error(
                "CREATE EMPLOYEE ERROR:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Gagal menambahkan karyawan"
            );

        } finally {

            setSaving(false);

        }

    };


    const handleClose = () => {

        onClose();

    };



    return (

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                <Typography
                    fontWeight={"bold"}
                >
                    {mode === "edit"
                        ? "Edit Karyawan"
                        : "Tambah Karyawan"}
                </Typography>
                <Typography
                    fontWeight={"bold"}
                    variant="body2"
                    color="text.secondary"
                >
                    {mode === "edit"
                        ? "Perbarui data karyawan"
                        : "Masukkan data karyawan dan akun login"}
                </Typography>

            </DialogTitle>


            <Box
                component="form"
                onSubmit={handleSubmit}
            >

                <DialogContent>

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
                                    variant="caption"
                                    display="block"
                                    mt={1}
                                    color="text.secondary"
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
                                Foto KTP
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
                                    variant="caption"
                                    display="block"
                                    mt={1}
                                    color="text.secondary"
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

                        <Grid size={{ xs: 12, md: 6 }}>
                            {mode === "create" && (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Password Awal"
                                        value={generatedPassword}
                                        disabled
                                        helperText="Otomatis dari 4 digit terakhir NIK"
                                    />
                                </Grid>
                            )}
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
                                required
                                select
                                label="Jabatan"
                                name="role_id"
                                value={form.role_id}
                                onChange={(e) => {

                                    const selectedRoleId =
                                        e.target.value;

                                    const selectedRole =
                                        roles.find(
                                            (role) =>
                                                String(role.id) ===
                                                String(selectedRoleId)
                                        );

                                    setForm((prev) => ({
                                        ...prev,
                                        role_id: selectedRoleId,
                                        position:
                                            selectedRole?.name || ""
                                    }));

                                }}
                            >

                                {roles.map((role) => (

                                    <MenuItem
                                        key={role.id}
                                        value={role.id}
                                    >
                                        {role.name}
                                    </MenuItem>

                                ))}

                            </TextField>

                        </Grid>

                        {/* JOIN DATE */}

                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Tanggal Masuk"
                                    value={
                                        form.join_date
                                            ? dayjs(form.join_date)
                                            : null
                                    }
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            join_date: value
                                                ? value.format("YYYY-MM-DD")
                                                : "",
                                        }))
                                    }
                                    format="DD/MM/YYYY"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>


                        {/* TIPE */}

                        {/* JENIS KARYAWAN */}

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


                        {/* SPACER SEBELAH KANAN */}

                        <Grid size={{ xs: 12, md: 6 }} />


                        {/* TANGGAL KONTRAK */}

                        {form.employee_type === "KONTRAK" && (

                            <>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Tanggal Mulai Kontrak"
                                            value={
                                                form.contract_start_date
                                                    ? dayjs(form.contract_start_date)
                                                    : null
                                            }
                                            onChange={(value) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    contract_start_date: value
                                                        ? value.format("YYYY-MM-DD")
                                                        : "",
                                                }))
                                            }
                                            format="DD/MM/YYYY"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Tanggal Akhir Kontrak"
                                            value={
                                                form.contract_end_date
                                                    ? dayjs(form.contract_end_date)
                                                    : null
                                            }
                                            onChange={(value) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    contract_end_date: value
                                                        ? value.format("YYYY-MM-DD")
                                                        : "",
                                                }))
                                            }
                                            format="DD/MM/YYYY"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
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

                    </Grid>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2
                    }}
                >

                    <Button
                        onClick={handleClose}
                    >
                        Batal
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={saving}
                    >
                        {saving
                            ? "Menyimpan..."
                            : "Simpan Karyawan"
                        }
                    </Button>

                </DialogActions>

            </Box>

        </Dialog>

    );

}