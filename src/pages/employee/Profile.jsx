import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    CircularProgress,
    Typography
} from "@mui/material";

import authService from "../../services/authService";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const result = await authService.getMe(token);

            setUser(result.user);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        if (!user) {
            return (
                <Typography align="center">
                    Data user tidak ditemukan
                </Typography>
            );
        }

        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={5}
            >
                <CircularProgress />
            </Box>
        );

    }

    return (

        <Box sx={{ p: 2 }}>

            <Card
                sx={{
                    borderRadius: 4
                }}
            >

                <CardContent
                    sx={{
                        textAlign: "center"
                    }}
                >

                    <Avatar
                        src={user?.photo || ""}
                        sx={{
                            width: 90,
                            height: 90,
                            mx: "auto",
                            mb: 2,
                            bgcolor: "#16A34A",
                            fontSize: 34
                        }}
                    >
                        {user?.name?.charAt(0)}
                    </Avatar>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        {user.name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: .5 }}
                    >
                        {user.position}
                    </Typography>

                    <Chip
                        label={user.department}
                        color="success"
                        size="small"
                        sx={{
                            mt: 2,
                            px: 1
                        }}
                    />

                </CardContent>

            </Card>
            <Card
                sx={{
                    mt: 2,
                    borderRadius: 4
                }}
            >
                <CardContent>

                    <Box py={1}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            NIK
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            mt={0.5}
                        >
                            {user.nik}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box py={2}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Email
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            mt={0.5}
                            sx={{
                                wordBreak: "break-word"
                            }}
                        >
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box py={2}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Department
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            mt={0.5}
                        >
                            {user.department}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box py={2}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Jabatan
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            mt={0.5}
                        >
                            {user.position}
                        </Typography>
                    </Box>

                </CardContent>
            </Card>
        </Box>

    );

}