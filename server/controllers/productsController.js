const db = require('../config/db');

const createTable = (req, res) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Shopping_List.products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 0  
      );
    `;
  
    db.query(createTableQuery, (createTableErr) => {
      if (createTableErr) {
        console.error('Error creating table:', createTableErr);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Table created successfully');
      }
    });
  };
  
  const addProduct = (req, res) => {
    const { productName, categoryId, quantity } = req.body;
  
    const checkProductQuery = 'SELECT * FROM Shopping_List.products WHERE name = ?';
    db.query(checkProductQuery, [productName], (checkProductErr, checkProductResults) => {
      if (checkProductErr) {
        console.error('Error checking product:', checkProductErr);
        res.status(500).send('Internal Server Error');
      } else {
        if (checkProductResults.length > 0) {
          const existingProduct = checkProductResults[0];
          const updateQuantityQuery = 'UPDATE Shopping_List.products SET quantity = ? WHERE id = ?';
          db.query(updateQuantityQuery, [existingProduct.quantity + quantity, existingProduct.id], (updateQuantityErr) => {
            if (updateQuantityErr) {
              console.error('Error updating quantity:', updateQuantityErr);
              res.status(500).send('Internal Server Error');
            } else {
              res.json({ success: true, productId: existingProduct.id });
            }
          });
        } else {
          const insertProductQuery = 'INSERT INTO Shopping_List.products (name, category_id, quantity) VALUES (?, ?, ?)';
          db.query(insertProductQuery, [productName, categoryId, quantity], (insertProductErr, insertProductResults) => {
            if (insertProductErr) {
              console.error('Error adding product:', insertProductErr);
              res.status(500).send('Internal Server Error');
            } else {
              res.json({ success: true, productId: insertProductResults.insertId });
            }
          });
        }
      }
    });
  };
  
  
  const getAllProducts = (req, res) => {
    const getAllProductsQuery = 'SELECT * FROM Shopping_List.products';
  
    db.query(getAllProductsQuery, (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  };
  
  module.exports = {
    addProduct,
    createTable,
    getAllProducts
  };
  