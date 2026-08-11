import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead, TableSortLabel,
    TableRow, Skeleton,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmployeeCreate from "./EmployeeCreate";
import attendanceService from "../../services/attService";
import EmployeeDetail from "./EmployeeDetail";

export default function EmployeeList() {

    const [search, setSearch] = useState("");
    const [openCreate, setOpenCreate] = useState(false);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {

        try {

            setLoading(true);

            const result =
                await attendanceService.getEmployees();


            setEmployees(result.data);

        } catch (err) {

            console.error("GET EMPLOYEES ERROR:", err);

        } finally {

            setLoading(false);

        }

    };

    const handleSort = (property) => {

        const isAsc =
            orderBy === property && order === "asc";

        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);

    };
    const filteredEmployees = employees.filter((item) =>
        item.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {

        const valueA = a[orderBy] ?? "";
        const valueB = b[orderBy] ?? "";

        return (
            valueA
                .toString()
                .localeCompare(
                    valueB.toString(),
                    "id",
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                )
            *
            (order === "asc" ? 1 : -1)
        );

    });

    return (
        <Box>

            {/* HEADER */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "stretch",
                    sm: "center"
                }}
                spacing={2}
            >

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Daftar Karyawan
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Kelola data karyawan dan akun login
                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenCreate(true)}
                    sx={{
                        px: 1,
                        py: 0.8,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Tambah Karyawan
                </Button>
            </Stack>


            {/* TABLE */}

            <Card
                elevation={0}
                sx={{
                    mt: 3,
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    {/* SEARCH */}

                    <TextField
                        size="small"
                        placeholder="Cari nama karyawan..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        sx={{
                            mb: 2,
                            width: {
                                xs: "100%",
                                sm: 320
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                    />


                    <Box
                        sx={{
                            width: "100%",
                            overflowX: "auto"
                        }}
                    >

                        <Table>
                            <TableHead>

                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{ width: 60 }}
                                    >
                                        No.
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "name"}
                                            direction={orderBy === "name" ? order : "asc"}
                                            onClick={() => handleSort("name")}
                                            sx={{
                                                "& .MuiTableSortLabel-icon": {
                                                    opacity: 0.5,
                                                },
                                                "&.Mui-active .MuiTableSortLabel-icon": {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            Karyawan
                                        </TableSortLabel>
                                    </TableCell>


                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "nik"}
                                            direction={orderBy === "nik" ? order : "asc"}
                                            onClick={() => handleSort("nik")}
                                            sx={{
                                                "& .MuiTableSortLabel-icon": {
                                                    opacity: 0.5,
                                                },
                                                "&.Mui-active .MuiTableSortLabel-icon": {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            NIK
                                        </TableSortLabel>
                                    </TableCell>


                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "department"}
                                            direction={orderBy === "department" ? order : "asc"}
                                            onClick={() => handleSort("department")}
                                            sx={{
                                                "& .MuiTableSortLabel-icon": {
                                                    opacity: 0.5,
                                                },
                                                "&.Mui-active .MuiTableSortLabel-icon": {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            Departemen
                                        </TableSortLabel>
                                    </TableCell>


                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "position"}
                                            direction={orderBy === "position" ? order : "asc"}
                                            onClick={() => handleSort("position")}
                                            sx={{
                                                "& .MuiTableSortLabel-icon": {
                                                    opacity: 0.5,
                                                },
                                                "&.Mui-active .MuiTableSortLabel-icon": {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            Jabatan
                                        </TableSortLabel>
                                    </TableCell>


                                    <TableCell>
                                        Status
                                    </TableCell>


                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "employee_type"}
                                            direction={
                                                orderBy === "employee_type"
                                                    ? order
                                                    : "asc"
                                            }
                                            onClick={() =>
                                                handleSort("employee_type")
                                            }
                                            sx={{
                                                "& .MuiTableSortLabel-icon": {
                                                    opacity: 0.5,
                                                },
                                                "&.Mui-active .MuiTableSortLabel-icon": {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            Tipe
                                        </TableSortLabel>
                                    </TableCell>


                                    <TableCell align="center">
                                        Aksi
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {/* ================= SKELETON ================= */}

                                {loading ? (

                                    Array.from({ length: 5 }).map((_, index) => (

                                        <TableRow key={`skeleton-${index}`}>

                                            {/* NO */}
                                            <TableCell align="center">
                                                <Skeleton
                                                    variant="text"
                                                    width={20}
                                                    sx={{ mx: "auto" }}
                                                />
                                            </TableCell>


                                            {/* KARYAWAN */}
                                            <TableCell>

                                                <Stack
                                                    direction="row"
                                                    spacing={1.5}
                                                    alignItems="center"
                                                >

                                                    <Skeleton
                                                        variant="circular"
                                                        width={38}
                                                        height={38}
                                                    />

                                                    <Box>

                                                        <Skeleton
                                                            variant="text"
                                                            width={120}
                                                            height={22}
                                                        />

                                                        <Skeleton
                                                            variant="text"
                                                            width={150}
                                                            height={18}
                                                        />

                                                    </Box>

                                                </Stack>

                                            </TableCell>


                                            {/* NIK */}
                                            <TableCell>

                                                <Skeleton
                                                    variant="text"
                                                    width={120}
                                                />

                                            </TableCell>


                                            {/* DEPARTMENT */}
                                            <TableCell>

                                                <Skeleton
                                                    variant="rounded"
                                                    width={90}
                                                    height={24}
                                                />

                                            </TableCell>


                                            {/* POSITION */}
                                            <TableCell>

                                                <Skeleton
                                                    variant="text"
                                                    width={90}
                                                />

                                            </TableCell>


                                            {/* STATUS */}
                                            <TableCell>

                                                <Skeleton
                                                    variant="rounded"
                                                    width={65}
                                                    height={24}
                                                />

                                            </TableCell>


                                            {/* TYPE */}
                                            <TableCell>

                                                <Skeleton
                                                    variant="rounded"
                                                    width={70}
                                                    height={24}
                                                />

                                            </TableCell>


                                            {/* ACTION */}
                                            <TableCell align="center">

                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    justifyContent="center"
                                                >

                                                    <Skeleton
                                                        variant="circular"
                                                        width={32}
                                                        height={32}
                                                    />

                                                    <Skeleton
                                                        variant="circular"
                                                        width={32}
                                                        height={32}
                                                    />

                                                </Stack>

                                            </TableCell>

                                        </TableRow>

                                    ))

                                ) : (

                                    /* ================= DATA ================= */

                                    sortedEmployees.map((item, index) => (

                                        <TableRow
                                            key={item.id}
                                            hover
                                        >

                                            {/* NO */}
                                            <TableCell align="center">
                                                {index + 1}
                                            </TableCell>


                                            {/* KARYAWAN */}
                                            <TableCell>

                                                <Stack
                                                    direction="row"
                                                    spacing={1.5}
                                                    alignItems="center"
                                                >

                                                    <Avatar
                                                        sx={{
                                                            width: 38,
                                                            height: 38,
                                                        }}
                                                    >
                                                        {item.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </Avatar>


                                                    <Box>

                                                        <Typography
                                                            fontWeight={600}
                                                            fontSize={14}
                                                        >
                                                            {item.name}
                                                        </Typography>


                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {item.email || "—"}
                                                        </Typography>

                                                    </Box>

                                                </Stack>

                                            </TableCell>


                                            {/* NIK */}
                                            <TableCell>
                                                {item.nik}
                                            </TableCell>


                                            {/* DEPARTMENT */}
                                            <TableCell>

                                                <Chip
                                                    label={item.department}
                                                    size="small"
                                                />

                                            </TableCell>


                                            {/* POSITION */}
                                            <TableCell>
                                                {item.position || "—"}
                                            </TableCell>


                                            {/* STATUS */}
                                            <TableCell>

                                                <Chip
                                                    label={
                                                        item.status
                                                            ? "Aktif"
                                                            : "Nonaktif"
                                                    }
                                                    color={
                                                        item.status
                                                            ? "success"
                                                            : "default"
                                                    }
                                                    size="small"
                                                />

                                            </TableCell>


                                            {/* TYPE */}
                                            <TableCell>

                                                <Chip
                                                    label={
                                                        item.employee_type ===
                                                            "KONTRAK"
                                                            ? "Kontrak"
                                                            : "Tetap"
                                                    }
                                                    size="small"
                                                    variant="outlined"
                                                />

                                            </TableCell>


                                            {/* ACTION */}
                                            <TableCell align="center">

                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => {
                                                        setSelectedEmployee(item);
                                                        setOpenDetail(true);
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>


                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        console.log(
                                                            "Edit:",
                                                            item
                                                        )
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                            </TableCell>

                                        </TableRow>

                                    ))

                                )}


                                {/* ================= EMPTY ================= */}

                                {!loading &&
                                    filteredEmployees.length === 0 && (

                                        <TableRow>

                                            <TableCell
                                                colSpan={8}
                                                align="center"
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                    py={4}
                                                >
                                                    Data karyawan tidak ditemukan
                                                </Typography>

                                            </TableCell>

                                        </TableRow>

                                    )}

                            </TableBody>
                        </Table>

                    </Box>

                </CardContent>

            </Card>
            <EmployeeCreate
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSuccess={loadEmployees}
            />
            <EmployeeDetail
                open={openDetail}
                employee={selectedEmployee}
                onClose={() => {
                    setOpenDetail(false);
                    setSelectedEmployee(null);
                }}
            />
        </Box>
    );
}