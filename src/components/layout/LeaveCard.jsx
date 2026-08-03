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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                        gap: 2
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

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 2,
                        textAlign: "center"
                    }}
                >

                    <Box>

                        <Typography
                            fontWeight={700}
                            fontSize={20}
                        >
                            {formatShortDate(item.start_date)}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Mulai
                        </Typography>

                    </Box>

                    <Box>

                        <Typography
                            fontWeight={700}
                            fontSize={20}
                        >
                            {formatShortDate(item.end_date)}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Selesai
                        </Typography>

                    </Box>

                    <Box>

                        <Typography
                            fontWeight={700}
                            fontSize={18}
                        >
                            {Math.max(
                                1,
                                Math.ceil(
                                    (
                                        new Date(item.end_date) -
                                        new Date(item.start_date)
                                    ) / 86400000
                                ) + 1
                            )}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Hari
                        </Typography>

                    </Box>

                </Box>

                <Typography
                    sx={{
                        mt: 2,
                        color: "text.secondary"
                    }}
                >
                    {item.reason}
                </Typography>

            </CardContent>

        </Card>

    );

}