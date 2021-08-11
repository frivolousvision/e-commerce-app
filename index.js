const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path");
const authorization = require("./middleware/authorization");
const session = require("express-session");
const { Store } = require("express-session");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());
app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 },
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//Register and Login Routes
app.use("/auth", require("./routes/jwtAuth"));

//Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

//Checkout Route
app.use("/", require("./routes/checkout"));

//Ordered Route
app.use("/", require("./routes/ordered"));

//Cart Route
app.use("/", require("./routes/cart"));

//Products
app.use("/", require("./routes/products"));

app.use("/", require("./routes/cartActions"));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, console.log(`Server is running on ${PORT}`));
