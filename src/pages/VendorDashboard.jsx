import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const VendorDashboard = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Vendor Dashboard</Typography>
      <Stack spacing={2}>
        <Button variant="contained" color="primary">Start New Group Order</Button>
        <Button variant="outlined">View My Orders</Button>
        <Button variant="outlined">Invite Suppliers</Button>
        <Button variant="outlined">Track Payments</Button>
      </Stack>
    </Box>
  );
};

export default VendorDashboard;

