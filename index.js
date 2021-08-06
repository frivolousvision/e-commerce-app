const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path");
const authorization = require("./middleware/authorization");
const stripe = require("stripe")(process.env.sk);

app.use(cors());
app.use(express.json());

//Register and Login Routes
app.use("/auth", require("./routes/jwtAuth"));

//Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

//Checkout Route
app.use("/", require("./routes/checkout"));

//Ordered Route
app.use("/", require("./routes/ordered"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//GET ROUTES//

//USER INFO
app.get("/api/user", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//GET CART ITEMS
app.get("/api/guest-cart", authorization, async (req, res) => {
  try {
    JSONcart = JSON.parse(req.header("cart"));
    console.log(req);
    for (let i = 0; i < JSONcart.length; i++) {
      const inserts = await pool.query(
        "INSERT INTO users_products_cart VALUES ( $1, $2) RETURNING *",
        [req.user, JSONcart[i].product_id]
      );
    }
    const total = await pool.query(
      "SELECT products.product_id AS product_id, products.name AS name, products.description AS description, products.price AS price, products.img_url AS img_url, users_products_cart.quantity AS quantity FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    const count = await pool.query(
      "SELECT SUM(users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    const products = await pool.query(
      "SELECT products.product_id AS product_id, products.name AS name, products.description AS description, products.price AS price, products.img_url AS img_url FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
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
app.get("/api/user-cart", authorization, async (req, res) => {
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
    res.json({
      product: products.rows,
      total: total.rows,
      count: count.rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/carttotal", authorization, async (req, res) => {
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
app.get("/count", authorization, async (req, res) => {
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
//GET PRODUCTS FROM products DB
app.get("/api/products", async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products ORDER BY price ASC"
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/api/iphone", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'iphone' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/ipad", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'ipad' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/mac", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'mac' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/:id", async (req, res) => {
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

//Add to cart and remove from cart
app.get("/addtocart/:id", authorization, async (req, res) => {
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
    res.send(count.rows);
    console.log("Added to cart");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/removefromcart/:id", authorization, async (req, res) => {
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
      // "SELECT SUM(products.price) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      "SELECT SUM(products.price * users_products_cart.quantity) FROM users, products, users_products_cart WHERE users_products_cart.user_id = $1 AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;",
      [req.user]
    );
    res.send({ count: count.rows, total: total.rows });
    console.log("Removed from cart");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, console.log(`Server is running on ${PORT}`));
