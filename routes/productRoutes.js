const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Import Cloudinary storage
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const productController = require('../controller/productController'); // Corrected import

const config = require('../config.json'); // Import config

// Cloudinary configuration
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

// Use Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder in your Cloudinary account
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed formats
    },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), productController.createProduct);
router.get('/getAll', productController.getAllProducts);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;