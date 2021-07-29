const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { urlencoded } = require("express");
const cors = require("cors");
const pool = require("./db");
const query = require("express");
const path = require("path");

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

const PORT = process.env.PORT || 5000;
//GET ROUTES//

//GET CART ITEMS
app.get("/cart", async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products WHERE in_cart = 'true'"
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/carttotal", async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT SUM(price) FROM products WHERE in_cart = 'true'"
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//COUNT CART ITEMS
app.get("/count", async (req, res) => {
  try {
    const count = await pool.query(
      "SELECT COUNT(*) FROM products WHERE in_cart = 'true'"
    );
    res.json(count.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products ORDER BY price ASC"
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/iphone", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'iphone' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/ipad", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'ipad' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/mac", async (req, res) => {
  try {
    const iphones = await pool.query(
      "SELECT * FROM products WHERE type = 'mac' ORDER BY price DESC"
    );
    res.json(iphones.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/:id", async (req, res) => {
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

//PUT ROUTES// Why aren't these puts!??
app.get("/addtocart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const addToCart = await pool.query(
      "UPDATE products SET in_cart = 'true' WHERE product_id = $1",
      [id]
    );
    const count = await pool.query(
      "SELECT COUNT(*) FROM products WHERE in_cart = 'true'"
    );
    res.send(count.rows);
    console.log("Added to cart");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/removefromcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removeFromCart = await pool.query(
      "UPDATE products SET in_cart = 'false' WHERE product_id = $1",
      [id]
    );
    const count = await pool.query(
      "SELECT COUNT(*) FROM products WHERE in_cart = 'true'"
    );
    const total = await pool.query(
      "SELECT SUM(price) FROM products WHERE in_cart = 'true'"
    );
    res.send({ count: count.rows, total: total.rows });
    console.log("Removed from cart");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, console.log(`Server is running on ${PORT}`));
