const pool = require('../models/database')
const queries = require('../queries/sellercategory-queries')

const getSellerCategories = (req, res) => {
    pool.query(queries.getSellerCategories, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getSellerCategories,
}
