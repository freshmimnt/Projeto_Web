const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const userRoutes = require('./backend/routes/user-routes')
const sellerRoutes = require('./backend/routes/seller-routes')
const sellercategoriesRoutes = require('./backend/routes/sellercategory-routes')
const productRoutes = require('./backend/routes/product-routes')
const productcategoriesRoutes = require('./backend/routes/productcategory-routes')
const queries = require('./backend/queries/product-queries');
const pool = require('./backend/models/database');
const dotenv = require('dotenv')
const multer = require('multer');
dotenv.config()

const app = express();
const PORT = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './backend/views');

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
app.get('/registo-comprador', (req, res) => {
    res.render('registo-comprador');
});
app.get('/registo-vendedor', (req, res) => {
    res.render('registo-vendedor');
});
app.get('/registo-vendedor2', (req, res) => {
    res.render('registo-vendedor2');
});
app.get('/registo-vendedor3', (req, res) => {
    res.render('registo-vendedor3');
});
app.get('/registo-vendedor-em-espera', (req, res) => {
    res.render('registo-vendedor-em-espera');
});

app.get('/geral', async (req, res) => {
    try {
      const [averageResult, stdResult, expensiveResult, cheapestResult] = await Promise.all([
        pool.query(queries.average, [sellerId]),
        pool.query(queries.std, [sellerId]),
        pool.query(queries.expensive, [sellerId]),
        pool.query(queries.cheapest, [sellerId])
      ]);
  
      const data = {
        average: averageResult.rows[0].avg,
        std: stdResult.rows[0].stddev_samp,
        expensive: expensiveResult.rows[0].max,
        cheapest: cheapestResult.rows[0].min
      };
  
      res.render('visão-geral', data);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
});
  
app.get('/vendedores', (req, res) => {
      res.render('vendedores', { address: "Av. Dom Carlos I 4" });    
});

app.get('/produtos', (req, res) => {
    const sellerId = 1;   
    pool.query(queries.getProducts, [sellerId], (error, results) => {
        if (error) {
            throw error;
        }
        res.render('produtos', { products: results.rows });
    });
});
app.get('/gerenciamento', (req, res) => {
    res.render('gerenciamento');
});

app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/sellercategories', sellercategoriesRoutes);
app.use('/products', productRoutes);
app.use('/productcategories', productcategoriesRoutes);
app.use(express.static('public'));


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});

