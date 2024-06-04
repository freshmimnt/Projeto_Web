const getOrdersById = "SELECT o.id AS order_number, array_agg(p.name) AS products, o.note, u.phone AS customer_phone, u.name AS customer_name, o.delivery_date, o.delivery_time, o.delivery_type, o.state FROM orders o JOIN users u ON o.users_id = u.id JOIN products p ON p.id = ANY(o.product_id) WHERE p.user_seller_id = $1 AND o.state = 'não entregue' GROUP BY o.id, o.note, u.phone, u.name, o.delivery_date, o.delivery_time, o.delivery_type, o.state;"
const addOrder = "INSERT INTO orders (delivery_time, delivery_date, note, delivery_type, quantity, users_id, product_id) values( $1, $2, $3, $4, $5, $6, $7);";

module.exports = {
    getOrdersById,
    addOrder,
}