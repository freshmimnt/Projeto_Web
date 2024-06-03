const getProductsById = "select p.img, p.name, p.price from products p where user_seller_id = $1";
const addProduct = "INSERT INTO products (name, price, product_stock, img, product_category_id, user_seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const deleteProduct = "DELETE FROM products WHERE id = $1";
const updateProduct = "UPDATE products SET name = $1, price = $2, product_stock = $3 WHERE id = $4";
const average = "SELECT AVG(price) FROM products WHERE user_seller_id = $1"; 
const expensive = "SELECT MAX(price) FROM products WHERE user_seller_id = $1";
const cheapest = "SELECT MIN(price) FROM products WHERE user_seller_id = $1";

module.exports = {
    getProductsById,
    addProduct,
    deleteProduct,
    updateProduct,
    average,
    expensive,
    cheapest,
};