const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./server/config/db');
const Clothing = require('./server/models/Clothing');
const clothingRoutes = require('./server/routes/clothingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize database
Clothing.createTable()
  .then(() => console.log('Clothing table created or exists'))
  .catch(err => console.error('Error creating table:', err));

// Routes
app.use('/api', clothingRoutes);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
