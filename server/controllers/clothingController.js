const db = require('../config/db');
const Clothing = require('../models/Clothing');

exports.getAllClothing = (req, res) => {
    const query = 'SELECT * FROM clothing_items';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addClothing = (req, res) => {
    const { name, category, price, size, color, stock_quantity } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : null;
    const query = 'INSERT INTO clothing_items SET ?';
    db.query(query, { name, category, price, size, color, image_url, stock_quantity }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.updateClothing = (req, res) => {
    const { id } = req.params;
    const { stock_quantity, ...updateData } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : updateData.image_url;
    const query = 'UPDATE clothing_items SET ? WHERE id = ?';
    db.query(query, [{...updateData, image_url, stock_quantity}, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Clothing item updated successfully' });
    });
};

exports.deleteClothing = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clothing_items WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Clothing item deleted successfully' });
    });
};
