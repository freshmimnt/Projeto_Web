
const pool = require('../models/database');
const productQueries = require('../queries/product-queries');
const sellerQueries = require('../queries/seller-queries');
const lojaQueries = require('../queries/loja-queries');

const getLojaById = async (req, res) => {
    const userId = parseInt(req.params.id);
    try{
        const [productResult, reviewsResult,sellerResult] = await Promise.all([
            pool.query(productQueries.getProductsById, [userId]),
            pool.query(sellerQueries.getReviwsById, [userId]),
            pool.query(sellerQueries.getSellerById, [userId])
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

const addCart = (req, res) => {
    const userId = parseInt(req.session.userId);
    console.log(userId)
    const product_id = parseInt(req.body.product_id);
    console.log(product_id)
    const user_seller_id = parseInt(req.body.user_seller_id);
    console.log(user_seller_id)
    const quantity = parseInt(req.body.quantity); 
    pool.query(lojaQueries.addCart, [userId, product_id, quantity], (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect('/lojas/'+ user_seller_id)
    });
};

module.exports = {
    getLojaById,
    addCart,
};


