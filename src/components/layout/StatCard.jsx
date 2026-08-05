import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar
} from "@mui/material";

export default function StatCard({
    title,
    value,
    icon,
    subtitle,

    color = "#1976d2"
}) {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                transition: ".25s",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                }
            }}
        >

            <CardContent sx={{ p: 3 }}>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 44,
                                fontWeight: 700,
                                lineHeight: 1.2
                            }}
                        >
                            {value}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {subtitle}
                        </Typography>

                    </Box>

                    <Avatar
                        sx={{
                            width: 54,
                            height: 54,
                            bgcolor: `${color}20`,
                            color: color
                        }}
                    >
                        {icon}
                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    );

}