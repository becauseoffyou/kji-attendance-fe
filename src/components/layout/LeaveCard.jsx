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
                borderRadius: 3,
                cursor: "pointer",
                transition: ".2s",

                "&:hover": {
                    transform: "translateY(-2px)"
                }
            }}

        >

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Stack spacing={.5}>

                        <Typography
                            fontWeight={700}
                            fontSize={17}
                        >

                            {leaveTypeLabel[item.leave_type] || item.leave_type}

                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >

                            {formatDate(item.start_date)}

                            {"  •  "}

                            {formatDate(item.end_date)}

                        </Typography>

                    </Stack>

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

                <Typography
                    mt={2}
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >

                    {item.reason}

                </Typography>

            </CardContent>

        </Card>

    );

}