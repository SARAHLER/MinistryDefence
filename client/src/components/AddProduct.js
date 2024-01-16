import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoriesSlice';
import { addProduct } from '../redux/reducers/productsSlice';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Typography, Box } from '@mui/material';

function AddProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
    const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    dispatch(fetchCategories())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
      
  }, [dispatch]);

  const handleAddProduct = () => {
    if (!productName.trim()) {
      return;
    }

    const existingProduct = categories.find((category) => category.name === productName);

    if (existingProduct) {
      dispatch(addProduct({ name: existingProduct.name, category: selectedCategory }));
    } else {
      dispatch(addProduct({ name: productName, category: selectedCategory }));
    }
    setSelectedCategory('');
    setProductName('');
  };

  return (
    <Box sx={{ display: 'flex', marginBottom: '2rem' }}>
      <Grid container spacing={3} sx={{ display: 'flex' }}>
        <Grid item xs={12} md={4}>
          <Button
            onClick={handleAddProduct}
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FF4500, #8B0000)',
              color: 'black',
              height: 48,
              padding: '0 30px',
            }}
          >
            <Typography sx={{ fontWeight: '600', color: 'black' }}>הוספת מוצר</Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>בחירה קטגוריה</InputLabel>
            <Select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  style={{ height: '3rem' }} 
>
  {categories && categories?.map(category => (
    <MenuItem key={category.id} value={category.name}>
      {category.name}
    </MenuItem>
  ))}
</Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="הכנס שם מוצר"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddProduct;
