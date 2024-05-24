const getSellers = "SELECT u.name AS seller, s.store_name AS store, sc.name AS category, p.name AS product, p.price FROM sellers s JOIN users u ON s.users_id = u.id JOIN seller_categories sc ON s.seller_category_id = sc.id JOIN products p ON p.seller_id = s.id";

module.exports = {
    getSellers,
};