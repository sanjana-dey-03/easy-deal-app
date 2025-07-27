import React from 'react';
import { Box, Typography, Button, Stack, Container } from '@mui/material';
import VendorWalletInfo from '../components/VendorWalletInfo'; // adjust path if needed
import TopNavbar from '../components/TopNavbar'; // import TopNavbar
import AvailableProducts from '../components/AvailableProducts';

const VendorDashboard = () => {
  return (
    <Box>
      <TopNavbar /> {/* Wallet Balance on top */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Vendor Dashboard</Typography>

        <Stack spacing={2} mb={4}>
          
          <Button variant="outlined">View My Orders</Button>
          
          <Button variant="outlined">Track Payments</Button>
        </Stack>

        {/* Wallet Information Section */}
        <VendorWalletInfo />
       
<AvailableProducts />
      </Container>
    </Box>
  );
};

export default VendorDashboard;

