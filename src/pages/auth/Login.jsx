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
import { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Login() {
    console.log(import.meta.env.VITE_API_URL);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        console.log("1. Tombol login diklik");

        try {
            setLoading(true);

            console.log("2. Sebelum request");

            const data = await authService.login(email, password);

            console.log("3. Sesudah request", data);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (err) {
            console.error("ERROR LOGIN:", err);
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
                          {loading ? "Loading..." : "LOGIN TEST 123"}
                        </Button>

                    </Stack>

                </CardContent>
            </Card>
        </Box>
    );
}