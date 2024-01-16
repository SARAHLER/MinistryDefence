import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from "@mui/material";
import ListProducts from './ListProducts';
import axios from 'axios';
import API_BASE_URL from '../redux/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/reducers/productsSlice';

function OrderSummary() {
  const products = useSelector((state) => state.products.products);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [fieldsValidity, setFieldsValidity] = useState({ fullName: true, address: true, email: true }); 

  const dispatch = useDispatch();

  const fields = [
    { label: "שם פרטי ומשפחה", name: "fullName" },
    { label: "כתובת מגורים(מלאה)", name: "address" },
    { label: "אמייל", name: "email" },
  ];

  const handleOrderConfirmation = async () => {
    const isValid = validateFields(); 
    if (!isValid) {
      console.error('Missing required fields');
      return;
    }

    const orderData = {
      fullName,
      address,
      email,
      orderDetails: products,
    };

    try {
      await dispatch(fetchProducts());
      const response = await axios.post(`${API_BASE_URL}/order/addorder`, orderData);
      console.log(response.data);
      const orderId = response.data.orderId;

      const productsQuantities = {
        orderId,
        products: products.map(product => ({
          name: product.name,
          quantity: product.quantity,
        })),
      };

      const responseProducts = await axios.post(`${API_BASE_URL}/order/getAllProducts`, productsQuantities);
      console.log(responseProducts.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const validateFields = () => {
    const newFieldsValidity = {
      fullName: !!fullName.trim(),
      address: !!address.trim(),
      email: !!email.trim(),
    };

    setFieldsValidity(newFieldsValidity);

    return Object.values(newFieldsValidity).every(value => value);
  };

  return (
    <>
      <Typography className="header" variant="h3" sx={{ mb: '2rem' }}>סיכום ההזמנה</Typography>
      <Box sx={{ mb: '2rem' }}>
        {fields.map(field => (
          <TextField
            key={field.name}
            label={field.label}
            value={field.name === "fullName" ? fullName : field.name === "address" ? address : email}
            onChange={(e) => {
              if (field.name === "fullName") {
                setFullName(e.target.value);
              } else if (field.name === "address") {
                setAddress(e.target.value);
              } else {
                setEmail(e.target.value);
              }
            }}
            error={!fieldsValidity[field.name]} 
            helperText={!fieldsValidity[field.name] && 'שדה חובה'} 
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
              },
            }}
          />
        ))}
      </Box>
      <ListProducts />
      <Button onClick={handleOrderConfirmation}
        sx={{
          background: 'linear-gradient(45deg, #FFD700, #FF4500, #8B0000)',
          color: 'black',
          height: 48,
          padding: '0 30px',
        }}
      >
        <Typography sx={{ fontWeight: '600', color: 'black' }}>
          אשר הזמנה
        </Typography>
      </Button>
    </>
  );
}

export default OrderSummary;
