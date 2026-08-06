import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Avatar,
    Box,
    LinearProgress,
    IconButton
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AttendanceSummaryTable({ data = [] }) {

    return (

        <Card
            elevation={0}
            sx={{
                mt: 2,
                borderRadius: 4,
                border: "1px solid #E5E7EB"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Rekap Absensi
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Karyawan</TableCell>

                            <TableCell align="center">
                                Hadir
                            </TableCell>

                            <TableCell align="center">
                                Terlambat
                            </TableCell>
                            <TableCell align="center">
                                Menit Telat
                            </TableCell>

                            <TableCell align="center">
                                Cuti
                            </TableCell>

                            <TableCell align="center">
                                Izin
                            </TableCell>
                            <TableCell align="center">
                                Sakit
                            </TableCell>

                            <TableCell align="center">
                                Alpha
                            </TableCell>

                            <TableCell>
                                Kehadiran
                            </TableCell>

                            <TableCell align="center">
                                Detail
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {data.map((item) => (

                            <TableRow key={item.id} hover>

                                <TableCell>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >

                                        <Avatar
                                            sx={{
                                                width: 42,
                                                height: 42,
                                                bgcolor: "#D1D5DB",
                                                color: "#fff",
                                                fontWeight: 600,
                                                flexShrink: 0
                                            }}
                                        >
                                            {item.name.charAt(0)}
                                        </Avatar>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center"
                                            }}
                                        >

                                            <Typography
                                                variant="body1"
                                                fontWeight={600}
                                                lineHeight={1.2}
                                            >
                                                {item.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.department}
                                            </Typography>

                                        </Box>

                                    </Box>

                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={item.present}
                                        color="success"
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={item.late}
                                        color="warning"
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={`${item.late_minutes} mnt`}
                                        size="small"
                                        variant="outlined"
                                        color="warning"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {item.leave}
                                </TableCell>
                                <TableCell align="center">
                                    {item.sick}
                                </TableCell>

                                <TableCell align="center">
                                    {item.permission}
                                </TableCell>

                                <TableCell align="center">
                                    {item.alpha}
                                </TableCell>

                                <TableCell>

                                    <LinearProgress
                                        variant="determinate"
                                        value={item.percent}
                                        sx={{
                                            height: 8,
                                            borderRadius: 5,
                                            mb: .5
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                    >
                                        {item.percent}%
                                    </Typography>

                                </TableCell>

                                <TableCell align="center">

                                    <IconButton>

                                        <VisibilityIcon />

                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}