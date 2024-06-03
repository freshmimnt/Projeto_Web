const addCart = "insert into cart(users_id, product_id) values ($1, $2)";

module.exports = {
    addCart,
}