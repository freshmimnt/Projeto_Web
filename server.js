const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const userRoutes = require('./backend/routes/user-routes')
const sellerRoutes = require('./backend/routes/seller-routes')
const sellercategoriesRoutes = require('./backend/routes/sellercategory-routes')
const productRoutes = require('./backend/routes/product-routes')
const queries = require('./backend/queries/product-queries');
const pool = require('./backend/models/database');
const dotenv = require('dotenv')
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
    res.render('gerenciamento');
});
app.get('/registo-comprador', (req, res) => {
    res.render('registo-comprador');
});
app.get('/registo-vendedor', (req, res) => {
    res.render('registo-vendedor');
});

app.get('/geral', (req, res) => {
    const sellerId = 1;
    pool.query(queries.average, [sellerId], (error1, averageResult) => {
        if (error1) {
            throw error1;
        }
        const average = averageResult.rows[0].avg;
        
        pool.query(queries.std, [sellerId], (error2, stdResult) => {
            if (error2) {
                throw error2;
            }
            const std = stdResult.rows[0].stddev_samp;
            
            pool.query(queries.expensive, [sellerId], (error3, expensiveResult) => {
                if (error3) {
                    throw error3;
                }
                const expensive = expensiveResult.rows[0].max;
                
                pool.query(queries.cheapest, [sellerId], (error4, cheapestResult) => {
                    if (error4) {
                        throw error4;
                    }
                    const cheapest = cheapestResult.rows[0].min;
                    
                    const data = {
                        average: average,
                        std: std,
                        expensive: expensive,
                        cheapest: cheapest
                    };
                    res.render('visão-geral', data);
                });
            });
        });
    });
});
app.get('/vendedores', (req, res) => {
    const id = 1;
    pool.query(queries.getAddress, [id], (error, result) => {
        if (error) {
            throw error;
        }
        const address = result.rows[0].address;
        res.render('vendedores', { address: address });
    });
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
app.use(express.static('public'));


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});