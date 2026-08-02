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
                mt: 3,
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: "#fff",
boxShadow: "0 8px 24px rgba(0,0,0,.08)",
borderRadius: 3,
                color: "#fff"
            }}
        >

            <CardContent>

                <Chip
                    label="📢 Pengumuman"
                    sx={{
                        mb: 2,
                        bgcolor: "#E8F5F1",
color: "#0E7D63",
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    {item.title}
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        opacity: .9
                    }}
                >
                    {item.description}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3,
                        gap: 1
                    }}
                >

                    {announcements.map((_, index) => (

                        <Box
                            key={index}
                            sx={{
                                width: active === index ? 24 : 8,
                                height: 8,
                                borderRadius: 10,
                                transition: ".3s",
                                bgcolor:
                                    active === index
                                        ? "#fff"
                                        : "rgba(255,255,255,.4)"
                            }}
                        />

                    ))}

                </Box>

            </CardContent>

        </Card>

    );

}