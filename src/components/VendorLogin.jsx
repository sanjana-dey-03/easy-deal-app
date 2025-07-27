import React, { useState } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // make sure this path is correct
import { useNavigate } from 'react-router-dom';

const VendorLogin = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/vendor-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <Stack spacing={2} mt={1}>
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
      <Button variant="contained" onClick={handleLogin}>
        Login as Vendor
      </Button>
      <Typography variant="body2" textAlign="center">
        Don't have an account?{' '}
        <Button onClick={onSwitchToRegister} size="small">Sign up</Button>
      </Typography>
    </Stack>
  );
};

export default VendorLogin;


