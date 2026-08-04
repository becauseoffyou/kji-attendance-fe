import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Button,
    Stack,
    TextField,
    Skeleton
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import leaderService from "../../services/leaderService";

export default function ApprovalDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [detail, setDetail] = useState(null);

    const [loading, setLoading] = useState(true);

    const [note, setNote] = useState("");

    const loadDetail = async () => {

        try {

            const { data } = await leaderService.getLeaveDetail(id);

            setDetail(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDetail();

    }, []);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

    const getDuration = (start, end) => {

        const s = new Date(start);

        const e = new Date(end);

        return (
            Math.ceil(
                (e - s) / (1000 * 60 * 60 * 24)
            ) + 1
        );

    };

    if (loading) {

        return (

            <Box p={2}>

                <Skeleton height={50} />

                <Skeleton
                    height={120}
                    sx={{ mt: 2 }}
                />

                <Skeleton
                    height={250}
                    sx={{ mt: 2 }}
                />

            </Box>

        );

    }

    return (
        <Box
            sx={{
                height: "100%"
            }}
        >
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    bgcolor: "#F5F7FA",
                    pt: 1,
                    pb: 2,
                    px: 2,
                    mb: 2
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    fontstyle="bold"
                >
                    Detail Approval
                </Typography>

            </Box>
            <Box
                sx={{
                    p: 2,
                    pb: 12 // supaya tidak ketutup Bottom Navigation
                }}
            >

                <Card
                    sx={{
                        mt: 2,
                    }}
                >

                    <CardContent>
                        <InfoItem
                            title="Nama Karyawan"
                            value={detail.name + "/" + detail.department + "/" + detail.position}
                        />
                        <Divider sx={{ my: 2 }} />
                        <InfoItem
                            title="Jenis Pengajuan"
                            value={detail.leave_type}
                        />

                        <Divider sx={{ my: 2 }} />

                        <InfoItem
                            title="Tanggal"
                            value={formatDate(detail.start_date)}
                        />

                        <Divider sx={{ my: 2 }} />

                        <InfoItem
                            title="Durasi"
                            value={`${getDuration(
                                detail.start_date,
                                detail.end_date
                            )} Hari`}
                        />

                        <Divider sx={{ my: 2 }} />

                        <InfoItem
                            title="Sisa Cuti"
                            value={`${detail.leave_balance} Hari`}
                        />

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            fontWeight={600}
                            mb={1}
                        >
                            Alasan
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {detail.reason}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            fontWeight={600}
                            mb={1}
                        >
                            Lampiran
                        </Typography>

                        {

                            detail.attachment

                                ?

                                <Button>

                                    Lihat Lampiran

                                </Button>

                                :

                                <Typography
                                    color="text.secondary"
                                >

                                    Tidak ada lampiran

                                </Typography>

                        }

                        <Divider sx={{ my: 2 }} />

                        <TextField

                            fullWidth

                            multiline

                            rows={4}

                            label="Catatan Supervisor"

                            value={note}

                            onChange={(e) => setNote(e.target.value)}

                        />

                    </CardContent>

                </Card>

                <Stack
                    spacing={2}
                    sx={{
                        mt: 4,
                        mb: 2
                    }}
                >

                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="error"
                        sx={{
                            height: 52,
                            borderRadius: 3,
                            fontWeight: 600,
                            textTransform: "none"
                        }}
                    >
                        Reject
                    </Button>

                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="success"
                        sx={{
                            height: 52,
                            borderRadius: 3,
                            fontWeight: 600,
                            textTransform: "none"
                        }}
                    >
                        Approve
                    </Button>

                </Stack>

            </Box>
        </Box>
    );

}

function InfoItem({

    title,

    value

}) {

    return (

        <Box>

            <Typography

                fontSize={13}
                fontWeight={700}
                color="text.primary"

            >

                {title}

            </Typography>

            <Typography

                mt={.5}

                fontWeight={600}

            >

                {value}

            </Typography>

        </Box>

    );

}