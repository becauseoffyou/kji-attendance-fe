import { useEffect, useState } from "react";
import {
    Card,
    Button,
    CardContent,
    Typography,
    Box,
    Chip
} from "@mui/material";
const API_URL = "https://kji-attendance-be-production-91fc.up.railway.app";
export default function AnnouncementSlider({ announcements }) {

    const [active, setActive] = useState(0);

    useEffect(() => {

        if (!announcements.length) return;

        const timer = setInterval(() => {

            setActive((prev) =>
                prev === announcements.length - 1
                    ? 0
                    : prev + 1
            );

        }, 5000);

        return () => clearInterval(timer);

    }, [announcements]);

    if (!announcements.length) return null;

    const item = announcements[active];

    return (
        <Card
            sx={{
                mt: 2,
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,.08)"
            }}
        >

            {/* BAGIAN ATAS */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "stretch"
                }}
            >
                {/* BANNER KIRI */}
                {item.image_url && (
                    <Box
                        component="img"
                        src={`${API_URL}${item.image_url}`}
                        alt={item.title}
                        sx={{
                            width: {
                                xs: 120,
                                sm: 180
                            },
                            height: 140,
                            objectFit: "cover",
                            flexShrink: 0
                        }}
                    />
                )}

                {/* CONTENT KANAN */}
                <CardContent
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        p: 2,
                        "&:last-child": {
                            pb: 2
                        }
                    }}
                >
                    <Chip
                        label="📢 Pengumuman"
                        size="small"
                        sx={{
                            mb: 1,
                            bgcolor: "#E8F5F1",
                            color: "#0E7D63",
                            fontWeight: 600
                        }}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#111827"
                        }}
                    >
                        {item.title}
                    </Typography>

                    {item.description && (
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.5,
                                color: "#6B7280",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                            }}
                        >
                            {item.description}
                        </Typography>
                    )}

                    {item.url && (
                        <Button
                            size="small"
                            onClick={() =>
                                window.open(
                                    item.url,
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                            sx={{
                                mt: 0.5,
                                px: 0,
                                minWidth: 0,
                                color: "#0E7D63",
                                fontWeight: 700,
                                fontSize: "12px",
                                textTransform: "none"
                            }}
                        >
                            Baca Selengkapnya →
                        </Button>
                    )}
                </CardContent>
            </Box>

            {/* INDIKATOR STAY DI BAWAH */}
            {announcements.length > 1 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 0.6,
                        py: 1.2,
                        borderTop: "1px solid #F3F4F6"
                    }}
                >
                    {announcements.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setActive(index)}
                            sx={{
                                width: active === index ? 18 : 6,
                                height: 6,
                                borderRadius: 10,
                                cursor: "pointer",
                                transition: ".3s",
                                bgcolor:
                                    active === index
                                        ? "#0E7D63"
                                        : "#D1D5DB"
                            }}
                        />
                    ))}
                </Box>
            )}

        </Card>
    );
}