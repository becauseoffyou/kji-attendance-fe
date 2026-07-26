import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({
    title,
    value,
    icon,
    color = "#1976d2"
}) {
    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >
            <CardContent>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            mt={1}
                        >
                            {value}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 55,
                            height: 55,
                            borderRadius: "50%",
                            bgcolor: color,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}