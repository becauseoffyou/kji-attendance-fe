import { useState } from "react";

import {
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function Header() {
    const [notifAnchor, setNotifAnchor] = useState(null);
    const [profileAnchor, setProfileAnchor] = useState(null);

    const notifications = [
        "Pengajuan cuti baru",
        "3 Karyawan belum check in",
        "1 Pengajuan lembur",
    ];

    return (
        <>
            <Box
                sx={{
                    height: 80,
                    px: 4,
                    bgcolor: "#fff",
                    borderBottom: "1px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* LEFT */}
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Dashboard
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Selamat Datang, Irhandy 👋
                    </Typography>
                </Box>

                {/* RIGHT */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {/* NOTIFICATION */}
                    <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
                        <Badge badgeContent={notifications.length} color="error">
                            <NotificationsNoneRoundedIcon />
                        </Badge>
                    </IconButton>

                    {/* PROFILE */}
                    <Box
                        onClick={(e) => setProfileAnchor(e.currentTarget)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: 1.5,
                            py: 1,
                            borderRadius: 3,
                            cursor: "pointer",
                            "&:hover": {
                                bgcolor: "#F3F4F6",
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 42,
                                height: 42,
                                bgcolor: "#0F766E",
                            }}
                        >
                            I
                        </Avatar>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                }}
                            >
                                Irhandy
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Administrator
                            </Typography>
                        </Box>

                        <KeyboardArrowDownRoundedIcon
                            sx={{
                                color: "#9CA3AF",
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* ========================= */}
            {/* NOTIFICATION MENU */}
            {/* ========================= */}

            <Menu
                anchorEl={notifAnchor}
                open={Boolean(notifAnchor)}
                onClose={() => setNotifAnchor(null)}
                PaperProps={{
                    sx: {
                        width: 280,
                        borderRadius: 3,
                    },
                }}
            >
                <Typography
                    px={2}
                    py={1.5}
                    fontWeight={700}
                >
                    Notifikasi
                </Typography>

                <Divider />

                {notifications.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => setNotifAnchor(null)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Menu>

            {/* ========================= */}
            {/* PROFILE MENU */}
            {/* ========================= */}

            <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
                PaperProps={{
                    sx: {
                        width: 220,
                        borderRadius: 3,
                    },
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <PersonRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    Profil
                </MenuItem>

                <MenuItem>
                    <ListItemIcon>
                        <PasswordRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    Ubah Password
                </MenuItem>

                <Divider />

                <MenuItem
                    sx={{
                        color: "error.main",
                    }}
                >
                    <ListItemIcon>
                        <LogoutRoundedIcon
                            color="error"
                            fontSize="small"
                        />
                    </ListItemIcon>

                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}