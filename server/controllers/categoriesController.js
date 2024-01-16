const db = require('../config/db');

const createTable = (req, res) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Shopping_List.categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
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

const fillTable = (req, res) => {
    const categories = [
        'ירקות ופירות',
        'מוצרי חלב',
        'דגים',
        'מאפים',
        'מוצרי ניקיון',
    ];

    const values = categories.map(category => `('${category}')`).join(',');
    const insertQuery = `INSERT INTO Shopping_List.categories (name) VALUES ${values}`;

    db.query(insertQuery, (insertErr) => {
        if (insertErr) {
            console.error('Error inserting categories:', insertErr);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Categories inserted successfully');
        }
    });

};

const getAllCategories = (req, res) => {
    db.query('SELECT * FROM Shopping_List.categories', (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    createTable,
    fillTable,
    getAllCategories
};
