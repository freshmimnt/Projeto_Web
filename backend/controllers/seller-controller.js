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
  const userId = req.session.userId;
  pool.query(queries.getProductCategoryDistribution, [userId],(error, results) =>{
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

module.exports = {
  getSellers,
  getLocation,  
  getProductCategoryDistribution,  
}
