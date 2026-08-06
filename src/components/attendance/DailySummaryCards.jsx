import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";

export default function DailySummaryCards({

    data = {
        present: 0,
        late: 0,
        checkout: 0,
        absent: 0
    }

}) {

    return (

        <Grid
            container
            spacing={2}
            sx={{
                mt: 2,
                mb: 2
            }}
        >

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                <SummaryCard
                    title="Hadir"
                    value={data.present}
                    color="#16A34A"
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                <SummaryCard
                    title="Terlambat"
                    value={data.late}
                    color="#F59E0B"
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                <SummaryCard
                    title="Belum Pulang"
                    value={data.checkout}
                    color="#2563EB"
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                <SummaryCard
                    title="Tidak Hadir"
                    value={data.absent}
                    color="#DC2626"
                />

            </Grid>

        </Grid>

    );

}