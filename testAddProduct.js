const db = require('./server/config/db');
const testProduct = {
    name: "Test Product",
    category: "Test",
    price: 19.99,
    size: "M",
    color: "Red",
    image_url: "/images/test.jpg",
    stock_quantity: 10
};

db.query('INSERT INTO clothing_items SET ?', testProduct, (err, result) => {
    if (err) {
        console.error('Error adding test product:', err);
        return;
    }
    console.log('Test product added successfully with ID:', result.insertId);
});
