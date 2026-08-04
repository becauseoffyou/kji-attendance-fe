import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box
} from "@mui/material";

const leaveTypeLabel = {
    SAKIT: "🏥 Sakit",
    IZIN: "📝 Izin",
    CUTI: "🌴 Cuti",
    DINAS: "🚗 Dinas",
    BUSINESS_TRIP: "✈️ Perjalanan Dinas",
    CLIENT: "🤝 Client",
    MEETING: "👥 Meeting",
    WFH: "🏠 WFH"
};

export default function LeaveCard({

    item,
    onClick

}) {

    const formatShortDate = (date) => {

        return new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "short"
            }
        );

    };

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };

    return (

        <Card

            onClick={onClick}

            sx={{
                mb: 2,
                borderRadius: 1,
                cursor: "pointer",
                transition: ".2s",

                "&:hover": {
                    transform: "translateY(-2px)"
                }
            }}

        >

            <CardContent>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 2,
                        textAlign: "center"
                    }}
                >

                    <Typography
                        sx={{
                            flex: 1,
                            fontWeight: 700,
                            color: "primary.main",
                            lineHeight: 1.4
                        }}
                    >

                        {leaveTypeLabel[item.leave_type] || item.leave_type}

                    </Typography>

                    <Chip
                        label={item.status}
                        size="small"
                        color={
                            item.status === "APPROVED"
                                ? "success"
                                : item.status === "REJECTED"
                                    ? "error"
                                    : "warning"
                        }
                    />

                </Box>

                <Box sx={{ mt: 1.5 }}>

                    <Typography
                        variant="body2"
                        sx={{ mb: 0 }}
                    >
                        <strong>Tanggal :</strong>{" "}
                        {formatDate(item.start_date)} - {formatDate(item.end_date)}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ mb: 0 }}
                    >
                        <strong>Durasi :</strong>{" "}
                        {
                            Math.max(
                                1,
                                Math.ceil(
                                    (
                                        new Date(item.end_date) -
                                        new Date(item.start_date)
                                    ) / 86400000
                                ) + 1
                            )
                        } Hari
                    </Typography>

                    <Typography variant="body2">

                        <strong>Keterangan :</strong>{" "}

                        {item.reason || "-"}

                    </Typography>

                </Box>
            </CardContent>

        </Card>

    );

}