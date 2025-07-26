import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const SupplierDashboard = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Supplier Dashboard</Typography>
      <Stack spacing={2}>
        <Button variant="contained" color="primary">View Orders I Joined</Button>
        <Button variant="outlined">Submit Product Details</Button>
        <Button variant="outlined">Track Order Status</Button>
        <Button variant="outlined">View Payment Info</Button>
      </Stack>
    </Box>
  );
};

export default SupplierDashboard;
