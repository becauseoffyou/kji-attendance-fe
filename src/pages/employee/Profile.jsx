import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    CircularProgress,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import authService from "../../services/authService";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openLogout, setOpenLogout] = useState(false);
    const navigate = useNavigate();

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


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <Box sx={{ p: 2 }}>

            <Card
                sx={{
                    borderRadius: 2
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
                            boxShadow: "0 8px 25px rgba(22,163,74,.25)",
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
                    borderRadius: 2
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
            <Card
                sx={{
                    mt: 2,
                    borderRadius: 2
                }}
            >
                <List disablePadding>

                    <ListItemButton>

                        <ListItemIcon>
                            <LockOutlinedIcon color="primary" />
                        </ListItemIcon>

                        <ListItemText
                            primary="Ganti Password"
                            secondary="Ubah password akun Anda"
                        />

                        <ChevronRightRoundedIcon color="action" />

                    </ListItemButton>

                    <Divider />

                    <ListItemButton
                        onClick={() => setOpenLogout(true)}
                        sx={{
                            color: "error.main"
                        }}
                    >
                        <ListItemIcon>
                            <LogoutRoundedIcon color="error" />
                        </ListItemIcon>

                        <ListItemText
                            primary="Logout"
                            secondary="Keluar dari aplikasi"
                        />

                        <ChevronRightRoundedIcon color="error" />

                    </ListItemButton>

                </List>
            </Card>
            <Dialog
                open={openLogout}
                onClose={() => setOpenLogout(false)}
            >

                <DialogTitle>
                    Logout
                </DialogTitle>

                <DialogContent>
                    Apakah Anda yakin ingin keluar?
                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpenLogout(false)}
                    >
                        Batal
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </DialogActions>

            </Dialog>
            <Box
                sx={{
                    mt: 4,
                    mb: 2,
                    textAlign: "center"
                }}
            >
                <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                >
                    KJI Attendance
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Version 1.0.0
                </Typography>
            </Box>
        </Box>

    );

}