import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import leaderService from "../../services/leaderService";

export default function Approval() {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const loadData = async () => {

        try {

            setLoading(true);

            const { data } = await leaderService.getLeaveApprovals();
            console.log(data);
            setRequests(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);
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