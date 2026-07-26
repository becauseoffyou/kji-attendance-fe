import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from "@mui/material";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

export default function CameraCard() {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 2,
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    mb={2}
                >
                    Selfie
                </Typography>

                <Box
                    sx={{
                        aspectRatio: "4 / 3",
                        bgcolor: "#ECECEC",
                        borderRadius: 4,

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        color: "#666",
                    }}
                >
                    Preview Kamera
                </Box>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<CameraAltRoundedIcon />}
                    sx={{
                        mt: 2,
                        borderRadius: 3,
                        height: 48,
                    }}
                >
                    Ambil Foto
                </Button>

            </CardContent>

        </Card>

    );

}