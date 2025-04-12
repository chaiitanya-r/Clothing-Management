const express = require('express');
const router = express.Router();
const clothingController = require('../controllers/clothingController');

// Define your routes here
router.get('/clothing', clothingController.getAllClothing);
router.post('/clothing', clothingController.addClothing);
router.put('/clothing/:id', clothingController.updateClothing);
router.delete('/clothing/:id', clothingController.deleteClothing);

module.exports = router;
