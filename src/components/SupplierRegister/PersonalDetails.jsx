// src/components/SupplierRegister/PersonalDetails.js
import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PersonalDetails = ({ onNext }) => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    businessName: '',
    businessLocation: '',
    fssaiLink: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const values = Object.values(form);
    if (values.some((v) => !v.trim())) {
      alert('Please fill all fields.');
      return;
    }
    if (!otpSent || !otp) {
      alert('Please verify your phone number using OTP.');
      return;
    }

    // Verify OTP before proceeding
    confirmationResult.confirm(otp)
      .then(() => {
        onNext(form); // send data to parent
      })
      .catch((error) => {
        alert('Invalid OTP. Please try again.');
        console.error(error);
      });
  };

  const sendOTP = () => {
    if (!form.phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }

    if (!window.recaptchaVerifier || !window.recaptchaVerifier.rendered) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
      window.recaptchaVerifier.render();
    }

    signInWithPhoneNumber(auth, '+91' + form.phone, window.recaptchaVerifier)
      .then((result) => {
        setConfirmationResult(result);
        setOtpSent(true);
        alert('OTP sent to your phone!');
      })
      .catch((error) => {
        alert('Error sending OTP: ' + error.message);
      });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Supplier Registration – Step 1: Personal Details
      </Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          label="Full Name*"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          fullWidth
        />

        <Stack direction="row" spacing={1}>
          <TextField
            label="Phone Number*"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
          <Button onClick={sendOTP} variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }}>
            Send OTP
          </Button>
        </Stack>

        {otpSent && (
          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
          />
        )}

        <TextField
          label="Email*"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password*"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Business Name*"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Business Location*"
          name="businessLocation"
          value={form.businessLocation}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="FSSAI License Link (Google Drive)*"
          name="fssaiLink"
          value={form.fssaiLink}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" onClick={handleNext}>
          Next: Bank Details
        </Button>
      </Stack>

      {/* Recaptcha placeholder */}
      <div id="recaptcha-container" ref={recaptchaRef}></div>
    </Box>
  );
};

export default PersonalDetails;
