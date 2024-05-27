const getSellers = "SELECT s.store_name AS store_name, sc.name AS store_category FROM sellers s JOIN seller_categories sc ON s.seller_category_id = sc.id ";
const getLocation = "SELECT ST_X(u.location::geometry) as lng, ST_Y(u.location::geometry) as lat, s.store_name FROM users u JOIN sellers s ON u.id = s.users_id;";

module.exports = {
    getSellers,
    getLocation,
};