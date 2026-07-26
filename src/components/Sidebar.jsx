import {
    Drawer,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import menu from "../config/menu";

const drawerWidth = 250;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: "1px solid #eee",
                },
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    KJI Attendance
                </Typography>
            </Toolbar>

            <Box sx={{ px: 1 }}>
                <List>
                    {menu.map((item) => (
                        <ListItemButton
                            key={item.title}
                            component={NavLink}
                            to={item.path}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,

                                "&.active": {
                                    bgcolor: "#0F766E",
                                    color: "#fff",

                                    "& .MuiListItemIcon-root": {
                                        color: "#fff",
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.title}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}