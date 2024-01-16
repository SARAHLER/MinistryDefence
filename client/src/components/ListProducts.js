import React from 'react';
import { Typography, Divider, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

function ListProducts() {
  const products = useSelector((state) => state.products.products);
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.quantity;
    return acc;
  }, {});

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography sx={{ fontSize: '1rem', fontWeight: '400', marginBottom: '1rem' }}>
        יש לאסוף את המוצרים למחלקות המתאימות
      </Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.keys(categoryCounts).map((category) => (
          <div key={category} style={{ margin: '1rem' }}>
            <Box sx={{display:'flex'}}>
            <Typography sx={{ fontWeight: '600' }}>{category}</Typography>
            <Typography sx={{ fontWeight: '400' }}>
              סה"כ: {categoryCounts[category]} 
            </Typography>
            </Box>
           
            <ul style={{ paddingInlineStart: '1.5rem' }}>
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <li key={product.name}>
                    {product.name} ({product.quantity})
                  </li>
                ))}
            </ul>
                  
            <Divider style={{ marginTop: '1rem' }} />
          </div>
        ))}
      </div>
    </div>
   
    </>

  );
}

export default ListProducts;
