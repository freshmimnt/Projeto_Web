const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const methodOverride = require('method-override');
const lojaRoutes = require('./backend/routes/loja-routes');
const userRoutes = require('./backend/routes/user-routes')
const sellerRoutes = require('./backend/routes/seller-routes')
const sellerCategoriesRoutes = require('./backend/routes/sellercategory-routes')
const productRoutes = require('./backend/routes/product-routes')
const productCategoriesRoutes = require('./backend/routes/productcategory-routes')
const orderRoutes = require('./backend/routes/order-routes')
const productQueries = require('./backend/queries/product-queries');
const sellerQueries = require('./backend/queries/seller-queries');
const userQueries = require('./backend/queries/user-queries');
const sellerCategoriesQueries = require('./backend/queries/sellercategory-queries');
const productCategoryQueries = require('./backend/queries/productcategory-queries');
const lojaQueries = require('./backend/queries/loja-queries');
const orderQueries = require('./backend/queries/order-queries');
const pool = require('./backend/models/database');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
dotenv.config()

const app = express();
const PORT = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './backend/views');
app.use(methodOverride('_method'));
app.use(session({
    store: new pgSession({
      pool: pool, 
      tableName: 'session' 
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
}));

app.get('/', (req, res) => {
    res.render('landing-page');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/logout', (req, res) => {
  req.session.destroy(); 
  res.redirect('/'); 
});
app.get('/registo-comprador', (req, res) => {
  res.render('registo-comprador');
});
app.get('/registo-vendedor', (req, res) => {
  pool.query(sellerCategoriesQueries.getSellerCategories, (error, results) => {
    if (error) {
      throw error;
    }
    res.render('registo-vendedor', { sellerCategories: results.rows });
  });
});
app.get('/registo-vendedor2', (req, res) => {
  res.render('registo-vendedor2');
});
app.get('/registo-vendedor-em-espera', (req, res) => {
  res.render('registro-em-espera');
});
app.get('/categorias/:id', async (req, res) => {
  const seller_category_id = parseInt(req.params.id);
  try {
      const sellersResult = await pool.query(sellerQueries.getSellersByCategory, [seller_category_id]);
      const data = { 
          category: { name: sellersResult.rows[0].store_category }, 
          sellers: sellersResult.rows 
      };
      res.render('categorias', data);
  } catch (error) {
      console.error('Error fetching data for loja page:', error);
      res.status(500).send("Internal Server Error");
  }
});
app.get('/lojas/:id', async (req, res) => {
  const seller_id = parseInt(req.params.id);
  try {
    const [productResult, reviewsResult, sellerResult] = await Promise.all([
      pool.query(productQueries.getProductsById, [seller_id]),
      pool.query(sellerQueries.getReviwsById, [seller_id]),
      pool.query(sellerQueries.getSellerById, [seller_id])
    ]);
    if (sellerResult.rows.length === 0) {
      return res.status(404).send('Loja não encontrada');
    }
    const data = {
      seller: sellerResult.rows[0],
      products: productResult.rows,
      reviews: reviewsResult.rows
    };
    res.render('loja', data);
  } catch (error) {
    console.error('Error fetching data for loja page:', error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/geral', async (req, res) => {
    const sellerId = req.session.userId;
    try {
      const [averageResult, expensiveResult, cheapestResult] = await Promise.all([
        pool.query(productQueries.average, [sellerId]),
        pool.query(productQueries.expensive, [sellerId]),
        pool.query(productQueries.cheapest, [sellerId])
      ]);
      const sellerResult = await pool.query(sellerQueries.getSellerById, [sellerId]); 
      const seller = sellerResult.rows[0]
      const data = {
        average: averageResult.rows[0].avg,
        expensive: expensiveResult.rows[0].max,
        cheapest: cheapestResult.rows[0].min,
        seller
      };
      res.render('visão-geral', data);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
});
app.get('/vendedores', async (req, res) => {
  const userId = req.session.userId; 
    try {
      const addressResult = await pool.query(userQueries.getAddress, [userId]); 
      const address = addressResult.rows.length > 0 ? addressResult.rows[0].address : null;
  
      const sellerResult = await pool.query(sellerQueries.getSellers); 
      
      const data = {
        address,
        sellers: sellerResult.rows
      };
      res.render('vendedores', data);
    } catch (error) {
      console.error("Error fetching seller data:", error);
      res.status(500).send("Internal Server Error");
    }
});
app.get('/produtos', async (req, res) => {
  const userId = req.session.userId; 
  try {
      const [productsResult, categoryResult] = await Promise.all([
          pool.query(productQueries.getProductsById, [userId]),
          pool.query(productCategoryQueries.getProductsCategory) 
      ]);
      res.render('produtos', { 
          products: productsResult.rows, 
          productCategories: categoryResult.rows 
      });
  } catch (error) {
      console.error("Error fetching products or categories:", error);
      res.status(500).send("Internal Server Error");
  }
});
app.get('/gerenciamento', async (req, res) => {
  const sellerId = req.session.userId; 
  try {
      const results = await pool.query(orderQueries.getOrdersById, [sellerId]);
      res.render('gerenciamento', { orders: results.rows }); 
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send("Internal Server Error");
  }
});
app.get('/perfil-vendedor', (req, res) => {
    res.render('perfil-vendedor');
});
app.get('/perfil', (req, res) => {
  res.render('perfil');
});
app.get('/carrinho', async (req, res) => {
  const userId = req.session.userId;
  try{
    const [cartProducts, sumProducts] = await Promise.all([
      pool.query(lojaQueries.getCartProductsById, [userId]),
      pool.query(lojaQueries.sumCartProducts)
    ]);
    const sum = sumProducts.rows[0].sum
    res.render('carrinho', {products: cartProducts.rows, sum});
  }catch (error) {
    console.error("Error fetching products or categories:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/search', async (req, res) => {
  const searchQuery = req.query.query; 
  try {
      const searchResults = await pool.query(lojaQueries.search,[`%${searchQuery}%`]);
      res.render('search', { results: searchResults.rows });
  } catch (error) {
      console.error("Error performing search:", error);
      res.status(500).send("Internal Server Error");
  }
});

app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/sellercategories', sellerCategoriesRoutes);
app.use('/products', productRoutes);
app.use('/productcategories', productCategoriesRoutes);
app.use('/loja', lojaRoutes);
app.use('/orders', orderRoutes);
app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});

