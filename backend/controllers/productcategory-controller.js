const pool = require('../models/database');
const queries = require('../queries/productcategory-queries');

const getProductCategories = (req, res) => {
    pool.query(queries.getProductsCategory, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getProductCategories,
};