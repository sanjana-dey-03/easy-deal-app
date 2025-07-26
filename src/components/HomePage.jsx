import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import VendorLogin from './VendorLogin';
import VendorRegister from './VendorRegister';
import SupplierLogin from './SupplierLogin';
import SupplierRegister from './SupplierRegister';
import Lottie from 'lottie-react';
import shoppingCartAnimation from '../assets/shopping-cart.json';

const HomePage = () => {
  const [vendorOpen, setVendorOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [showVendorRegister, setShowVendorRegister] = useState(false);
  const [showSupplierRegister, setShowSupplierRegister] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={6}>
        {/* Logo Animation */}
        <Box width={180} mx="auto" mb={2}>
          <Lottie animationData={shoppingCartAnimation} loop={true} />
        </Box>

        {/* Title and Subtitle */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Easy Deal
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Vendors and Suppliers can collaborate easily with group orders and shared payments.
        </Typography>

        {/* Login Buttons */}
        <Stack spacing={2} direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setVendorOpen(true);
              setShowVendorRegister(false);
            }}
          >
            Login as Vendor
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              setSupplierOpen(true);
              setShowSupplierRegister(false);
            }}
          >
            Login as Supplier
          </Button>
        </Stack>
      </Box>

      {/* Vendor Modal */}
      <Dialog open={vendorOpen} onClose={() => setVendorOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {showVendorRegister ? 'Vendor Registration' : 'Vendor Login'}
        </DialogTitle>
        <DialogContent>
          {showVendorRegister ? (
            <VendorRegister onSwitchToLogin={() => setShowVendorRegister(false)} />
          ) : (
            <VendorLogin onSwitchToRegister={() => setShowVendorRegister(true)} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVendorOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Supplier Modal */}
      <Dialog open={supplierOpen} onClose={() => setSupplierOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {showSupplierRegister ? 'Supplier Registration' : 'Supplier Login'}
        </DialogTitle>
        <DialogContent>
          {showSupplierRegister ? (
            <SupplierRegister onSwitchToLogin={() => setShowSupplierRegister(false)} />
          ) : (
            <SupplierLogin onSwitchToRegister={() => setShowSupplierRegister(true)} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSupplierOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
