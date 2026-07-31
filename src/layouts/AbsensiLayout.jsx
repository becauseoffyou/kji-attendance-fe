import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "../components/attendance/BtmNavbar";

export default function AbsensiLayout() {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#F5F7FA",
            }}
        >
            {/* Area yang bisa di-scroll */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    pb: 10
                }}
            >
                <Outlet />
            </Box>

            {/* Bottom Nav tetap */}
            <BottomNavigationBar />
        </Box>
    );
}