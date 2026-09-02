import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip
} from "@mui/material";

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
                            minHeight: 150,
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
                            fontSize: {
                                xs: "15px",
                                sm: "17px"
                            },
                            color: "#111827",
                            lineHeight: 1.3
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
                                lineHeight: 1.4,

                                // Biar card nggak kepanjangan
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

                    {/* DOT SLIDER */}
                    {announcements.length > 1 && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                                gap: 0.6
                            }}
                        >
                            {announcements.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setActive(index)}
                                    sx={{
                                        width:
                                            active === index
                                                ? 18
                                                : 6,
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
                </CardContent>
            </Box>
        </Card>
    );

}