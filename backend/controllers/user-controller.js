const pool = require('../models/database')
const queries = require('../queries/user-queries')
/*const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: 'cd2f2f0ffddfb6452d8607ee7a66912b-32a0fef1-ab0bd9c6' });*/



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
                /*sendWelcomeEmail(email);*/
                res.status(201).send(`User added`);
            });
        }
    });
};

/*const sendWelcomeEmail = (toEmail) => {
    mg.messages.create('sandbox-123.mailgun.org', {
        from: "josephjoestarpurple0@gmail.com",
        to: [toEmail],
        subject: "Welcome to Our Platform",
        text: "Thank you for joining our platform!",
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
};*/

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
