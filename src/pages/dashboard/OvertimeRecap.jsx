import { useEffect, useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Paper,
    TextField,
    MenuItem,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import api from "../../services/api";


const getStatusLabel = (status) => {

    switch (status) {

        case "PENDING_MANAGER":
            return "Menunggu";

        case "APPROVED":
            return "Disetujui";

        case "REJECTED":
            return "Ditolak";

        case "CANCELLED":
            return "Dibatalkan";

        default:
            return status || "-";
    }

};


const getStatusColor = (status) => {

    switch (status) {

        case "APPROVED":
            return "success";

        case "REJECTED":
            return "error";

        case "PENDING_MANAGER":
            return "warning";

        case "CANCELLED":
            return "default";

        default:
            return "default";
    }

};


const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

};


const formatDuration = (minutes) => {

    if (
        minutes === null ||
        minutes === undefined
    ) {
        return "-";
    }

    const hours =
        Math.floor(minutes / 60);

    const remainingMinutes =
        minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} menit`;
    }

    if (remainingMinutes === 0) {
        return `${hours} jam`;
    }

    return `${hours} jam ${remainingMinutes} menit`;

};


export default function OvertimeRecap() {

    // =====================================
    // DATA
    // =====================================

    const [data, setData] = useState([]);

    const [loading, setLoading] =
        useState(false);


    // =====================================
    // FILTER
    // =====================================

    const [name, setName] =
        useState("");

    const [department, setDepartment] =
        useState("");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");


    // =====================================
    // SORTING
    // =====================================

    const [sort, setSort] =
        useState("latest");


    // =====================================
    // PAGINATION
    // =====================================

    const [page, setPage] =
        useState(1);

    const [limit, setLimit] =
        useState(10);

    const [pagination, setPagination] =
        useState({
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0
        });


    // =====================================
    // DETAIL
    // =====================================

    const [selectedItem, setSelectedItem] =
        useState(null);


    // =====================================
    // LOAD DATA
    // =====================================

    const loadData = async () => {

        try {

            setLoading(true);

            const params = new URLSearchParams();

            params.append(
                "page",
                page
            );

            params.append(
                "limit",
                limit
            );

            params.append(
                "sort",
                sort
            );


            if (name.trim()) {

                params.append(
                    "name",
                    name.trim()
                );

            }


            if (department.trim()) {

                params.append(
                    "department",
                    department.trim()
                );

            }


            if (startDate) {

                params.append(
                    "start_date",
                    startDate
                );

            }


            if (endDate) {

                params.append(
                    "end_date",
                    endDate
                );

            }


            const response =
                await api.get(
                    `/overtime/admin/recap?${params.toString()}`
                );


            console.log(
                "OVERTIME RECAP:",
                response.data
            );


            setData(
                response.data.data || []
            );


            setPagination(
                response.data.pagination || {
                    page: 1,
                    limit: 10,
                    total: 0,
                    totalPages: 0
                }
            );


        } catch (err) {

            console.error(
                "OVERTIME RECAP ERROR:",
                err
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadData();

    }, [
        page,
        limit,
        sort,
        name,
        department,
        startDate,
        endDate
    ]);


    // =====================================
    // RESET FILTER
    // =====================================

    const handleReset = () => {

        setName("");

        setDepartment("");

        setStartDate("");

        setEndDate("");

        setSort("latest");

        setPage(1);

    };


    // =====================================
    // CHANGE LIMIT
    // =====================================

    const handleLimitChange = (e) => {

        setLimit(
            Number(e.target.value)
        );

        setPage(1);

    };


    return (

        <Box>

            {/* ================================= */}
            {/* FILTER */}
            {/* ================================= */}

            <Card
                sx={{
                    mb: 2,
                    borderRadius: 2
                }}
            >

                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row"
                        }}
                        spacing={2}
                    >

                        {/* NAMA */}

                        <TextField
                            fullWidth
                            size="small"
                            label="Nama Karyawan"
                            value={name}
                            onChange={(e) => {

                                setName(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                            placeholder="Cari nama..."
                            InputProps={{
                                startAdornment:
                                    <SearchIcon
                                        fontSize="small"
                                        sx={{
                                            mr: 1,
                                            color: "text.secondary"
                                        }}
                                    />
                            }}
                        />


                        {/* DIVISI */}

                        <TextField
                            fullWidth
                            size="small"
                            label="Divisi"
                            value={department}
                            onChange={(e) => {

                                setDepartment(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                            placeholder="Contoh: IT"
                        />


                        {/* START DATE */}

                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Dari Tanggal"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setPage(1);
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />


                        {/* END DATE */}

                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="Sampai Tanggal"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setPage(1);
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />

                    </Stack>


                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                        sx={{ mt: 2 }}
                    >

                        {/* SORT */}

                        <TextField
                            select
                            size="small"
                            label="Urutan"
                            value={sort}
                            onChange={(e) => {

                                setSort(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                            sx={{
                                minWidth: 180
                            }}
                        >

                            <MenuItem value="latest">
                                Terbaru
                            </MenuItem>

                            <MenuItem value="oldest">
                                Terlama
                            </MenuItem>

                        </TextField>


                        <Button
                            variant="outlined"
                            startIcon={
                                <RefreshIcon />
                            }
                            onClick={
                                handleReset
                            }
                        >
                            Reset Filter
                        </Button>

                    </Stack>

                </CardContent>

            </Card>


            {/* ================================= */}
            {/* TABLE */}
            {/* ================================= */}

            <Card
                sx={{
                    borderRadius: 2
                }}
            >

                <CardContent>

                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            overflowX: "auto"
                        }}
                    >

                        <Table
                            sx={{
                                minWidth: 950
                            }}
                        >

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Karyawan
                                    </TableCell>

                                    <TableCell>
                                        Divisi
                                    </TableCell>

                                    <TableCell>
                                        Tanggal
                                    </TableCell>

                                    <TableCell>
                                        Jam
                                    </TableCell>

                                    <TableCell>
                                        Durasi
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell>
                                        Pembayaran
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                    >
                                        Aksi
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {loading ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={8}
                                            align="center"
                                            sx={{
                                                py: 5
                                            }}
                                        >
                                            Memuat data...
                                        </TableCell>

                                    </TableRow>

                                ) : data.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={8}
                                            align="center"
                                            sx={{
                                                py: 5
                                            }}
                                        >
                                            Tidak ada data lembur.
                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    data.map(
                                        (item) => (

                                            <TableRow
                                                key={item.id}
                                                hover
                                            >

                                                <TableCell>
                                                    {
                                                        item.employee_name ||
                                                        "-"
                                                    }
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        item.department ||
                                                        "-"
                                                    }
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        formatDate(
                                                            item.overtime_date
                                                        )
                                                    }
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        item.start_time?.substring(
                                                            0,
                                                            5
                                                        )
                                                    }

                                                    {" - "}

                                                    {
                                                        item.end_time?.substring(
                                                            0,
                                                            5
                                                        )
                                                    }
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        formatDuration(
                                                            item.duration_minutes
                                                        )
                                                    }
                                                </TableCell>


                                                <TableCell>

                                                    <Chip
                                                        label={
                                                            getStatusLabel(
                                                                item.status
                                                            )
                                                        }
                                                        size="small"
                                                        color={
                                                            getStatusColor(
                                                                item.status
                                                            )
                                                        }
                                                    />

                                                </TableCell>


                                                <TableCell>

                                                    {
                                                        item.status ===
                                                            "APPROVED"
                                                            ? (

                                                                <Chip
                                                                    label={
                                                                        item.payment_status ===
                                                                            "PAID"
                                                                            ? "Sudah Dibayar"
                                                                            : "Belum Dibayar"
                                                                    }
                                                                    size="small"
                                                                    color={
                                                                        item.payment_status ===
                                                                            "PAID"
                                                                            ? "success"
                                                                            : "warning"
                                                                    }
                                                                />

                                                            )
                                                            : (
                                                                "-"
                                                            )
                                                    }

                                                </TableCell>


                                                <TableCell
                                                    align="center"
                                                >

                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            setSelectedItem(
                                                                item
                                                            )
                                                        }
                                                    >

                                                        <VisibilityIcon
                                                            fontSize="small"
                                                        />

                                                    </IconButton>

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )

                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>


                    {/* ================================= */}
                    {/* PAGINATION */}
                    {/* ================================= */}

                    {/* ================================= */}
                    {/* PAGINATION */}
                    {/* ================================= */}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            mt: 2,
                            px: 2,
                            pb: 1
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1.5}
                            sx={{
                                flexWrap: "wrap"
                            }}
                        >

                            {/* TOTAL DATA */}

                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: "nowrap",
                                    mr: 0.5
                                }}
                            >
                                Total data:{" "}
                                <strong>
                                    {pagination.total}
                                </strong>
                            </Typography>


                            {/* PER HALAMAN */}

                            <TextField
                                select
                                size="small"
                                label="Per halaman"
                                value={limit}
                                onChange={handleLimitChange}
                                sx={{
                                    width: 145
                                }}
                            >

                                <MenuItem value={10}>
                                    10
                                </MenuItem>

                                <MenuItem value={25}>
                                    25
                                </MenuItem>

                                <MenuItem value={50}>
                                    50
                                </MenuItem>

                            </TextField>


                            {/* SEBELUMNYA */}

                            <Button
                                variant="outlined"
                                disabled={page <= 1}
                                onClick={() =>
                                    setPage(page - 1)
                                }
                                sx={{
                                    minWidth: 125,
                                    height: 40
                                }}
                            >
                                Sebelumnya
                            </Button>


                            {/* PAGE */}

                            <Typography
                                variant="body2"
                                sx={{
                                    minWidth: 55,
                                    textAlign: "center",
                                    fontWeight: 500
                                }}
                            >
                                {pagination.totalPages === 0
                                    ? "0 / 0"
                                    : `${page} / ${pagination.totalPages}`
                                }
                            </Typography>


                            {/* BERIKUTNYA */}

                            <Button
                                variant="outlined"
                                disabled={
                                    page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    setPage(page + 1)
                                }
                                sx={{
                                    minWidth: 125,
                                    height: 40
                                }}
                            >
                                Berikutnya
                            </Button>

                        </Stack>
                    </Box>

                </CardContent>

            </Card>


            {/* ================================= */}
            {/* DETAIL DIALOG */}
            {/* ================================= */}

            <Dialog
                open={
                    Boolean(selectedItem)
                }
                onClose={() =>
                    setSelectedItem(null)
                }
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Detail Lembur
                </DialogTitle>


                <DialogContent>

                    {selectedItem && (

                        <Stack
                            spacing={1.5}
                            sx={{
                                pt: 1
                            }}
                        >

                            <Typography>
                                <strong>
                                    Karyawan:
                                </strong>{" "}
                                {
                                    selectedItem.employee_name ||
                                    "-"
                                }
                            </Typography>


                            <Typography>
                                <strong>
                                    Divisi:
                                </strong>{" "}
                                {
                                    selectedItem.department ||
                                    "-"
                                }
                            </Typography>


                            <Typography>
                                <strong>
                                    Tanggal:
                                </strong>{" "}
                                {
                                    formatDate(
                                        selectedItem.overtime_date
                                    )
                                }
                            </Typography>


                            <Typography>
                                <strong>
                                    Jam:
                                </strong>{" "}
                                {
                                    selectedItem.start_time?.substring(
                                        0,
                                        5
                                    )
                                }

                                {" - "}

                                {
                                    selectedItem.end_time?.substring(
                                        0,
                                        5
                                    )
                                }
                            </Typography>


                            <Typography>
                                <strong>
                                    Durasi:
                                </strong>{" "}
                                {
                                    formatDuration(
                                        selectedItem.duration_minutes
                                    )
                                }
                            </Typography>


                            <Typography>
                                <strong>
                                    Status:
                                </strong>{" "}
                                {
                                    getStatusLabel(
                                        selectedItem.status
                                    )
                                }
                            </Typography>


                            <Typography>
                                <strong>
                                    Pembayaran:
                                </strong>{" "}
                                {
                                    selectedItem.status ===
                                        "APPROVED"
                                        ? selectedItem.payment_status ===
                                            "PAID"
                                            ? "Sudah Dibayar"
                                            : "Belum Dibayar"
                                        : "-"
                                }
                            </Typography>


                            <Box>

                                <Typography
                                    fontWeight={600}
                                    sx={{
                                        mb: 0.5
                                    }}
                                >
                                    Pekerjaan
                                </Typography>


                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        bgcolor:
                                            "action.hover"
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                    >
                                        {
                                            selectedItem.reason ||
                                            "-"
                                        }
                                    </Typography>

                                </Box>

                            </Box>

                        </Stack>

                    )}

                </DialogContent>


                <DialogActions>

                    <Button
                        onClick={() =>
                            setSelectedItem(null)
                        }
                    >
                        Tutup
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>

    );

}