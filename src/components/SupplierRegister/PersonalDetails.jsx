import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const values = Object.values(form);
    if (values.some((v) => !v.trim())) {
      alert('Please fill all fields.');
      return;
    }
    onNext(form); // send data to parent
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
        <TextField
          label="Phone Number*"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
        />
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
    </Box>
  );
};

export default PersonalDetails;

