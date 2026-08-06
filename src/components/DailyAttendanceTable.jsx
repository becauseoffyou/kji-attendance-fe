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

                        {data.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={8}
                                    align="center"
                                >
                                    Belum ada data absensi.
                                </TableCell>

                            </TableRow>

                        ) : (

                            data.map((item) => (

                                <TableRow
                                    key={item.id}
                                    hover
                                >

                                    {/* Karyawan */}

                                    <TableCell>

                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={2}
                                        >

                                            <Avatar>

                                                {item.name.charAt(0)}

                                            </Avatar>

                                            <Box>

                                                <Typography
                                                    fontWeight={600}
                                                >
                                                    {item.name}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {item.department}
                                                </Typography>

                                            </Box>

                                        </Box>

                                    </TableCell>

                                    {/* Check In */}

                                    <TableCell>

                                        {item.check_in
                                            ? new Date(item.check_in)
                                                .toLocaleTimeString("id-ID", {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })
                                            : "-"}

                                    </TableCell>

                                    {/* Check Out */}

                                    <TableCell>

                                        {item.check_out
                                            ? new Date(item.check_out)
                                                .toLocaleTimeString("id-ID", {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })
                                            : "-"}

                                    </TableCell>

                                    {/* Status */}

                                    <TableCell>

                                        <Chip
                                            label={item.status}
                                            size="small"
                                            color={
                                                item.status === "Belum Check In"
                                                    ? "default"
                                                    : "success"
                                            }
                                        />

                                    </TableCell>

                                    {/* Telat */}

                                    <TableCell>

                                        {item.late_minutes} menit

                                    </TableCell>

                                    {/* Lokasi */}

                                    <TableCell align="center">

                                        <IconButton>

                                            <LocationOnIcon />

                                        </IconButton>

                                    </TableCell>

                                    {/* Foto */}

                                    <TableCell align="center">

                                        <IconButton>

                                            <PhotoCameraIcon />

                                        </IconButton>

                                    </TableCell>

                                    {/* Detail */}

                                    <TableCell align="center">

                                        <IconButton>

                                            <VisibilityIcon />

                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}