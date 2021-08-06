const authorization = require("../middleware/authorization");
const pool = require("../db");
const router = require("express").Router();

router.get("/ordered", authorization, async (req, res) => {
  try {
    const ordered = await pool.query(
      "SELECT users.user_name AS user_name, products.name AS product_name, products.price AS price, products.img_url AS img_url FROM users, products, users_products_ordered WHERE users_products_ordered.user_id = $1 AND users.user_id = users_products_ordered.user_id AND products.product_id = users_products_ordered.product_id;",
      [req.user]
    );
    console.log("ordered success");
    res.json(ordered.rows);
  } catch (err) {
    console.log("ordered error");
    console.error(err.message);
  }
});

module.exports = router;
