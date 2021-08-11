const authorization = require("../middleware/authorization");
const pool = require("../db");
const router = require("express").Router();

router.get("/ordered", authorization, async (req, res) => {
  try {
    const ordered = await pool.query(
      "SELECT users.user_name AS user_name, products.name AS product_name, products.price AS price, products.img_url AS img_url, users_products_ordered.quantity AS quantity FROM users, products, users_products_ordered WHERE users_products_ordered.user_id = $1 AND users.user_id = users_products_ordered.user_id AND products.product_id = users_products_ordered.product_id;",
      [req.user]
    );
    res.json(ordered.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
