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
    const quantities = req.body.quantity.map(q => parseInt(q)); 
    const product_ids = req.body.product_id.map(id => parseInt(id)); 
    const {note, delivery_type} = req.body;

    pool.query(queries.addOrder, [delivery_time, delivery_date, note, delivery_type, quantities, users_id, product_ids], (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect('/vendedores');
    });
};

const orderCompleted = (req, res) => {
    const order_id = req.body.order_id;
    const state = "entregue";
    console.log(`Completing order: ${order_id} with state: ${state}`);
    pool.query(queries.orderCompleted, [state, order_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect('/gerenciamento');
    });
};

module.exports = {
    getOrders,
    addOrder,
    orderCompleted,
}