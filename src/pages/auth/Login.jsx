import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useState, useEffect } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { loadUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const DASHBOARD_ROLES = ["ADMIN", "HR"];

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) return;

        if (DASHBOARD_ROLES.includes(user.role)) {

            navigate("/dashboard");

        } else {

            navigate("/employee/attendance");

        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const data = await authService.login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            await loadUser();
            if (DASHBOARD_ROLES.includes(data.user.role)) {

                navigate("/dashboard");

            } else {

                navigate("/employee/attendance");

            }
        } catch (err) {
            alert(err.response?.data?.message || "Login gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#F5F7FB"
            }}
        >
            <Card
                elevation={4}
                sx={{
                    width: 420,
                    borderRadius: 4
                }}
            >
                <CardContent sx={{ p: 5 }}>

                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center'
                        }}
                        fontWeight={700}
                    >
                        KJI Attendance
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            mt: 1,
                            textAlign: 'center',
                            mb: 4
                        }}
                    >
                        Haiii, Selamat Pagi
                    </Typography>

                    <Stack spacing={3}>

                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                        />

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleLogin}
                            disabled={loading}
                            sx={{
                                height: 50,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>

                    </Stack>

                </CardContent>
            </Card>
        </Box>
    );
}