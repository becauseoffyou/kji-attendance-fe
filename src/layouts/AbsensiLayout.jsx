import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "../components/attendance/BtmNavbar";

export default function AbsensiLayout() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F5F7FA",
                pb: 10,
            }}
        >
            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>

            <BottomNavigationBar />
        </Box>
    );
}