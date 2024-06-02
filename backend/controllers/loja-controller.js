
const pool = require('../models/database');
const productQueries = require('../queries/product-queries');
const sellerQueries = require('../queries/seller-queries');

const getLojaById = async (req, res) => {
    const seller_id = parseInt(req.params.id);
    try{
        const [productResult, reviewsResult,sellerResult] = await Promise.all([
            pool.query(productQueries.getProductsById, [seller_id]),
            pool.query(sellerQueries.getReviwsById, [seller_id]),
            pool.query(sellerQueries.getSellerById, [seller_id])
        ]);
        const data = {
            seller: sellerResult.rows[0],
            products: productResult.rows,
            reviews: reviewsResult.rows
        };
        res.render('loja', data);
    }catch (error) {
        console.error('Error fetching data for loja page:', error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getLojaById,
};


