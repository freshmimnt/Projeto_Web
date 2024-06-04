const pool = require('../models/database')
const queries = require('../queries/user-queries')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

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
    const { name, phone, email, password, address } = req.body;
    
    pool.query(queries.checkEmailExists, [email], async (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length) {
            res.send('Email already exists');
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const geocoder = require('node-geocoder')({
                    provider: 'google',
                    apiKey: process.env.API_KEY,
                });
                
                geocoder.geocode(address, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if (result && result.length > 0) {
                        const longitude = result[0].longitude;
                        const latitude = result[0].latitude;
                        
                        if (longitude && latitude) {
                            const location = `SRID=4326;POINT(${longitude} ${latitude})`;
                            pool.query(queries.addUser, [name, phone, email, hashedPassword, location, address], (error, results) => {
                                if (error) {
                                    throw error;
                                }
                                res.redirect('/login');
                            });
                        } 
                    } 
                });
            } catch (error) {
                res.status(500).send('Internal server error');
            }
        }
    });
};

const addSeller = (req, res) => {
    const { name, phone, email, password, address, store_name, delivery_radius, seller_category_id } = req.body;
    const role = 'seller';  
    const img = `/uploads/seller_images/${req.file.filename}` 
    console.log(img);
    pool.query(queries.checkEmailExists, [email], async (error, results) => {
        if (error) {
            throw error;
        }
        
        if (results.rows.length) {
            res.send('Email already exists');
        } else {
            try {
                
                const hashedPassword = await bcrypt.hash(password, 10);
                
                const geocoder = require('node-geocoder')({
                    provider: 'google',
                    apiKey: process.env.API_KEY,
                });
            
                geocoder.geocode(address, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if (result && result.length > 0) {
                        const longitude = result[0].longitude;
                        const latitude = result[0].latitude;

                        if (longitude && latitude) {
                            const location = `SRID=4326;POINT(${longitude} ${latitude})`;
                            pool.query(queries.addSeller, [name, phone, email, hashedPassword, img ,location, address, role, store_name, delivery_radius, seller_category_id], (error, results)=>{
                                if (error) {
                                    throw error;
                                }
                                
                            });
                        } 
                    } 
                });
                res.redirect('/registo-vendedor2');
            } catch (error) {
                res.status(500).send("Internal Server Error" + error);
            }
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(queries.login, [email]);
        if (result.rows.length === 0) {
            res.status(401).send('Email or password does not exist');
        } else {
            const user = result.rows[0];
            const validPassword = await bcrypt.compare(password, user.password);
            console.log(`Password valid: ${validPassword}`);
            if (!validPassword) {
                res.status(401).send('Invalid email or password');
            } else {
                req.session.userId = user.id;
                req.session.userRole = user.role;
                if (user.role === 'seller') {
                    res.redirect('/produtos');  
                  } else {
                    res.redirect('/vendedores'); 
                  }
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length === 0) {
            res.status(404).send('User not found')
        } else {
            pool.query(queries.deleteUser, [id], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).send(`User deleted with ID: ${id}`)
            })
        }
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(404).send('User not found');
        } else {
            const { name, phone, email, password, img, address } = req.body;
            pool.query(queries.updateUser, [name, phone, email, password, img, address, id], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(`User modified with ID: ${id}`);
            });
        }
    });
};

const getAddress = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getAddress, [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length === 0) {
            res.status(404).send('User not found')
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const image = (req, res) => {
    const id = parseInt(req.params.id)
    const image = req.body.img;
    pool.query(queries.image, [image, id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length === 0) {
            res.status(404).send('User not found')
        } else {
            res.status(200).send(`Image added`)
        }
    })
}

const createReview = (req, res) => {
    const users_id = req.session.userId;
    const { rating, comment, user_seller_id } = req.body;
    pool.query(queries.createReview, [rating, comment, users_id, user_seller_id], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('/lojas/'+ user_seller_id)
    })
}


module.exports = {
    getUsers,
    getUserById,
    addUser,
    addSeller,
    deleteUser,
    updateUser, 
    login,
    getAddress,
    image,
    createReview,
};
