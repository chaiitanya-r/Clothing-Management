const express = require('express');
const router = express.Router();
const clothingController = require('../controllers/clothingController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Define routes
router.get('/clothing', clothingController.getAllClothing);
router.post('/clothing', upload.single('image'), clothingController.addClothing);
router.put('/clothing/:id', upload.single('image'), clothingController.updateClothing);
router.delete('/clothing/:id', clothingController.deleteClothing);

module.exports = router;
