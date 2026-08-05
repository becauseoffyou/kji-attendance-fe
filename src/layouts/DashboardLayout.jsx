import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({
    children,
    title,
    subtitle
}) {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#F5F7FA",
                    minHeight: "100vh",
                }}
            >
                <Header
                    title={title}
                    subtitle={subtitle}
                />

                <Box
                    sx={{
                        p: 3,
                        maxWidth: "1600px",
                        mx: "auto",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}