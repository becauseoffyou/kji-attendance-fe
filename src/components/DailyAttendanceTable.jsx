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
    IconButton, Skeleton
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function DailyAttendanceTable({

    data = [], loading = false


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

                <Table >

                    <TableHead>

                        <TableRow hover
                            sx={{
                                "& td": {
                                    py: 1
                                }
                            }}>

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

                        {loading ? (

                            [...Array(6)].map((_, index) => (

                                <TableRow key={index}>

                                    <TableCell>
                                        <Skeleton variant="circular" width={38} height={38} />
                                    </TableCell>

                                    <TableCell>
                                        <Skeleton width={70} />
                                    </TableCell>

                                    <TableCell>
                                        <Skeleton width={70} />
                                    </TableCell>

                                    <TableCell>
                                        <Skeleton width={100} />
                                    </TableCell>

                                    <TableCell>
                                        <Skeleton width={50} />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Skeleton width={30} />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Skeleton width={30} />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Skeleton width={30} />
                                    </TableCell>

                                </TableRow>

                            ))

                        ) : data.length === 0 ? (

                            <TableRow hover
                                sx={{
                                    "& td": {
                                        py: 1
                                    }
                                }}>

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
                                    hover hover
                                    sx={{
                                        "& td": {
                                            py: 1
                                        }
                                    }}
                                >

                                    {/* Karyawan */}

                                    <TableCell>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    width: 38,
                                                    height: 38,
                                                    fontSize: 16,
                                                    bgcolor: "#D1D5DB",
                                                    color: "#374151"
                                                }}
                                            >
                                                {item.name.charAt(0)}
                                            </Avatar>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1
                                                }}
                                            >

                                                <Typography
                                                    fontWeight={600}
                                                    fontSize={14}
                                                >
                                                    {item.name}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        bgcolor: "#F3F4F6",
                                                        px: 1,
                                                        py: .2,
                                                        borderRadius: 10
                                                    }}
                                                >
                                                    {item.department}
                                                </Typography>

                                            </Box>

                                        </Box>

                                    </TableCell>

                                    {/* Check In */}

                                    <TableCell>

                                        {item.check_in
                                            ? item.check_in.substring(11, 16)
                                            : "-"}

                                    </TableCell>

                                    {/* Check Out */}

                                    <TableCell>

                                        {item.check_out
                                            ? item.check_out.substring(11, 16)
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