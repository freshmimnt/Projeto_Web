const pool = require('../models/database')
const queries = require('../queries/order-queries')

const getOrders = (req, res) => {
    pool.query(queries.getOrders, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getOrders,
}