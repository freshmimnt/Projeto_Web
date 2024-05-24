const pool = require('../models/database');
const queries = require('../queries/product-queries');


const addProduct = (req, res) => {
    const { name, price, product_stock, product_category_id, seller_id } = req.body;
    pool.query(queries.addProduct, [name, price, product_stock, product_category_id, seller_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect('/produtos'); 
    });
};

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteProduct, [id], (error) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product deleted with ID: ${id}`);
    });
};

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, product_stock } = req.body;
    pool.query(queries.updateProduct, [name, price, product_stock, id], (error) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product modified with ID: ${id}`);
    });
};

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
};
