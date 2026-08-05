import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";

import TodayIcon from "@mui/icons-material/Today";
import GroupsIcon from "@mui/icons-material/Groups";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function TodaySummary({ data }) {

    const today = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 4,
                height: "100%",
            }}
        >
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    Ringkasan Hari Ini
                </Typography>

                <List disablePadding>

                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <TodayIcon color="primary" />
                        </ListItemIcon>

                        <ListItemText
                            primary="Tanggal"
                            secondary={today}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <GroupsIcon color="success" />
                        </ListItemIcon>

                        <ListItemText
                            primary="Hadir"
                            secondary={`${data.present} Orang`}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <EventBusyIcon color="warning" />
                        </ListItemIcon>

                        <ListItemText
                            primary="Cuti & Izin"
                            secondary={`${data.leave} Orang`}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <AccessTimeIcon color="error" />
                        </ListItemIcon>

                        <ListItemText
                            primary="Terlambat"
                            secondary={`${data.late} Orang`}
                        />
                    </ListItem>

                </List>

            </CardContent>
        </Card>
    );
}