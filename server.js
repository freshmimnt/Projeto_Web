const express = require('express')
const userRoutes = require('./backend/routes/user-routes')
const sellerRoutes = require('./backend/routes/seller-routes')
const sellercategoriesRoutes = require('./backend/routes/sellercategory-routes')

const app = express();
const PORT = 4000

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is some content.");
});

app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/sellercategories', sellercategoriesRoutes);


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});
