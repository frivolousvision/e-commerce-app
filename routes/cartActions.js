const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/add-to-cart-guest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const addToCart = await pool.query(
      "INSERT INTO guest_products_cart (user_id, product_id, quantity) VALUES ( $1, $2, '1') ON CONFLICT ON CONSTRAINT guest_products_cart_pkey DO UPDATE SET quantity = guest_products_cart.quantity + 1 WHERE guest_products_cart.product_id = $2;",
      [req.sessionID, id]
    );
    const count = await pool.query(
      "SELECT SUM(guest_products_cart.quantity) FROM products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND products.product_id = guest_products_cart.product_id;",
      [req.sessionID]
    );
    res.json(count.rows);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/add-to-cart-user/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const addToCart = await pool.query(
      "INSERT INTO users_products_cart VALUES ( $1, $2, '1') ON CONFLICT ON CONSTRAINT users_products_cart_pkey DO UPDATE SET quantity = users_products_cart.quantity + 1 WHERE users_products_cart.product_id = $2;",
      [req.user, id]
    );
    const count = await pool.query(
      "SELECT SUM(users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    res.json(count.rows);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/remove-from-cart-guest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removeFromCart = await pool.query(
      "DELETE FROM guest_products_cart USING products WHERE products.product_id = $1 AND guest_products_cart.user_id = $2 AND products.product_id = guest_products_cart.product_id;",
      [id, req.sessionID]
    );
    const count = await pool.query(
      "SELECT SUM(guest_products_cart.quantity) FROM products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND products.product_id = guest_products_cart.product_id;",
      [req.sessionID]
    );
    const total = await pool.query(
      "SELECT SUM(products.price * guest_products_cart.quantity) FROM products, guest_products_cart WHERE guest_products_cart.user_id = $1 AND products.product_id = guest_products_cart.product_id;",
      [req.sessionID]
    );
    res.json({ count: count.rows, total: total.rows });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/remove-from-cart-user/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const removeFromCart = await pool.query(
      "DELETE FROM users_products_cart USING products, users WHERE products.product_id = $1 AND users_products_cart.user_id = $2 AND products.product_id = users_products_cart.product_id;",
      [id, req.user]
    );
    const count = await pool.query(
      "SELECT SUM(users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    const total = await pool.query(
      "SELECT SUM(products.price * users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    res.json({ count: count.rows, total: total.rows });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
