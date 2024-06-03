const getSellerCategories = "SELECT * FROM seller_categories";
const getSellerCategoriesById = "SELECT name FROM seller_categories where id = $1";

module.exports ={
    getSellerCategories,
    getSellerCategoriesById,
};