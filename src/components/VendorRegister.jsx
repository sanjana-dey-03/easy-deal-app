// src/components/VendorRegister.jsx
import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Alert } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const VendorRegister = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg('Vendor registered successfully!');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <Stack spacing={2} mt={1}>
      <Typography variant="h6">Register as Vendor</Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <Typography variant="body2" textAlign="center">
        Already have an account?{' '}
        <Button onClick={onSwitchToLogin} size="small">Log in</Button>
      </Typography>
    </Stack>
  );
};

export default VendorRegister;

