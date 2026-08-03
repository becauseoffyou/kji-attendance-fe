import { useEffect, useState, useMemo } from "react";

import leaveService from "../../services/leaveService";
import LeaveDialog from "../../components/attendance/LeaveDialog";
import LeaveDetailDialog from "../../components/layout/LeaveDetailDialog";
import LeaveCard from "../../components/layout/LeaveCard";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Fab,
    Stack,
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
    const [selectedLeave, setSelectedLeave] = useState(null);

    const [openDetail, setOpenDetail] = useState(false);

    const [summary, setSummary] = useState({
        leave_balance: 0
    });

    const [statusFilter, setStatusFilter] = useState("ALL");
    const filteredHistory = useMemo(() => {

        if (statusFilter === "ALL") {
            return history;
        }

        return history.filter(
            item => item.status === statusFilter
        );

    }, [history, statusFilter]);

    const statusCount = useMemo(() => ({

        ALL: history.length,

        PENDING: history.filter(
            item => item.status === "PENDING"
        ).length,

        APPROVED: history.filter(
            item => item.status === "APPROVED"
        ).length,

        REJECTED: history.filter(
            item => item.status === "REJECTED"
        ).length,

        CANCELLED: history.filter(
            item => item.status === "CANCELLED"
        ).length

    }), [history]);


    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            setLoading(true);

            const { data } = await leaveService.history();

            setHistory(data.data);

            setSummary(data.summary);
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

        SAKIT: "Sakit",
        IZIN: "Izin",
        CUTI: "Cuti",
        DINAS: "Dinas",
        BUSINESS_TRIP: "Perjalanan Dinas",
        CLIENT: "Kunjungan Client",
        MEETING: "Meeting",
        WFH: "Work From Home"

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

            if (leaveType === "SAKIT" && !attachment) {

                Swal.fire({

                    icon: "warning",

                    title: "Lampiran Wajib",

                    text: "Pengajuan sakit wajib melampirkan surat dokter."

                });

                return;

            }

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

    const chipStyle = (value) => ({
        borderRadius: 5,
        fontWeight: 600,
        px: 0.5,
        transition: ".2s",
        transform:
            statusFilter === value
                ? "scale(1.05)"
                : "scale(1)"
    });

    return (

        <Box
            sx={{
                bgcolor: "#f5f7fb",
                minHeight: "100vh"
            }}
        >

            {/* Header */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    bgcolor: "#F5F7FA",
                    px: 2,
                    pt: 2,
                    pb: 2,
                    borderBottom: "1px solid #ECEFF1",
                    boxShadow: "0 2px 10px rgba(0,0,0,.05)"
                }}
            >
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
                                mt: 1,
                                opacity: .9
                            }}
                        >
                            Sisa Cuti Tahunan
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {summary.leave_balance} Hari
                        </Typography>

                    </CardContent>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            mt: 2,
                            overflowX: "auto",
                            pb: .5,

                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}
                    >



                    </Stack>
                    <Chip
                        label={`Semua (${statusCount.ALL})`}

                        clickable
                        color={statusFilter === "ALL" ? "primary" : "default"}
                        onClick={() => setStatusFilter("ALL")}
                    />

                    <Chip
                        label={`Pending (${statusCount.PENDING})`}
                        clickable
                        sx={chipStyle("PENDING")}
                        color={statusFilter === "PENDING" ? "warning" : "default"}
                        onClick={() => setStatusFilter("PENDING")}
                    />

                    <Chip
                        label={`Approved (${statusCount.APPROVED})`}
                        clickable
                        sx={chipStyle("APPROVED")}
                        color={statusFilter === "APPROVED" ? "success" : "default"}
                        onClick={() => setStatusFilter("APPROVED")}
                    />

                    <Chip
                        label={`Rejected (${statusCount.REJECTED})`}
                        clickable
                        sx={chipStyle("REJECTED")}
                        color={statusFilter === "REJECTED" ? "error" : "default"}
                        onClick={() => setStatusFilter("REJECTED")}
                    />

                    <Chip

                        label={`Cancelled (${statusCount.CANCELLED})`}

                        clickable

                        color={
                            statusFilter === "CANCELLED"
                                ? "primary"
                                : "default"
                        }

                        onClick={() =>
                            setStatusFilter("CANCELLED")
                        }

                    />
                </Card>
            </Box>
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

                    filteredHistory.length === 0 ?

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

                        filteredHistory.map(item => (

                            <LeaveCard

                                key={item.id}

                                item={item}

                                onClick={() => {

                                    setSelectedLeave(item);

                                    setOpenDetail(true);

                                }}

                            />

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
                onClose={() => {

                    setOpenDialog(false);

                    setLeaveType("SAKIT");

                    setStartDate("");

                    setEndDate("");

                    setReason("");

                    setAttachment(null);

                }}

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
            <LeaveDetailDialog

                open={openDetail}

                onClose={() => setOpenDetail(false)}

                data={selectedLeave}

            />
        </Box>

    );

}