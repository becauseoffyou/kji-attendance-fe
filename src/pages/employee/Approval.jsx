import {
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Stack,
    Typography,
    Skeleton
} from "@mui/material";

import { useEffect, useState } from "react";
import leaderService from "../../services/leaderService";
import { useNavigate, useLocation } from "react-router-dom";
import notificationService from "../../services/notificationService";

export default function Approval() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [requests, setRequests] = useState([]);

    const [summary, setSummary] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        total: 0
    });


    const loadData = async () => {

        try {

            setLoading(true);

            const { data } =
                await leaderService.getLeaveApprovals("ALL");

            setRequests(data.data || []);

            setSummary(
                data.summary || {
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

    useEffect(() => {

        loadData();

    }, []);

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    };

    const getDuration = (start, end) => {

        const s = new Date(start);
        const e = new Date(end);

        const diff =
            Math.ceil(
                (e - s) / (1000 * 60 * 60 * 24)
            ) + 1;

        return `${diff} Hari`;

    };



    return (

        <Box
            sx={{
                p: 2,
                pb: 10
            }}
        >

            {/* ================= HEADER ================= */}

            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    bgcolor: "#F5F7FA",
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

                    <Chip
                        label={`Pending (${summary.pending})`}
                        clickable
                        color={
                            status === "PENDING_SUPERVISOR"
                                ? "success"
                                : "default"
                        }
                        onClick={() =>
                            setStatus("PENDING_SUPERVISOR")
                        }
                    />

                    <Chip
                        label={`Approved (${summary.approved})`}
                        clickable
                        color={
                            status === "APPROVED"
                                ? "success"
                                : "default"
                        }
                        onClick={() =>
                            setStatus("APPROVED")
                        }
                    />

                    <Chip
                        label={`Rejected (${summary.rejected})`}
                        clickable
                        color={
                            status === "REJECTED"
                                ? "success"
                                : "default"
                        }
                        onClick={() =>
                            setStatus("REJECTED")
                        }
                    />

                    <Chip
                        label={`All (${summary.total})`}
                        clickable
                        color={
                            status === "ALL"
                                ? "success"
                                : "default"
                        }
                        onClick={() =>
                            setStatus("ALL")
                        }
                    />

                </Stack>


            </Box>

            {/* ================= FILTER ================= */}

            <Box
                sx={{
                    position: "sticky",
                    top: 60,
                    zIndex: 19,
                    bgcolor: "#F5F7FA",
                    py: 2
                }}
            >


            </Box>

            {/* ================= LIST ================= */}

            {
                loading && requests.length === 0 ? (

                    <Stack spacing={2} mt={2}>

                        {[1, 2, 3].map((item) => (

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

                        ))}

                    </Stack>

                ) : (

                    <Stack spacing={2}>

                        {filtered.length === 0 ? (

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

                            filtered.map((item) => (

                                <Card
                                    key={`${item.request_type}-${item.id}`}
                                    sx={{
                                        borderRadius: 1,
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate(
                                            item.request_type ===
                                                "ATTENDANCE_EDIT"
                                                ? `/employee/approval/attendance/${item.id}`
                                                : `/employee/approval/${item.id}`
                                        )
                                    }
                                >

                                    <CardContent>

                                        <Typography
                                            fontWeight={700}
                                            fontSize={17}
                                        >
                                            {item.name}
                                        </Typography>

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

                                            {item.start_date !==
                                                item.end_date &&
                                                ` - ${formatDate(
                                                    item.end_date
                                                )}`}
                                        </Typography>

                                        {item.request_type ===
                                            "ATTENDANCE_EDIT" && (
                                                <>
                                                    <Typography
                                                        color="text.secondary"
                                                        mt={0.5}
                                                    >
                                                        <strong>
                                                            Jam Masuk :
                                                        </strong>{" "}
                                                        {item.old_check_in
                                                            ? new Date(
                                                                item.old_check_in
                                                            ).toLocaleTimeString(
                                                                "id-ID",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }
                                                            )
                                                            : "-"}{" "}
                                                        →{" "}
                                                        {item.new_check_in
                                                            ? new Date(
                                                                item.new_check_in
                                                            ).toLocaleTimeString(
                                                                "id-ID",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }
                                                            )
                                                            : "-"}
                                                    </Typography>

                                                    <Typography
                                                        color="text.secondary"
                                                        mt={0.5}
                                                    >
                                                        <strong>
                                                            Jam Pulang :
                                                        </strong>{" "}
                                                        {item.old_check_out
                                                            ? new Date(
                                                                item.old_check_out
                                                            ).toLocaleTimeString(
                                                                "id-ID",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }
                                                            )
                                                            : "-"}{" "}
                                                        →{" "}
                                                        {item.new_check_out
                                                            ? new Date(
                                                                item.new_check_out
                                                            ).toLocaleTimeString(
                                                                "id-ID",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }
                                                            )
                                                            : "-"}
                                                    </Typography>
                                                </>
                                            )}

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

                            ))

                        )}

                    </Stack>

                )
            }

        </Box>

    );

}