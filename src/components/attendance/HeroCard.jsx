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
    insideRadius,

}) {

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
                    {insideRadius === null
                        ? "📍 Lokasi Belum Terdeteksi"
                        : isCheckedIn
                            ? "🟢 Sedang Bekerja"
                            : insideRadius
                                ? "🟢 Dalam Radius"
                                : "🔴 Di Luar Radius"}
                </Typography>

            </Box>
            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                    alert("BUTTON CLICK");
                    onCheck();
                }}
            >
                TEST BUTTON
            </Button>

        </Paper>

    );

}