import { Box } from "@mui/material";
import BottomNavigationBar from "../components/attendance/BtmNavbar";

export default function AbsensiLayout({ children }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F5F7FA",
                pb: 10,
            }}
        >
            <Box sx={{ p: 2 }}>
                {children}
            </Box>

            <BottomNavigationBar />
        </Box>
    );
}