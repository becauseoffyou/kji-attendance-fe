import { useEffect, useState } from "react";
import leaveService from "../../services/leaveService";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Fab,
    CircularProgress
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";


export default function Leave() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        loadHistory();

    }, []);
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
    };
    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };
    const leaveType = {

        SAKIT: "🏥 Sakit",

        IZIN: "📝 Izin",

        CUTI: "🌴 Cuti",

        DINAS: "🚗 Dinas",

        WFH: "🏠 WFH"

    };
    return (

        <Box sx={{ p: 2 }}>

            <Card
                sx={{
                    mb: 3,
                    background: "linear-gradient(135deg,#0e7d63,#17a673)",
                    color: "#fff"
                }}
            >
                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Pengajuan
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            opacity: .9,
                            mt: .5
                        }}
                    >
                        Ajukan izin, cuti, sakit, atau perjalanan dinas.
                    </Typography>

                </CardContent>
            </Card>

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
                                        {leaveType[item.leave_type] || item.leave_type}
                                    </Typography>

                                    <Chip
                                        label={
                                            item.status === "APPROVED"
                                                ? "Disetujui"
                                                : item.status === "REJECTED"
                                                    ? "Ditolak"
                                                    : "Menunggu"
                                        }
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
                                    {formatDate(item.start_date)}
                                    {" - "}
                                    {formatDate(item.end_date)}
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
            {
                !loading && history.length === 0 && (

                    <Typography
                        align="center"
                        color="text.secondary"
                        mt={8}
                    >
                        Belum ada riwayat pengajuan.
                    </Typography>

                )
            }

            <Fab
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 85,
                    right: 20,
                    bgcolor: "#0e7d63",

                    "&:hover": {
                        bgcolor: "#0a6a54"
                    }
                }}
            >
                <AddRoundedIcon />
            </Fab>

        </Box>

    );
}