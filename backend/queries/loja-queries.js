const addCart = "insert into cart(users_id, product_id, quantity) values ($1, $2, $3)";
const getCartProductsById = "select p.name as name, p.price as price, p.id as id, c.quantity as quantity from products p join cart c on c.product_id = p.id join users s on c.users_id = s.id where s.id = $1";
const sumCartProducts = `
SELECT COALESCE(SUM(item_total), 0) AS sum
FROM (
  SELECT p.price * c.quantity AS item_total
  FROM cart c
  JOIN products p ON c.product_id = p.id
) AS subquery;
`;
const search = 'SELECT * FROM users WHERE store_name ILIKE $1';

module.exports = {
    addCart,
    getCartProductsById,
    sumCartProducts,
    search,
}
