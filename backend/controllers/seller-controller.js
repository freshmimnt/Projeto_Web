const pool = require('../models/database')
const queries = require('../queries/seller-queries')
const multer = require('multer');

const getSellers = (req, res) => {
  pool.query(queries.getSellers, (error, results) => {
    if (error) {
      throw error
      }
    res.status(200).json(results.rows)
  })
}

const getLocation = (req, res) => {
  pool.query(queries.getLocation, (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows); 
  });
};
  
const getProductCategoryDistribution = (req, res) =>{
  const seller_id = parseInt(req.params.id);
  pool.query(queries.getProductCategoryDistribution, [seller_id],(error, results) =>{
     if (error) {
      throw error;
    }
    const chartData = {
      labels: results.rows.map(row => row.category),
      datasets: [{
        label: 'Distribuição de Produtos por Categoria',
        data: results.rows.map(row => row.product_count),
        backgroundColor: [ 
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
          ], 
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
          ],
        borderWidth: 1
      }]
    };
    res.json(chartData);
  });
};



const addStore = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); 

    if (isNaN(userId)) {
      return res.status(400).send("ID de usuário inválido.");
    }
    const { iban, store_name, delivery_radius, seller_category_id } = req.body;
    const img = req.file ? `/uploads/seller_images/${req.file.filename}` : null; 
    await pool.query(queries.addStore, [
      iban,
      store_name,
      delivery_radius,
      img,
      userId,
      seller_category_id,
    ]);

    res.redirect('/registo-vendedor-em-espera');
  } catch (error) {
    console.error("Error adding or updating seller:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getSellerRegistrationForm2 = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const categoriesResult = await pool.query('SELECT * FROM seller_categories'); 

      res.render('registo-vendedor2', { userId, sellerCategories: categoriesResult.rows});
  } catch (error) {
      console.error('Error fetching seller categories:', error);
      res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  getSellers,
  getLocation,  
  getProductCategoryDistribution,  
  addStore,
  getSellerRegistrationForm2,
}
