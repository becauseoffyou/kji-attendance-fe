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

                <CardContent
                    sx={{
                        textAlign: "center"
                    }}
                >

                    <Avatar
                        src={user.photo || ""}
                        sx={{
                            width: 90,
                            height: 90,
                            mx: "auto",
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

                    <Typography color="text.secondary">
                        {user.position}
                    </Typography>

                    <Typography color="text.secondary">
                        {user.department}
                    </Typography>

                </CardContent>

            </Card>

        </Box>

    );

}