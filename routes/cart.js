const authorization = require("../middleware/authorization");
const pool = require("../db");
const router = require("express").Router();

router.get("/api/guest-cart-info", async (req, res) => {
  try {
    const total = await pool.query(
      "SELECT SUM(products.price * guest_products_cart.quantity) FROM products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND products.product_id = guest_products_cart.product_id;",
      [req.session.id]
    );
    const count = await pool.query(
      "SELECT SUM(guest_products_cart.quantity) FROM products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND products.product_id = guest_products_cart.product_id;",
      [req.session.id]
    );
    const products = await pool.query(
      "SELECT products.product_id AS product_id, products.name AS name, products.description AS description, products.price AS price, products.img_url AS img_url, guest_products_cart.quantity AS quantity FROM products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND products.product_id = guest_products_cart.product_id;",
      [req.session.id]
    );
    res.json({
      product: products.rows,
      total: total.rows,
      count: count.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/api/user-cart", authorization, async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT products.product_id AS product_id, products.name AS name, products.description AS description, products.price AS price, products.img_url AS img_url, users_products_cart.quantity AS quantity FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    const total = await pool.query(
      "SELECT SUM(products.price * users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    const count = await pool.query(
      "SELECT SUM(users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    req.session = null;
    res.json({
      product: products.rows,
      total: total.rows,
      count: count.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/carttotal", authorization, async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT SUM(products.price * users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//COUNT CART ITEMS
router.get("/user-cart-count", authorization, async (req, res) => {
  try {
    const count = await pool.query(
      "SELECT SUM(users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    res.json(count.rows);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/guest-cart-count", async (req, res) => {
  try {
    const count = await pool.query(
      "SELECT SUM(guest_products_cart.quantity) FROM users, products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND users.user_id = guest_products_cart.user_id AND products.product_id = guest_products_cart.product_id;",
      [req.sessionID]
    );
    res.json(count.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
