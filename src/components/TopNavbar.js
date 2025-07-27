// src/components/TopNavbar.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, 'vendors', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWalletBalance(data.walletBalance || 0);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/'); // or to vendor login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Easy Deal Vendor</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1">
            Wallet: ₹{walletBalance}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
