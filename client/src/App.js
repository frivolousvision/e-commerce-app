import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Cart from "./components/Cart/Cart";

function App() {
  const [items, setItems] = useState("");
  const [cart, setCart] = useState("");
  const [cartCount, setCartCount] = useState("");

  const allProducts = async () => {
    const response = await fetch("http://localhost:5000/products");
    const jsonProducts = await response.json();
    setItems(jsonProducts);
    //console.log(jsonProducts);
  };
  const getIphones = async () => {
    const response = await fetch("http://localhost:5000/iphone");
    const jsonProducts = await response.json();
    setItems(jsonProducts);
    //console.log(jsonProducts);
  };
  const getIpads = async () => {
    const response = await fetch("http://localhost:5000/ipad");
    const jsonProducts = await response.json();
    setItems(jsonProducts);
    //console.log(jsonProducts);
  };
  const getMacs = async () => {
    const response = await fetch("http://localhost:5000/mac");
    const jsonProducts = await response.json();
    setItems(jsonProducts);
    //console.log(jsonProducts);
  };
  const getCart = async () => {
    console.log("I was clicked");
    const response = await fetch("http://localhost:5000/cart");
    const jsonProducts = await response.json();

    setCart(jsonProducts.filter((product) => product.in_cart === true));
  };
  const getCartCount = async () => {
    const response = await fetch("http://localhost:5000/count");
    const jsonResponse = await response.json();
    console.log(jsonResponse[0].count);

    setCartCount(jsonResponse[0].count);
  };
  useEffect(() => {
    allProducts();
  }, []);
  useEffect(() => {
    getCartCount();
  });

  return (
    <Fragment>
      <Router>
        <Header
          getIphones={getIphones}
          getIpads={getIpads}
          getMacs={getMacs}
          getCart={getCart}
          cartCount={cartCount}
        />

        <Switch>
          <Route path='/' exact component={() => <Products items={items} />} />
          <Route
            path='/iphone'
            exact
            component={() => <Products items={items} />}
          />
          <Route
            path='/ipad'
            exact
            component={() => <Products items={items} />}
          />
          <Route
            path='/mac'
            exact
            component={() => <Products items={items} />}
          />
          <Route path='/cart' exact component={() => <Cart cart={cart} />} />
          <Route
            path='/:id'
            exact
            component={(props) => <ProductInfo items={items} {...props} />}
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
