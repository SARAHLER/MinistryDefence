const db = require('../config/db');

const createOrder = async (req, res) => {
    try {
      const { fullName, address, email } = req.body;
      const orderDetails = req.body.orderDetails;
  console.log(orderDetails);
      const insertOrderQuery = 'INSERT INTO orders (fullName, address, email, orderDetails) VALUES (?, ?, ?, ?)';
      const [insertResults] = await db.execute(insertOrderQuery, [fullName, address, email, JSON.stringify(orderDetails)]);
  
      res.json({ success: true, orderId: insertResults.insertId });
    } catch (error) {
      console.error('Error inserting order:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  


  const addOrderProducts = (req, res) => {
    console.log(req.body);
    const orderId = req.body.orderId;
    const productsQuantities = req.body.productsQuantities || {};
    const values = [];
    for (const [productName, quantity] of Object.entries(productsQuantities)) {
      values.push([orderId, productName, quantity]);
    }
    const valuesString = values.map(val => `(${val.join(', ')})`).join(', ');
    const insertProductsQuery = `INSERT INTO order_products (orderId, productName, quantity) VALUES ${valuesString}`;
  
    db.query(insertProductsQuery, (insertErr) => {
      if (insertErr) {
        console.error('Error inserting order products:', insertErr);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ success: true });
      }
    });
};

  

module.exports = {
  createOrder,
  addOrderProducts
};
