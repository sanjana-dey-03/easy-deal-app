import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Stack, TextField
} from '@mui/material';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const MIN_AMOUNT = 1000;

const VendorWalletInfo = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (uid) fetchBalance();
  }, [uid]);

  const fetchBalance = async () => {
    const docRef = doc(db, 'vendors', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setBalance(data.walletBalance || 0);
    } else {
      // First time setup
      await setDoc(docRef, { walletBalance: 0 });
      setBalance(0);
    }
  };

  const updateBalance = async (type) => {
    const amt = parseInt(amount);
    if (isNaN(amt) || amt < MIN_AMOUNT) {
      alert(`Minimum ${type === 'deposit' ? 'deposit' : 'withdrawal'} amount is ₹${MIN_AMOUNT}`);
      return;
    }

    if (type === 'withdraw' && amt > balance) {
      alert('Insufficient balance.');
      return;
    }

    setLoading(true);
    const docRef = doc(db, 'vendors', uid);
    const newBalance = type === 'deposit' ? balance + amt : balance - amt;

    try {
      await updateDoc(docRef, { walletBalance: newBalance });
      setBalance(newBalance);
      setAmount('');
      alert(`${type === 'deposit' ? 'Deposited' : 'Withdrawn'} ₹${amt} successfully!`);
    } catch (error) {
      console.error('Error updating balance:', error);
      alert('Transaction failed. Try again.');
    }

    setLoading(false);
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">Vendor Wallet</Typography>
        <Typography mt={1}>Current Balance: ₹{balance}</Typography>
        <Typography mt={2} color="text.secondary">
          * Minimum deposit/withdrawal amount: ₹1000
        </Typography>
        <TextField
          label="Enter amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" onClick={() => updateBalance('deposit')} disabled={loading}>
            Deposit
          </Button>
          <Button variant="outlined" onClick={() => updateBalance('withdraw')} disabled={loading}>
            Withdraw
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VendorWalletInfo;
