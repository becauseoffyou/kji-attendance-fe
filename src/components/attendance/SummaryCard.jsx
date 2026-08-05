import {
    Card,
    CardContent,
    Typography,
    Stack
} from "@mui/material";

export default function SummaryCard({
    title,
    value,
    color
}) {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                height: "100%"
            }}
        >

            <CardContent>

                <Stack spacing={1}>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            color
                        }}
                    >
                        {value}
                    </Typography>

                </Stack>

            </CardContent>

        </Card>

    );

}