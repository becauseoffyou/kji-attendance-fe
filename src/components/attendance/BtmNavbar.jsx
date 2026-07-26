import {
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useLocation, useNavigate } from "react-router-dom";

export default function BtmVavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    return (

        <Paper
            elevation={8}
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >

            <BottomNavigation
                value={location.pathname}
                onChange={(e, value) => navigate(value)}
            >

                <BottomNavigationAction
                    label="Home"
                    value="/employee"
                    icon={<HomeRoundedIcon />}
                />

                <BottomNavigationAction
                    label="Absen"
                    value="/employee/attendance"
                    icon={<FingerprintRoundedIcon />}
                />

                <BottomNavigationAction
                    label="Riwayat"
                    value="/employee/history"
                    icon={<HistoryRoundedIcon />}
                />

                <BottomNavigationAction
                    label="Profil"
                    value="/employee/profile"
                    icon={<PersonRoundedIcon />}
                />

            </BottomNavigation>

        </Paper>

    );

}