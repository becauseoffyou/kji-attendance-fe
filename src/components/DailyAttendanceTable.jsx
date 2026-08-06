import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Box,
    Chip,
    IconButton
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function DailyAttendanceTable({

    data = []

}) {

    return (

        <Card
            elevation={0}
            sx={{
                mt: 2,
                borderRadius: 3,
                border: "1px solid #E5E7EB"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Data Absensi Hari Ini
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Karyawan</TableCell>

                            <TableCell>Check In</TableCell>

                            <TableCell>Check Out</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Telat</TableCell>

                            <TableCell align="center">
                                Lokasi
                            </TableCell>

                            <TableCell align="center">
                                Foto
                            </TableCell>

                            <TableCell align="center">
                                Detail
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {data.length === 0 && (

                            <TableRow>

                                <TableCell
                                    colSpan={8}
                                    align="center"
                                >
                                    Belum ada data absensi.
                                </TableCell>

                            </TableRow>

                        )}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}