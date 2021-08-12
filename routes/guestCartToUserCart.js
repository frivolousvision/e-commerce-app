const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/guest-cart-to-user-cart", authorization, async (req, res) => {
  try {
    const moveCart = pool.query(
      "INSERT INTO users_products_cart (user_id, product_id, quantity) SELECT $1, guest_products_cart.product_id, guest_products_cart.quantity FROM guest_products_cart WHERE guest_products_cart.user_id = $2 ON CONFLICT ON CONSTRAINT users_products_cart_pkey DO UPDATE SET quantity = users_products_cart.quantity + excluded.quantity WHERE users_products_cart.product_id = excluded.product_id;",
      [req.user, req.sessionID]
    );
    res.status(200);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/clear-guest-cart", async (req, res) => {
  try {
    pool.query("DELETE FROM guest_products_cart WHERE user_id = $1;", [
      req.sessionID,
    ]);
    res.status(200);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
