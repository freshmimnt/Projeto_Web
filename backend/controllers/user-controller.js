const pool = require('../models/user-model')
const queries = require('../queries/user-queries')

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const addUser = (req, res) => {
    const { name, phone, email, password, img, location_id } = req.body
    pool.query(queries.addUser, [name, phone, email, password, img, location_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
}