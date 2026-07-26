import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export default function AttendanceChart({ data }) {
    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 4,
                height: "100%"
            }}

        >
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={2}
                >
                    Kehadiran Minggu Ini
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <AreaChart data={data}>

                        <CartesianGrid strokeDasharray="4 4" />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="hadir"
                            stroke="#0F766E"
                            fill="#0F766E22"
                        />

                    </AreaChart>
                </ResponsiveContainer>

            </CardContent>
        </Card>
    );
}