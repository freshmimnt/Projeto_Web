const pool = require('../models/database')
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
    const { name, phone, email, password, img, address } = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length) {
            res.send('Email already exists');
        } else {
            pool.query(queries.addUser, [name, phone, email, password, img, address], (error, results) => {
                if (error) {
                    throw error;
                }
                
                res.status(201).send(`User added`);
            });
        }
    });
};



const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.deleteUser, [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User deleted`);
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
}
