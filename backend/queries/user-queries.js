const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const addUser = "INSERT INTO users (name, phone, email, password, img, address) VALUES ($1, $2, $3, $4, $5, $6) ";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const deleteUser = "DELETE FROM users WHERE id = $1";

module.exports = {
    getUsers,
    getUserById,
    addUser,
    checkEmailExists,
    deleteUser,
};