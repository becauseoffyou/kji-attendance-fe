import { Box, Typography } from "@mui/material";

export default function Approval() {
    return (
        <Box p={2}>

            <Typography
                variant="h5"
                fontWeight={700}
            >
                Approval
            </Typography>

            <Typography color="text.secondary">
                Daftar pengajuan bawahan akan muncul di sini.
            </Typography>

        </Box>
    );
}