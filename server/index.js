const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { urlencoded } = require("express");
const cors = require("cors");
const pool = require("./db");
const query = require("express");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
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
//COUNT CART ITEMS
app.get("/count", async (req, res) => {
  try {
    const count = await pool.query(
      "SELECT COUNT(product_id) FROM products WHERE in_cart = 'true'"
    );
    res.json(count.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
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

//POST ROUTES//
app.put("/addtocart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const addToCart = await pool.query(
      "UPDATE products SET in_cart = 'true' WHERE product_id = $1",
      [id]
    );
    res.status(200);
    console.log("Added to cart");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE ROUTES//
app.put("/removefromcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removeFromCart = await pool.query(
      "UPDATE products SET in_cart = 'false' WHERE product_id = $1",
      [id]
    );
    res.json("Removed from cart");
  } catch (error) {}
});

app.listen(port, console.log(`Server is running on ${port}`));

/*"INSERT INTO cart (name, price, type, img_url, product_id) SELECT products.name, products.price, products.type, products.img_url, products.product_id FROM products WHERE product_id = $1",
      [id]*/
