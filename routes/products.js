const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/api/products", async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products ORDER BY price ASC"
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/api/iphone", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'iphone' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/api/ipad", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'ipad' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/api/mac", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'mac' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );
    res.json(getProduct.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
