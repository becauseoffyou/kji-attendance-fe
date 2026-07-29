import {
    Paper,
    Typography,
    Button,
    Box,
    Grid
} from "@mui/material";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function HeroCard({
    time,
    status,
    onCheck,
    onCheckOut,
    insideRadius,
    loading,
    todayData
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

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 3,
                    mb: 3
                }}
            >
                <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>

                    {/* CHECK IN */}

                    <Grid size={6}>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,.12)",
                                backdropFilter: "blur(8px)",
                                textAlign: "center",
                                color: "#fff"
                            }}
                        >

                            <LoginRoundedIcon
                                sx={{
                                    fontSize: 34,
                                    color: "#4ADE80"
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{ mt: 1 }}
                            >
                                Check In
                            </Typography>

                            <Typography
                                fontWeight={700}
                                fontSize={22}
                            >
                                {
                                    todayData?.checkIn
                                        ? new Date(todayData.checkIn).toLocaleTimeString(
                                            "id-ID",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            }
                                        )
                                        : "-"
                                }
                            </Typography>

                        </Paper>

                    </Grid>

                    {/* CHECK OUT */}

                    <Grid size={6}>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,.12)",
                                backdropFilter: "blur(8px)",
                                textAlign: "center",
                                color: "#fff"
                            }}
                        >

                            <LogoutRoundedIcon
                                sx={{
                                    fontSize: 34,
                                    color: todayData?.checkOut
                                        ? "#4ADE80"
                                        : "#EF4444"
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{ mt: 1 }}
                            >
                                Check Out
                            </Typography>

                            <Typography
                                fontWeight={700}
                                fontSize={22}
                            >
                                {
                                    todayData?.checkOut
                                        ? new Date(todayData.checkOut).toLocaleTimeString(
                                            "id-ID",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            }
                                        )
                                        : "-"
                                }
                            </Typography>

                        </Paper>

                    </Grid>

                    {/* TOTAL */}

                    <Grid size={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,.12)",
                                backdropFilter: "blur(8px)",
                                textAlign: "center",
                                color: "#fff"
                            }}
                        >
                            <AccessTimeRoundedIcon
                                sx={{
                                    fontSize: 30,
                                    color: "#60A5FA"
                                }}
                            />

                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Total Kerja
                            </Typography>

                            <Typography
                                fontWeight={700}
                                fontSize={20}
                            >
                                {todayData?.workingHours || "-"}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>
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