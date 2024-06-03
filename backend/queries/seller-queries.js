const getSellers = "SELECT u.id as id, img, u.store_name AS store_name, sc.name AS store_category FROM users u JOIN seller_categories sc ON u.seller_category_id = sc.id";
const getLocation = "SELECT ST_X(u.location::geometry) as lng, ST_Y(u.location::geometry) as lat, u.store_name, u.delivery_radius FROM users u where role = 'seller'";
const getProductCategoryDistribution = "SELECT pc.name AS category,COUNT(*) AS product_count FROM products p JOIN product_categories pc ON p.product_category_id = pc.id JOIN users u on p.user_seller_id = u.id WHERE u.id = $1 GROUP BY pc.name;";
const addStore = "Insert into users (iban, store_name, delivery_radius, img, users_id, seller_category_id) values($1, $2, $3, $4, $5, $6);";
const getSellerById = "SELECT u.id, u.store_name AS store_name, u.address as address, sc.name AS store_category FROM users u JOIN seller_categories sc ON u.seller_category_id = sc.id where u.id = $1"
const getReviwsById = "select r.rating, r.comment from reviews r join users u on r.user_seller_id = u.id where u.id = $1"
const getSellersByCategory ="SELECT u.id as id, img, u.store_name AS store_name, sc.name AS store_category FROM users u JOIN seller_categories sc ON u.seller_category_id = sc.id where u.seller_category_id = $1";


module.exports = {
    addStore,
    getSellers,
    getLocation,
    getProductCategoryDistribution,
    getSellerById,
    getReviwsById,
    getSellersByCategory,
};