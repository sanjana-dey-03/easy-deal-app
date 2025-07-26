import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';

const BankDetails = ({ onBack, onSubmit }) => {
  const [form, setForm] = useState({
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upi: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { accountHolder, bankName, accountNumber, ifsc } = form;
    if (!accountHolder || !bankName || !accountNumber || !ifsc) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(form); // pass bank data to parent
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Step 2: Bank Details</Typography>
      <Stack spacing={2} mt={2}>
        <TextField label="Account Holder Name" name="accountHolder" value={form.accountHolder} onChange={handleChange} fullWidth />
        <TextField label="Bank Name" name="bankName" value={form.bankName} onChange={handleChange} fullWidth />
        <TextField label="Account Number" name="accountNumber" value={form.accountNumber} onChange={handleChange} fullWidth />
        <TextField label="IFSC Code" name="ifsc" value={form.ifsc} onChange={handleChange} fullWidth />
        <TextField label="UPI ID (optional)" name="upi" value={form.upi} onChange={handleChange} fullWidth />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onBack}>Back</Button>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BankDetails;
