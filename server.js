const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const lojaRoutes = require('./backend/routes/loja-routes');
const userRoutes = require('./backend/routes/user-routes')
const sellerRoutes = require('./backend/routes/seller-routes')
const sellerCategoriesRoutes = require('./backend/routes/sellercategory-routes')
const productRoutes = require('./backend/routes/product-routes')
const productCategoriesRoutes = require('./backend/routes/productcategory-routes')
const productQueries = require('./backend/queries/product-queries');
const sellerQueries = require('./backend/queries/seller-queries');
const userQueries = require('./backend/queries/user-queries');
const sellerCategoriesQueries = require('./backend/queries/sellercategory-queries');
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/seller_images');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });

app.post('/sellers/:id/upload-image', upload.single('sellerImage'), async (req, res) => {
  const sellerId = req.params.id;
  const imagePath = `/uploads/seller_images/${req.file.filename}`; 
  try {
    await pool.query(sellerQueries.updateSellerImage, [imagePath, sellerId]);
    res.redirect('/sellers'); 
  } catch (error) {
    console.error("Error updating seller image:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/', (req, res) => {
    res.render('landing-page');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/logout', (req, res) => {
  req.session.destroy(); 
  res.redirect('/login'); 
});
app.get('/registo-comprador', (req, res) => {
    res.render('registo-comprador');
});
app.get('/registo-vendedor', (req, res) => {
    res.render('registo-vendedor');
});
app.get('/registo-vendedor2', (req, res) => {
  pool.query(sellerCategoriesQueries.getSellerCategories,(error, results) => {
    if (error) {
      throw error
    }
    res.render('registo-vendedor2', {sellerCategories: results.rows});
  });
});
app.get('/registo-vendedor3', (req, res) => {
    res.render('registo-vendedor3');
});
app.get('/registo-vendedor-em-espera', (req, res) => {
    res.render('registro-em-espera');
});
app.get('/lojas/:id', async (req, res) => {
  const seller_id = parseInt(req.params.id, 10);
  if (isNaN(seller_id)) {
    return res.status(400).send("ID de loja inválido. Por favor, insira um número.");
  }
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
    const sellerId = 1;
    try {
      const [averageResult, expensiveResult, cheapestResult] = await Promise.all([
        pool.query(productQueries.average, [sellerId]),
        pool.query(productQueries.expensive, [sellerId]),
        pool.query(productQueries.cheapest, [sellerId])
      ]);
  
      const data = {
        average: averageResult.rows[0].avg,
        expensive: expensiveResult.rows[0].max,
        cheapest: cheapestResult.rows[0].min
      };
      res.render('visão-geral', data);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
});
app.get('/vendedores', async (req, res) => {
    const userId = 1; 
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
app.get('/produtos', (req, res) => {
    const sellerId = 1;   
    pool.query(productQueries.getProductsBy, [sellerId], (error, results) => {
        if (error) {
            throw error;
        }
        res.render('produtos', { products: results.rows });
    });
});
app.get('/gerenciamento', (req, res) => {
    res.render('gerenciamento');
});
app.get('/perfil-vendedor', (req, res) => {
    res.render('perfil-vendedor');
});
app.get('/perfil', (req, res) => {
    res.render('perfil');
});
app.get('/categorias', (req, res) => {
  res.render('categorias');
});
app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/sellercategories', sellerCategoriesRoutes);
app.use('/products', productRoutes);
app.use('/productcategories', productCategoriesRoutes);
app.use(express.static('public'));


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});

