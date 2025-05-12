const product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = req.file.path; // Get the Cloudinary URL
        }

        const newProduct = new product({
            name,
            description,
            price,
            category,
            imageUrl, // Save the URL
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct,
        });
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: error.message });
    }
}