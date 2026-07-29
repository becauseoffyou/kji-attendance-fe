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
    insideRadius,
    loading,
    todayData,
    onOpenAttendance
}) {

    return (

        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                background: "linear-gradient(135deg,#0F766E,#14B8A6)",
                color: "#fff",
                p: 2.5,
            }}
        >

            {/* JAM */}

            <Typography
                sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1,
                }}
            >
                {time.toLocaleTimeString("id-ID")}
            </Typography>

            {/* TANGGAL */}

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

            {/* STATUS */}

            <Box
                sx={{
                    mt: 2,
                    mb: 2,
                    textAlign: "center"
                }}
            >

                <Typography
                    fontWeight={600}
                    fontSize={17}
                >
                    {
                        status === "checked-out"
                            ? "✅ Sudah Absen Pulang"
                            : insideRadius === null
                                ? "Hai, Sudah waktunya bekerja"
                                : status === "checked-in"
                                    ? "🟢 Sedang Bekerja"
                                    : insideRadius
                                        ? "🟢 Sudah absen?"
                                        : "🔴 Kamu jauh dari Kantor?"
                    }
                </Typography>

            </Box>

            {/* INFO CARD */}

            <Grid
                container
                spacing={2}
                sx={{
                    mb: 2
                }}
            >

                {/* CHECK IN */}

                <Grid size={6}>

                    <Paper
                        elevation={0}
                        sx={{
                            height: 85,
                            borderRadius: 2,
                            p: 1.5,

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",

                            bgcolor: "rgba(255,255,255,.12)",
                            backdropFilter: "blur(10px)",
                            color: "#fff"
                        }}
                    >

                        <LoginRoundedIcon
                            sx={{
                                fontSize: 24,
                                color: "#ffffff"
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{ mt: .5 }}
                        >
                            Check In
                        </Typography>

                        <Typography
                            fontWeight={700}
                            fontSize={18}
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
                            height: 85,
                            borderRadius: 2,
                            p: 1.5,

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",

                            bgcolor: "rgba(255,255,255,.12)",
                            backdropFilter: "blur(10px)",
                            color: "#fff"
                        }}
                    >

                        <LogoutRoundedIcon
                            sx={{
                                fontSize: 24,
                                color: todayData?.checkOut
                                    ? "#ffff"
                                    : "#EF4444"
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{ mt: .5 }}
                        >
                            Check Out
                        </Typography>

                        <Typography
                            fontWeight={700}
                            fontSize={18}
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
                            height: 70,
                            borderRadius: 2,
                            p: 1.5,

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",

                            bgcolor: "rgba(255,255,255,.12)",
                            backdropFilter: "blur(10px)",
                            color: "#fff"
                        }}
                    >

                        <AccessTimeRoundedIcon
                            sx={{
                                fontSize: 22,
                                color: "#ffffff"
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{ mt: .5 }}
                        >
                            Total Kerja
                        </Typography>

                        <Typography
                            fontWeight={700}
                            fontSize={17}
                        >
                            {todayData?.workingHours || "-"}
                        </Typography>

                    </Paper>

                </Grid>

            </Grid>

            {/* BUTTON */}

            <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{
                    mt: 1,
                    py: 1.3,
                    borderRadius: 2,
                    fontWeight: 700,
                    bgcolor: "#ffffff",
                    color: "#0F766E",
                    "&:hover": {
                        bgcolor: "#F3F4F6"
                    }
                }}
                disabled={loading || status === "checked-out" ||  insideRadius === false}
                onClick={onOpenAttendance}
            >

                {
                    loading
                        ? "Memproses..."
                        : status === "checked-in"
                            ? "Absen Pulang"
                            : status === "checked-out"
                                ? "Sudah Check Out"
                                : "Absen Masuk"
                }

            </Button>

        </Paper>

    );

}