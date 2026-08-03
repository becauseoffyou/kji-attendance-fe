import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useLocation, useNavigate } from "react-router-dom";

const menus = [
  {
    label: "Absen",
    value: "/employee/attendance",
    icon: <AccessTimeRoundedIcon />,
  },
  {
    label: "History",
    value: "/employee/history",
    icon: <HistoryRoundedIcon />,
  },
  {
    label: "Request",
    icon: <DescriptionRoundedIcon />,
    path: "/leave"
  },
  {
    label: "Profil",
    value: "/employee/profile",
    icon: <PersonRoundedIcon />,
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 12,
        left: 12,
        right: 12,
        borderRadius: "18px",
        overflow: "hidden",
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(e, newValue) => navigate(newValue)}
        showLabels
        sx={{
          height: 68,
          bgcolor: "#ffffff",

          "& .MuiBottomNavigationAction-root": {
            color: "#9CA3AF",
            transition: ".25s",
            minWidth: 0,
          },

          "& .MuiBottomNavigationAction-label": {
            fontSize: 12,
            fontWeight: 600,
          },

          "& .Mui-selected": {
            color: "#16A34A",
          },

          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },
        }}
      >
        {menus.map((item) => (
          <BottomNavigationAction
            key={item.value}
            value={item.value}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}