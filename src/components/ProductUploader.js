import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const ProductUploader = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    unit: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, price, unit, description } = product;
    if (!name || !price || !unit || !description) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        price: Number(product.price),
        createdAt: new Date().toISOString()
      });
      alert('Product added successfully!');
      setProduct({
        name: '',
        price: '',
        unit: '',
        description: '',
        imageUrl: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Error adding product');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Add New Product</Typography>
      <Stack spacing={2}>
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Price (in ₹)"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Unit (e.g. 1kg, 25kg bag)"
          name="unit"
          value={product.unit}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Image URL (optional)"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSubmit}>
          Upload Product
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductUploader;
