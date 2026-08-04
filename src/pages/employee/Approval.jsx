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
import { useNavigate } from "react-router-dom";

export default function Approval() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [requests, setRequests] = useState([]);

    const [status, setStatus] = useState("PENDING_SUPERVISOR");

    const [summary, setSummary] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        total: 0
    });


    const loadData = async () => {

        try {

            setLoading(true);

            const { data } = await leaderService.getLeaveApprovals(status);

            setRequests(data.data);

            setSummary(data.summary);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, [status]);

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

                loading

                    ?

                    (

                        <Stack spacing={2} mt={2}>

                            {[1, 2, 3, 4, 5].map((item) => (

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
                                                    borderRadius: 2
                                                }}
                                            />

                                        </Stack>

                                    </CardContent>

                                </Card>

                            ))}

                        </Stack>

                    )

                    :

                    (

                        <Stack spacing={2}>

                            {

                                requests.length === 0

                                    ?

                                    (

                                        <Typography
                                            textAlign="center"
                                            color="text.secondary"
                                            sx={{
                                                mt: 5,
                                                textAlign: "center",
                                                height: "50vh",
                                                display: "grid",
                                                placeItems: "center",
                                            }}
                                        >

                                            Tidak ada data

                                        </Typography>

                                    )

                                    :

                                    requests.map((item) => (

                                        <Card
                                            key={item.id}
                                            sx={{
                                                borderRadius: 1,
                                                cursor: "pointer",
                                                transition: ".2s",

                                                "&:hover": {
                                                    transform: "translateY(-2px)"
                                                }
                                            }}

                                            onClick={() => {

                                                if (item.status === "PENDING_SUPERVISOR") {

                                                    navigate(`/employee/approval/${item.id}`);

                                                }

                                            }}
                                        >

                                            <CardContent>

                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                >

                                                    <Typography
                                                        fontWeight="bold"
                                                        fontSize={17}
                                                        sx={{
                                                            flexGrow: 1
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            ml: "auto"
                                                        }}
                                                    >
                                                        <Chip
                                                            size="small"
                                                            label={
                                                                item.status === "PENDING_SUPERVISOR"
                                                                    ? "Pending"
                                                                    : item.status === "APPROVED"
                                                                        ? "Approved"
                                                                        : "Rejected"
                                                            }
                                                            color={
                                                                item.status === "PENDING_SUPERVISOR"
                                                                    ? "warning"
                                                                    : item.status === "APPROVED"
                                                                        ? "success"
                                                                        : "error"
                                                            }
                                                        />
                                                    </Box>

                                                </Stack>

                                                <Typography
                                                    color="text.secondary"
                                                    mt={1}
                                                >
                                                    <strong>Pengajuan :</strong>{" "}
                                                    {item.leave_type} • {getDuration(item.start_date, item.end_date)}
                                                </Typography>

                                                <Typography
                                                    color="text.secondary"
                                                    mt={0.5}
                                                >
                                                    <strong>Tanggal :</strong>{" "}
                                                    {formatDate(item.start_date)}
                                                    {item.start_date !== item.end_date &&
                                                        ` - ${formatDate(item.end_date)}`}
                                                </Typography>

                                            </CardContent>

                                        </Card>

                                    ))

                            }

                        </Stack>

                    )

            }

        </Box>

    );

}