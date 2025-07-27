import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function PersonalDetails({ onNext, initialData = {} }) {
  const [form, setForm] = useState({
      fullName: initialData.fullName || '',
      phone: initialData.phone || '',
      email: initialData.email || '',
      password: initialData.password || '',
      businessName: initialData.businessName || '',
      businessLocation: initialData.businessLocation || '',
      fssaiLink: initialData.fssaiLink || ''
  });
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
      const {
          fullName,
          phone,
          email,
          password,
          businessName,
          businessLocation,
          fssaiLink
      } = form;

      if (![
          fullName,
          phone,
          email,
          password,
          businessName,
          businessLocation,
          fssaiLink
      ].every(v => v.trim())) {
          return alert('Please fill all required fields');
    }

      setLoading(true);
      onNext(form);
      setLoading(false);
  };

  return (
      <Stack spacing={2}>
          <TextField
              label="Full Name*"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
          />
          <TextField
              label="Phone*"
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
              label="FSSAI License Link*"
              name="fssaiLink"
              value={form.fssaiLink}
              onChange={handleChange}
              fullWidth
          />
          <Button variant="contained" onClick={handleNext} disabled={loading}>
              {loading ? 'Processing...' : 'Next'}
          </Button>
      </Stack>
  );
}
PersonalDetails.propTypes = {
    onNext: PropTypes.func.isRequired,
    initialData: PropTypes.object
};