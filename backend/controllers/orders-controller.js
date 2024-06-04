const pool = require('../models/database')
const queries = require('../queries/order-queries')
const moment = require('moment-timezone');

const getOrders = (req, res) => {
    pool.query(queries.getOrders, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const addOrder = (req, res) => {
    const users_id = req.session.userId;
    const delivery_time = moment().tz('Europe/Lisbon').format('HH:mm:ss'); 
    const delivery_date = moment().tz('Europe/Lisbon').format('YYYY-MM-DD');
    const {note, delivery_type, quantity, product_id } = req.body
    pool.query(queries.addOrder, [delivery_time, delivery_date, note, delivery_type, quantity, users_id, product_id], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('/vendedores');
    })
}

module.exports = {
    getOrders,
    addOrder,
}