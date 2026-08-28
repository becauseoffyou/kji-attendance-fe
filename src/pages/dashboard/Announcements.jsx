import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import announcementService
    from "../../services/announcementService";


export default function Announcements() {

    const [data, setData] =
        useState([]);

    const [loading, setLoading] =
        useState(false);


    const loadData = async () => {

        try {

            setLoading(true);

            const result =
                await announcementService.getAll();

            setData(
                result.data || []
            );

        } catch (err) {

            console.error(
                "GET ANNOUNCEMENTS ERROR:",
                err
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadData();

    }, []);


    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    return (

        <Box>

            {/* HEADER */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "stretch",
                    sm: "center"
                }}
                spacing={2}
                sx={{ mb: 3 }}
            >

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Pengumuman
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Kelola pengumuman yang tampil
                        pada aplikasi karyawan.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Tambah Pengumuman
                </Button>

            </Stack>


            {/* CONTENT */}

            {loading ? (

                <Card>

                    <CardContent>

                        <Typography
                            color="text.secondary"
                        >
                            Memuat pengumuman...
                        </Typography>

                    </CardContent>

                </Card>

            ) : data.length === 0 ? (

                <Card>

                    <CardContent>

                        <Box
                            sx={{
                                py: 6,
                                textAlign: "center"
                            }}
                        >

                            <Typography
                                fontWeight={600}
                            >
                                Belum ada pengumuman
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                Tambahkan pengumuman
                                untuk ditampilkan pada
                                aplikasi karyawan.
                            </Typography>

                        </Box>

                    </CardContent>

                </Card>

            ) : (

                <Stack spacing={2}>

                    {data.map((item) => (

                        <Card key={item.id}>

                            <CardContent>

                                <Stack
                                    direction={{
                                        xs: "column",
                                        md: "row"
                                    }}
                                    justifyContent="space-between"
                                    spacing={2}
                                >

                                    <Box>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >

                                            <Typography
                                                fontWeight={700}
                                            >
                                                {item.title}
                                            </Typography>

                                            <Chip
                                                size="small"
                                                label={
                                                    item.is_active
                                                        ? "Aktif"
                                                        : "Nonaktif"
                                                }
                                                color={
                                                    item.is_active
                                                        ? "success"
                                                        : "default"
                                                }
                                            />

                                        </Stack>


                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {item.description || "-"}
                                        </Typography>


                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                            sx={{ mt: 1 }}
                                        >
                                            Periode:{" "}
                                            {formatDate(
                                                item.start_date
                                            )}
                                            {" - "}
                                            {formatDate(
                                                item.end_date
                                            )}
                                        </Typography>


                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            Urutan:{" "}
                                            {item.sort_order ?? 0}
                                        </Typography>

                                    </Box>

                                </Stack>

                            </CardContent>

                        </Card>

                    ))}

                </Stack>

            )}

        </Box>

    );

}