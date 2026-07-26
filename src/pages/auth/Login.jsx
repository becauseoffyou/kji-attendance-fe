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

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                            label="Email / NIK"
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
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
                            sx={{
                                height: 50,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Login
                        </Button>

                    </Stack>

                </CardContent>
            </Card>
        </Box>
    );
}