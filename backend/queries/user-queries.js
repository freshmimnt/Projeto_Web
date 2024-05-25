const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const addUser = "INSERT INTO users (name, phone, email, password, location, address) VALUES ($1, $2, $3, $4, $5, $6) ";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateUser = "UPDATE users SET name = $1, phone = $2, email = $3, password = $4, location = $5 address = $6 WHERE id = $7";
const getAddress = "SELECT substring(address from '^[^,]+') as address_part FROM users WHERE id = $1";
const login = "SELECT * FROM users WHERE email = $1";
const image = "Insert into users (img) VALUES ($1) where id = $2";


module.exports = {
    getUsers,
    getUserById,
    addUser,
    checkEmailExists,
    deleteUser,
    updateUser,
    getAddress,
    login,
    image,
};
