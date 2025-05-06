import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import MetricsPanel from "./MetricsPanel";
import CategoryMetrics from "./CategoryMetrics";

const Dashboard = () => {
  return (
    <Box sx={{ mt: 4, px: { xs: 1, sm: 3, md: 6 } }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" color="green" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <MetricsPanel />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <CategoryMetrics />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
