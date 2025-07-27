import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SupplierLogin = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMsg('');
        if (!email || !password) {
            setErrorMsg('Please enter both email and password.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/supplier-dashboard'); // Redirect after login
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <Stack spacing={2} mt={1}>
            <Typography variant="h6">Login as Supplier</Typography>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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
                Login
            </Button>
            <Typography variant="body2" textAlign="center">
                Don't have an account?{' '}
                <Button onClick={onSwitchToRegister} size="small">Sign up</Button>
            </Typography>
        </Stack>
    );
};

export default SupplierLogin;
