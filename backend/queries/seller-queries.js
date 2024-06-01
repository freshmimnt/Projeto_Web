const getSellers = "SELECT img, s.store_name AS store_name, sc.name AS store_category FROM sellers s JOIN seller_categories sc ON s.seller_category_id = sc.id ";
const getLocation = "SELECT ST_X(u.location::geometry) as lng, ST_Y(u.location::geometry) as lat, s.store_name, s.delivery_radius FROM users u JOIN sellers s ON u.id = s.users_id;";
/*const getStoreNameById = "SELECT s.store_name AS store_name from sellers where s.id = $1"; 
const getAddressById = "SELECT u.address AS address from where user
const getSellerCategoryById = "SELECT sc.seller_category
*/
const getProductCategoryDistribution = `
SELECT 
    pc.name AS category,
    COUNT(*) AS product_count
FROM 
    products p
JOIN 
    product_categories pc ON p.product_category_id = pc.id
JOIN
    sellers s on p.seller_id = s.id
WHERE s.id = $1
GROUP BY 
    pc.name;
`;

module.exports = {
    getSellers,
    getLocation,
    getProductCategoryDistribution,
};