// src/components/VendorWalletInfo.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const VendorWalletInfo = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWalletIcon sx={{ mr: 1 }} />
          App Wallet (Vendors)
        </Typography>
        <List sx={{ pl: 1 }}>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText
              primary="To participate in Deal Hour, vendors must maintain sufficient wallet balance for selected products."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText
              primary="Vendors can withdraw wallet balance to UPI or bank account (Minimum: ₹1000)."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText
              primary="Minimum wallet deposit amount is ₹1000."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText
              primary="Wallet feature is available for vendors only."
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default VendorWalletInfo;
