import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const menu = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard",
    },
    {
        title: "Absensi",
        icon: <LocationOnIcon />,
        path: "/admin/attendance",
    },
    {
        title: "Karyawan",
        icon: <GroupsIcon />,
        path: "/employee",
    },
    {
        title: "Laporan",
        icon: <BarChartIcon />,
        path: "/report",
    },
    {
        title: "Pengaturan",
        icon: <SettingsIcon />,
        path: "/settings",
    },
];

export default menu;