import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid
} from '@mui/material';

const AvailableProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Products Available to Buy
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">
                  ₹{product.price} per {product.unit}
                </Typography>
                <Typography color="text.secondary">
                  Minimum Qty: {product.minQty} {product.unit}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvailableProducts;
