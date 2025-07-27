import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function BankDetails({ onBack, onSubmit, initialData = {} }) {
    const [form, setForm] = useState({
        accountHolder: initialData.accountHolder || '',
        bankName: initialData.bankName || '',
        accountNumber: initialData.accountNumber || '',
        ifsc: initialData.ifsc || '',
        upi: initialData.upi || ''
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFinish = () => {
        const { accountHolder, bankName, accountNumber, ifsc } = form;
        if (![accountHolder, bankName, accountNumber, ifsc].every(v => v.trim())) {
            return alert('Please fill all required fields');
        }
        onSubmit(form);
    };

    const isValid = [form.accountHolder, form.bankName, form.accountNumber, form.ifsc]
        .every(v => v.trim());

    return (
        <Stack spacing={2}>
            <TextField label="Account Holder Name*" name="accountHolder" value={form.accountHolder} onChange={handleChange} fullWidth />
            <TextField label="Bank Name*" name="bankName" value={form.bankName} onChange={handleChange} fullWidth />
            <TextField label="Account Number*" name="accountNumber" value={form.accountNumber} onChange={handleChange} fullWidth />
            <TextField label="IFSC Code*" name="ifsc" value={form.ifsc} onChange={handleChange} fullWidth />
            <TextField label="UPI ID (optional)" name="upi" value={form.upi} onChange={handleChange} fullWidth />
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={onBack}>Back</Button>
                <Button variant="contained" onClick={handleFinish} disabled={!isValid}>Submit</Button>
            </Stack>
        </Stack>
    );
}
BankDetails.propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object
};
