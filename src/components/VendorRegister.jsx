import React, { useState } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';

const VendorRegister = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
      navigate('/vendor-login'); // Navigate to login page after registration
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
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
      <Button variant="contained" onClick={handleRegister}>
        Register as Vendor
      </Button>
      <Typography variant="body2" textAlign="center">
        Already have an account?{' '}
        <Button onClick={onSwitchToLogin} size="small">Log in</Button>
      </Typography>
    </Stack>
  );
};

export default VendorRegister;
