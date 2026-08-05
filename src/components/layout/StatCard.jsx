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
    color = "#1976d2"
}) {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                height: "100%",
                border: "1px solid #E5E7EB",
                transition: ".25s",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)"
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
                            fontWeight={500}
                        >
                            {title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 36,
                                fontWeight: 700,
                                mt: 1,
                                lineHeight: 1
                            }}
                        >
                            {value}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: "block",
                                mt: 1
                            }}
                        >
                            Tahun {new Date().getFullYear()}
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