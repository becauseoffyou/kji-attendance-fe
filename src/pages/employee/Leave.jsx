import { useEffect, useState } from "react";

import leaveService from "../../services/leaveService";
import LeaveDialog from "../../components/attendance/LeaveDialog";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Fab,
    Skeleton
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Swal from "sweetalert2";

export default function Leave() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [leaveType, setLeaveType] = useState("SAKIT");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            setLoading(true);

            const { data } = await leaveService.history();

            setHistory(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };

    const leaveTypeLabel = {

        SAKIT: "🏥 Sakit",
        IZIN: "📝 Izin",
        CUTI: "🌴 Cuti",
        DINAS: "🚗 Dinas",
        BUSINESS_TRIP: "✈️ Perjalanan Dinas",
        CLIENT: "🤝 Kunjungan Client",
        MEETING: "👥 Meeting",
        WFH: "🏠 Work From Home"

    };

    const handleSubmit = async () => {

        if (!startDate || !endDate) {

            Swal.fire({
                icon: "warning",
                title: "Tanggal belum lengkap"
            });

            return;

        }

        if (!reason.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Keterangan wajib diisi"
            });

            return;

        }

        try {

            setSubmitLoading(true);

            const formData = new FormData();

            formData.append("leave_type", leaveType);
            formData.append("start_date", startDate);
            formData.append("end_date", endDate);
            formData.append("reason", reason);

            if (attachment) {

                formData.append(
                    "attachment",
                    attachment
                );

            }

            await leaveService.create(formData);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Pengajuan berhasil dikirim."
            });

            setOpenDialog(false);

            setLeaveType("SAKIT");
            setStartDate("");
            setEndDate("");
            setReason("");
            setAttachment(null);

            loadHistory();

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text:
                    err.response?.data?.message ||
                    "Terjadi kesalahan."
            });

        } finally {

            setSubmitLoading(false);

        }

    };

    return (

        <Box
            sx={{
                p: 2,
                pb: 10
            }}
        >

            {/* Header */}

            <Card
                sx={{
                    mb: 3,
                    background: "linear-gradient(135deg,#0e7d63,#17a673)",
                    color: "#fff"
                }}
            >

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Pengajuan
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            mt: .5,
                            opacity: .9
                        }}
                    >
                        Ajukan izin, cuti, sakit, atau perjalanan dinas.
                    </Typography>

                </CardContent>

            </Card>

            {

                loading ?

                    [...Array(4)].map((_, index) => (

                        <Card
                            key={index}
                            sx={{
                                mb: 2,
                                borderRadius: 3
                            }}
                        >

                            <CardContent>

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >

                                    <Skeleton
                                        variant="text"
                                        width={130}
                                        height={28}
                                    />

                                    <Skeleton
                                        variant="rounded"
                                        width={90}
                                        height={28}
                                    />

                                </Box>

                                <Skeleton
                                    variant="text"
                                    width="70%"
                                    height={24}
                                    sx={{ mt: 1 }}
                                />

                                <Skeleton
                                    variant="text"
                                    width="90%"
                                    height={18}
                                    sx={{ mt: .5 }}
                                />

                            </CardContent>

                        </Card>

                    ))

                    :

                    history.length === 0 ?

                        <Card
                            sx={{
                                borderRadius: 3
                            }}
                        >

                            <CardContent>

                                <Typography
                                    align="center"
                                    color="text.secondary"
                                >
                                    Belum ada riwayat pengajuan.
                                </Typography>

                            </CardContent>

                        </Card>

                        :

                        history.map((item) => (

                            <Card
                                key={item.id}
                                sx={{
                                    mb: 2,
                                    borderRadius: 3
                                }}
                            >

                                <CardContent>

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                leaveTypeLabel[item.leave_type] ||
                                                item.leave_type
                                            }
                                        </Typography>

                                        <Chip
                                            size="small"
                                            label={
                                                item.status === "APPROVED"

                                                    ? "Disetujui"

                                                    : item.status === "REJECTED"

                                                        ? "Ditolak"

                                                        : "Menunggu"
                                            }
                                            color={
                                                item.status === "APPROVED"

                                                    ? "success"

                                                    : item.status === "REJECTED"

                                                        ? "error"

                                                        : "warning"
                                            }
                                        />

                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mt: 1
                                        }}
                                    >
                                        {formatDate(item.start_date)}
                                        {" - "}
                                        {formatDate(item.end_date)}
                                    </Typography>

                                    {

                                        item.reason && (

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 1
                                                }}
                                            >
                                                {item.reason}
                                            </Typography>

                                        )

                                    }

                                </CardContent>

                            </Card>

                        ))

            }

            <Fab
                color="primary"
                onClick={() => setOpenDialog(true)}
                sx={{
                    position: "fixed",
                    bottom: 85,
                    right: 20,
                    bgcolor: "#0e7d63",

                    "&:hover": {

                        bgcolor: "#0a6a54"

                    }

                }}
            >

                <AddRoundedIcon />

            </Fab>
            <LeaveDialog

                open={openDialog}
                onClose={() => setOpenDialog(false)}

                leaveType={leaveType}
                setLeaveType={setLeaveType}

                startDate={startDate}
                setStartDate={setStartDate}

                endDate={endDate}
                setEndDate={setEndDate}
                reason={reason}
                setReason={setReason}
                attachment={attachment}
                setAttachment={setAttachment}
                loading={submitLoading}

                onSubmit={handleSubmit}
            />

        </Box>

    );

}