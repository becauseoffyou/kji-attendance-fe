import {
    Typography,
    Box,
    Button,
    Stack
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function AdminAttendance() {

    return (

        <>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Absensi
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Kelola data absensi karyawan
                    </Typography>

                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                    >
                        Export Excel
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<PictureAsPdfIcon />}
                    >
                        Export PDF
                    </Button>

                </Stack>

            </Box>

        </>

    );

}