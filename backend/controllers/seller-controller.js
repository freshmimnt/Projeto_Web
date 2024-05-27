const pool = require('../models/database')
const queries = require('../queries/seller-queries')

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
  

module.exports = {
    getSellers,
    getLocation,    
}
