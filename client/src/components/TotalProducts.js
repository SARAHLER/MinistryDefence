import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function TotalProducts() {
  const products = useSelector((state) => state.products.products);
  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

  return (
    <div style={{ marginBottom: '3rem' }}>
      <Typography variant="body1" style={{ color: 'black' }}>
        סה"כ: {totalQuantity} מוצרים
      </Typography>

     
    </div>
  );
}

export default TotalProducts;
