    const express = require('express');
    const app = express();
    const cors =require('cors')
    const port = 8080;
    const db = require('./config/db');
    const bodyParser = require('body-parser');
    const categoriesRoutes = require('./routes/categories');
    const productsRoutes = require('./routes/products');
    const orderRoutes=require('./routes/order')

    app.use(cors())
    app.use(bodyParser.json());
    app.use(express.json())
    app.use('/categories', categoriesRoutes);
    app.use('/products', productsRoutes);
    app.use('/order',orderRoutes)

    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });
