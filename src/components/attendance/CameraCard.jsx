import { useRef, useState } from "react";
import Webcam from "react-webcam";

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from "@mui/material";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import attendanceService from "../../services/attendanceService";
export default function CameraCard({ photo, setPhoto }) {

    const webcamRef = useRef(null);

    // const [photo, setPhoto] = useState(null);

    const capture = () => {

        const image = webcamRef.current.getScreenshot();

        setPhoto(image);

    };

    const retake = () => {

        setPhoto(null);

    };

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
                        overflow: "hidden",
                        borderRadius: 4,
                        bgcolor: "#ECECEC"
                    }}
                >

                    {photo ? (

                        <img
                            src={photo}
                            alt="Preview"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />

                    ) : (

                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            audio={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />

                    )}

                </Box>

                {

                    photo ?

                        <Button
                            fullWidth
                            variant="outlined"
                            color="warning"
                            startIcon={<ReplayRoundedIcon />}
                            sx={{
                                mt: 2,
                                borderRadius: 3,
                                height: 48,
                            }}
                            onClick={retake}
                        >
                            Ambil Ulang
                        </Button>

                        :

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<CameraAltRoundedIcon />}
                            sx={{
                                mt: 2,
                                borderRadius: 3,
                                height: 48,
                            }}
                            onClick={capture}
                        >
                            Ambil Foto
                        </Button>

                }

            </CardContent>

        </Card>

    );

}