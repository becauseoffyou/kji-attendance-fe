import {
    useRef,
    forwardRef,
    useImperativeHandle
} from "react";
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
// import attendanceService from "../../services/attService";
const CameraCard = forwardRef(({ photo, setPhoto, loading }, ref) => {

    const webcamRef = useRef(null);

    const capture = () => {

        if (!webcamRef.current) return null;

        const image = webcamRef.current.getScreenshot();

        if (!image) return null;

        setPhoto(image);

        return image;

    };

    useImperativeHandle(ref, () => ({

        capture

    }));

    const retake = () => {

        setPhoto(null);

    };

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 2
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

                    {
                        photo ?

                            <img
                                src={photo}
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />

                            :

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

                    }

                </Box>

                {

                    photo ?

                        <Button
                            fullWidth
                            variant="outlined"
                            color="warning"
                            startIcon={<ReplayRoundedIcon />}
                            disabled={loading}
                            sx={{
                                mt: 2,
                                borderRadius: 3,
                                height: 48
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
                            disabled={loading}
                            sx={{
                                mt: 2,
                                borderRadius: 3,
                                height: 48
                            }}
                            onClick={capture}
                        >
                            Ambil Foto
                        </Button>

                }

            </CardContent>

        </Card>

    );

});

export default CameraCard;