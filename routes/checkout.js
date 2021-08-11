const router = require("express").Router();
require("dotenv").config();
const stripeKey = process.env.sk;
const stripe = require("stripe")(stripeKey);
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/create-payment-intent", authorization, async (req, res) => {
  const total = await pool.query(
    "SELECT SUM(products.price) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
    [req.user]
  );
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total.rows[0].sum * 100,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.get("/cart-to-ordered", authorization, async (req, res) => {
  try {
    pool.query(
      "INSERT INTO users_products_ordered (user_id, product_id, quantity) SELECT user_id, product_id, quantity FROM users_products_cart WHERE user_id = $1;",
      [req.user]
    );

    pool.query("DELETE FROM users_products_cart WHERE user_id = $1", [
      req.user,
    ]);
    res.send("Success");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
