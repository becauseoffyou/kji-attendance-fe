import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
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

                <CardContent>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >

                        <Avatar
                            src={user.photo || ""}
                            sx={{
                                width: 90,
                                height: 90,
                                bgcolor: "#16A34A",
                                fontSize: 34,
                                mb: 2
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {user.name}
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {user.position}
                        </Typography>

                        <Chip
                            label={user.department}
                            color="success"
                            size="small"
                            sx={{ mt: 1 }}
                        />

                    </Box>

                </CardContent>

            </Card>
            <Card
                sx={{
                    mt: 2,
                    borderRadius: 4
                }}
            >

                <CardContent>

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        NIK
                    </Typography>

                    <Typography
                        fontWeight={600}
                        mb={2}
                    >
                        {user.nik}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Email
                    </Typography>

                    <Typography
                        fontWeight={600}
                        mb={2}
                    >
                        {user.email}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Department
                    </Typography>

                    <Typography
                        fontWeight={600}
                        mb={2}
                    >
                        {user.department}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Jabatan
                    </Typography>

                    <Typography fontWeight={600}>
                        {user.position}
                    </Typography>

                </CardContent>

            </Card>

        </Box>

    );

}