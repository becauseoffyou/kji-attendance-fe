import {
    Box,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
    Skeleton
} from "@mui/material";

import { useEffect, useState } from "react";

import leaderService from "../../services/leaderService";

import { useNavigate } from "react-router-dom";


export default function Approval() {

    const navigate = useNavigate();

    // =========================
    // STATE
    // =========================

    const [loading, setLoading] = useState(false);

    const [requests, setRequests] = useState([]);

    const [summary, setSummary] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        total: 0
    });

    const [statusFilter, setStatusFilter] =
        useState("ALL");


    // =========================
    // LOAD DATA
    // =========================

    const loadData = async () => {

        try {

            setLoading(true);

            const { data } =
                await leaderService.getLeaveApprovals(
                    "ALL"
                );

            setRequests(
                data?.data || []
            );

            setSummary(
                data?.summary || {
                    pending: 0,
                    approved: 0,
                    rejected: 0,
                    total: 0
                }
            );

        } catch (err) {

            console.error(
                "Gagal mengambil data approval:",
                err
            );

            setRequests([]);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        loadData();

    }, []);


    // =========================
    // LOCAL FILTER
    // =========================

    const filtered = requests.filter((item) => {

        if (statusFilter === "ALL") {
            return true;
        }

        return item.status === statusFilter;

    });


    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    };


    // =========================
    // DURATION
    // =========================

    const getDuration = (start, end) => {

        if (!start || !end) {
            return "-";
        }

        const s = new Date(start);

        const e = new Date(end);

        const diff =
            Math.ceil(
                (e - s) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        return `${diff} Hari`;

    };


    // =========================
    // FORMAT TIME
    // =========================

    const formatTime = (value) => {

        if (!value) {
            return "-";
        }

        return new Date(value).toLocaleTimeString(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        );

    };


    // =========================
    // RENDER
    // =========================

    return (

        <Box
            sx={{
                p: 2,
                pb: 10
            }}
        >

            {/* =========================
                HEADER
            ========================= */}

            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    bgcolor: "#F5F7FA"
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Approval
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    {summary.pending} Menunggu Persetujuan
                </Typography>


                {/* =========================
                    FILTER CHIPS
                ========================= */}

                <Stack
                    direction="row"
                    spacing={1}
                    mt={2}
                    sx={{
                        overflowX: "auto",
                        flexWrap: "nowrap",

                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >
                    {/* ALL */}

                    <Chip
                        label={`All (${summary.total})`}
                        clickable
                        color={
                            statusFilter === "ALL"
                                ? "success"
                                : "default"
                        }
                        variant={
                            statusFilter === "ALL"
                                ? "filled"
                                : "outlined"
                        }
                        onClick={() =>
                            setStatusFilter("ALL")
                        }
                    />

                    {/* PENDING */}

                    <Chip
                        label={`Pending (${summary.pending})`}
                        clickable
                        color={
                            statusFilter ===
                                "PENDING_SUPERVISOR"
                                ? "success"
                                : "default"
                        }
                        variant={
                            statusFilter ===
                                "PENDING_SUPERVISOR"
                                ? "filled"
                                : "outlined"
                        }
                        onClick={() =>
                            setStatusFilter(
                                "PENDING_SUPERVISOR"
                            )
                        }
                    />


                    {/* APPROVED */}

                    <Chip
                        label={`Approved (${summary.approved})`}
                        clickable
                        color={
                            statusFilter ===
                                "APPROVED"
                                ? "success"
                                : "default"
                        }
                        variant={
                            statusFilter ===
                                "APPROVED"
                                ? "filled"
                                : "outlined"
                        }
                        onClick={() =>
                            setStatusFilter(
                                "APPROVED"
                            )
                        }
                    />


                    {/* REJECTED */}

                    <Chip
                        label={`Rejected (${summary.rejected})`}
                        clickable
                        color={
                            statusFilter ===
                                "REJECTED"
                                ? "success"
                                : "default"
                        }
                        variant={
                            statusFilter ===
                                "REJECTED"
                                ? "filled"
                                : "outlined"
                        }
                        onClick={() =>
                            setStatusFilter(
                                "REJECTED"
                            )
                        }
                    />




                </Stack>

            </Box>


            {/* =========================
                LIST
            ========================= */}

            {
                loading &&
                    requests.length === 0 ? (

                    <Stack
                        spacing={2}
                        mt={2}
                    >

                        {[1, 2, 3].map(
                            (item) => (

                                <Card
                                    key={item}
                                    sx={{
                                        borderRadius: 1
                                    }}
                                >

                                    <CardContent>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >

                                            <Box flex={1}>

                                                <Skeleton
                                                    width="45%"
                                                    height={32}
                                                />

                                                <Skeleton
                                                    width="30%"
                                                    height={22}
                                                />

                                                <Skeleton
                                                    width="55%"
                                                    height={20}
                                                />

                                            </Box>


                                            <Skeleton
                                                variant="rounded"
                                                width={70}
                                                height={28}
                                                sx={{
                                                    borderRadius: 1
                                                }}
                                            />

                                        </Stack>

                                    </CardContent>

                                </Card>

                            )
                        )}

                    </Stack>

                ) : (

                    <Stack
                        spacing={2}
                        mt={2}
                    >

                        {
                            filtered.length === 0 ? (

                                <Typography
                                    textAlign="center"
                                    color="text.secondary"
                                    sx={{
                                        mt: 5,
                                        height: "40vh",
                                        display: "grid",
                                        placeItems: "center"
                                    }}
                                >
                                    Tidak ada data
                                </Typography>

                            ) : (

                                filtered.map(
                                    (item) => (

                                        <Card
                                            key={`${item.request_type}-${item.id}`}

                                            sx={{
                                                borderRadius: 1,
                                                cursor: "pointer"
                                            }}

                                            onClick={() => {

                                                if (
                                                    item.request_type ===
                                                    "ATTENDANCE_EDIT"
                                                ) {

                                                    navigate(
                                                        `/employee/approval/attendance/${item.id}`
                                                    );

                                                } else {

                                                    navigate(
                                                        `/employee/approval/${item.id}`
                                                    );

                                                }

                                            }}
                                        >

                                            <CardContent>

                                                {/* NAME */}

                                                <Typography
                                                    fontWeight={700}
                                                    fontSize={17}
                                                >
                                                    {item.name}
                                                </Typography>


                                                {/* TYPE */}

                                                <Typography
                                                    color="text.secondary"
                                                    mt={0.5}
                                                >

                                                    <strong>
                                                        Pengajuan :
                                                    </strong>{" "}

                                                    {item.leave_type}{" "}

                                                    {getDuration(
                                                        item.start_date,
                                                        item.end_date
                                                    )}

                                                </Typography>


                                                {/* DATE */}

                                                <Typography
                                                    color="text.secondary"
                                                    mt={0.5}
                                                >

                                                    <strong>
                                                        Tanggal :
                                                    </strong>{" "}

                                                    {formatDate(
                                                        item.start_date
                                                    )}

                                                    {
                                                        item.start_date !==
                                                        item.end_date &&
                                                        ` - ${formatDate(
                                                            item.end_date
                                                        )}`
                                                    }

                                                </Typography>


                                                {/* =========================
                                                    ATTENDANCE EDIT
                                                ========================= */}

                                                {
                                                    item.request_type ===
                                                    "ATTENDANCE_EDIT" && (

                                                        <>

                                                            <Typography
                                                                color="text.secondary"
                                                                mt={0.5}
                                                            >

                                                                <strong>
                                                                    Jam Masuk :
                                                                </strong>{" "}

                                                                {formatTime(
                                                                    item.old_check_in
                                                                )}

                                                                {" → "}

                                                                {formatTime(
                                                                    item.new_check_in
                                                                )}

                                                            </Typography>


                                                            <Typography
                                                                color="text.secondary"
                                                                mt={0.5}
                                                            >

                                                                <strong>
                                                                    Jam Pulang :
                                                                </strong>{" "}

                                                                {formatTime(
                                                                    item.old_check_out
                                                                )}

                                                                {" → "}

                                                                {formatTime(
                                                                    item.new_check_out
                                                                )}

                                                            </Typography>

                                                        </>

                                                    )
                                                }


                                                {/* =========================
                                                    STATUS
                                                ========================= */}

                                                <Chip
                                                    size="small"

                                                    label={
                                                        item.status ===
                                                            "PENDING_SUPERVISOR"

                                                            ? "Pending"

                                                            : item.status ===
                                                                "APPROVED"

                                                                ? "Approved"

                                                                : "Rejected"
                                                    }

                                                    color={
                                                        item.status ===
                                                            "PENDING_SUPERVISOR"

                                                            ? "warning"

                                                            : item.status ===
                                                                "APPROVED"

                                                                ? "success"

                                                                : "error"
                                                    }

                                                    sx={{
                                                        mt: 2
                                                    }}
                                                />

                                            </CardContent>

                                        </Card>

                                    )
                                )

                            )
                        }

                    </Stack>

                )
            }

        </Box>

    );

}