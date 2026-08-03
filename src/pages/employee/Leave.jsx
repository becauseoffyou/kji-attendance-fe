import { useEffect, useState } from "react";
import leaveService from "../../services/leaveService";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    CircularProgress
} from "@mui/material";

const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);

export default function Leave() {
    const loadHistory = async () => {

        try {

            setLoading(true);

            const { data } = await leaveService.history();

            setHistory(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }



        useEffect(() => {

            loadHistory();

        }, []);

        return (

            <Box sx={{ p: 2 }}>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Riwayat Pengajuan
                </Typography>

                {

                    loading ?

                        <CircularProgress />

                        :

                        history.map((item) => (

                            <Card
                                key={item.id}
                                sx={{
                                    mb: 2,
                                    borderRadius: 3
                                }}
                            >

                                <CardContent>

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {item.leave_type}
                                        </Typography>

                                        <Chip
                                            label={item.status}
                                            color={
                                                item.status === "APPROVED"
                                                    ? "success"
                                                    : item.status === "REJECTED"
                                                        ? "error"
                                                        : "warning"
                                            }
                                            size="small"
                                        />

                                    </Box>

                                    <Typography
                                        mt={1}
                                        color="text.secondary"
                                    >
                                        {item.start_date}
                                        {" "}
                                        s/d
                                        {" "}
                                        {item.end_date}
                                    </Typography>

                                    <Typography
                                        mt={1}
                                    >
                                        {item.reason}
                                    </Typography>

                                </CardContent>

                            </Card>

                        ))

                }

            </Box>

        );

    };
}