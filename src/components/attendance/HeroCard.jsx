import {
    Paper,
    Typography,
    Button,
    Box
} from "@mui/material";

export default function HeroCard({
    time,
    status,
    onCheck,
    onCheckOut,
    insideRadius,
    loading,
    todayData
}){

    const isCheckedIn = status === "checked-in";

    return (

        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "linear-gradient(135deg,#0F766E,#14B8A6)",
                color: "#fff",
                p: 3,
            }}
        >

            <Typography
                sx={{
                    fontSize: 30,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1,
                }}
            >
                {time.toLocaleTimeString("id-ID")}
            </Typography>

            <Typography
                sx={{
                    mt: 1,
                    textAlign: "center",
                    opacity: .9,
                }}
            >
                {time.toLocaleDateString("id-ID", {

                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"

                })}
            </Typography>



            <Box
                sx={{
                    mt: 3,
                    mb: 3,
                    textAlign: "center"
                }}
            >

                <Typography fontWeight={600} fontSize={18}>
                   {
    status === "checked-out"
        ? "✅ Sudah Check Out"
        : insideRadius === null
            ? "📍 Lokasi Belum Terdeteksi"
            : status === "checked-in"
                ? "🟢 Sedang Bekerja"
                : insideRadius
                    ? "🟢 Dalam Radius"
                    : "🔴 Di Luar Radius"
}
                </Typography>

            </Box>

            <Box sx={{ mt: 3 }}>

    <Typography align="center">
        Check In
    </Typography>

    <Typography
        align="center"
        fontWeight={700}
    >
        {
            todayData?.checkIn
                ? new Date(todayData.checkIn).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "-"
        }
    </Typography>

    <Typography
        align="center"
        sx={{ mt: 2 }}
    >
        Check Out
    </Typography>

    <Typography
        align="center"
        fontWeight={700}
    >
        {
            todayData?.checkOut
                ? new Date(todayData.checkOut).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "-"
        }
    </Typography>

    <Typography
        align="center"
        sx={{ mt: 2 }}
    >
        Total Kerja
    </Typography>

    <Typography
        align="center"
        fontWeight={700}
    >
        {todayData?.workingHours || "-"}
    </Typography>

</Box>
          <Button
    fullWidth
    size="large"
    variant="contained"
    disabled={loading || status === "checked-out"}
    onClick={status === "checked-in"
        ? onCheckOut
        : onCheck}
>
    {
        loading
            ? "Memproses..."
            : status === "checked-in"
                ? "Check Out"
                : status === "checked-out"
                    ? "Sudah Check Out"
                    : "Check In"
    }
</Button>

        </Paper>

    );

}