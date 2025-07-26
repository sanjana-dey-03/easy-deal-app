import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Stack,
  Paper
} from '@mui/material';

const GroupOrderApp = () => {
  const [groupId, setGroupId] = useState(null);
  const [vendorName, setVendorName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    if (!groupId) {
      const newGroupId = uuidv4();
      setGroupId(newGroupId);
    }
  }, []);

  const handleAddItem = () => {
    if (!vendorName || !itemName || !itemPrice) return;
    const newItem = {
      id: uuidv4(),
      vendorName,
      itemName,
      itemPrice: parseFloat(itemPrice),
    };
    setGroupItems((prev) => [...prev, newItem]);
    setItemName('');
    setItemPrice('');
  };

  const calculateTotal = () => {
    return groupItems.reduce((acc, curr) => acc + curr.itemPrice, 0).toFixed(2);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" my={3}>Easy Deal - Group Order</Typography>
      <Box component={Paper} p={3} mb={2}>
        <Typography variant="subtitle1">Vendor Name:</Typography>
        <TextField
          fullWidth
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          placeholder="Enter your name"
        />
        <Typography variant="subtitle1" mt={2}>Add Item:</Typography>
        <TextField
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          sx={{ mt: 1 }}
        />
        <TextField
          fullWidth
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Item price"
          type="number"
          sx={{ mt: 1 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddItem}
          sx={{ mt: 2 }}
        >
          Add to Group Order
        </Button>
      </Box>

      <Box component={Paper} p={3}>
        <Typography variant="h6">Group Order Summary</Typography>
        <Stack spacing={1} mt={2}>
          {groupItems.map((item) => (
            <Box key={item.id} display="flex" justifyContent="space-between">
              <Typography>{item.vendorName} - {item.itemName}</Typography>
              <Typography>₹{item.itemPrice.toFixed(2)}</Typography>
            </Box>
          ))}
        </Stack>
        <Typography variant="h6" mt={3}>Total: ₹{calculateTotal()}</Typography>
        <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => alert('Integrate payment here')}>
          Proceed to Payment
        </Button>
      </Box>
    </Container>
  );
};

export default GroupOrderApp;
