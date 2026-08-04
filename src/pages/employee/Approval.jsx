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

export default function Approval() {

    const [loading, setLoading] = useState(false);

    const [requests, setRequests] = useState([]);

    const [statusFilter, setStatusFilter] = useState("ALL");

    const loadData = async () => {

        try {

            setLoading(true);

            const { data } = await leaderService.getLeaveApprovals();

            setRequests(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    const filtered = requests.filter((item) => {

        if (statusFilter === "ALL") return true;

        return item.status === statusFilter;

    });

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
                    pb: 2
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
                    {requests.filter(x => x.status === "PENDING_SUPERVISOR").length} Menunggu Persetujuan
                </Typography>

            </Box>

            {/* ================= FILTER ================= */}

            <Box
                sx={{
                    position: "sticky",
                    top: 68,
                    zIndex: 19,
                    bgcolor: "#F5F7FA",
                    py: 2
                }}
            >

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        overflowX: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >

                    {[
                        {
                            label: "Semua",
                            value: "ALL"
                        },
                        {
                            label: "Pending",
                            value: "PENDING_SUPERVISOR"
                        },
                        {
                            label: "Approved",
                            value: "APPROVED"
                        },
                        {
                            label: "Rejected",
                            value: "REJECTED"
                        }
                    ].map((item) => (

                        <Chip

                            key={item.value}

                            clickable

                            label={item.label}

                            color={
                                statusFilter === item.value
                                    ? "success"
                                    : "default"
                            }

                            onClick={() => setStatusFilter(item.value)}

                            sx={{
                                borderRadius: 5,
                                fontWeight: 600
                            }}

                        />

                    ))}

                </Stack>

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
                                        borderRadius: 4
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
                                                    borderRadius: 5
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

                                filtered.length === 0

                                    ?

                                    (

                                        <Typography
                                            textAlign="center"
                                            color="text.secondary"
                                            mt={5}
                                        >

                                            Tidak ada data

                                        </Typography>

                                    )

                                    :

                                    filtered.map((item) => (

                                        <Card
                                            key={item.id}
                                            sx={{
                                                borderRadius: 4,
                                                cursor: "pointer",
                                                transition: ".2s",

                                                "&:hover": {
                                                    transform: "translateY(-2px)"
                                                }
                                            }}
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
                                                    mt={.5}
                                                >
                                                    {item.leave_type}
                                                </Typography>

                                                <Typography
                                                    color="text.secondary"
                                                    mt={.5}
                                                >
                                                    {item.start_date}
                                                    {" - "}
                                                    {item.end_date}
                                                </Typography>

                                                <Chip

                                                    size="small"

                                                    label={item.status}

                                                    color={
                                                        item.status === "PENDING_SUPERVISOR"

                                                            ? "warning"

                                                            : item.status === "APPROVED"

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

                            }

                        </Stack>

                    )

            }

        </Box>

    );

}