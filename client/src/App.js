import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Features
import { setCartCount, selectCartCount } from "./features/cartCountSlice";

//Components
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Iphone from "./components/Products/Iphone";
import Ipad from "./components/Products/Ipad";
import Mac from "./components/Products/Mac";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Cart from "./components/Cart/Cart";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();
  // const [items, setItems] = useState("");

  // const cartCount = useSelector(selectCartCount);
  const getCartCount = () => {
    console.log("header fetch called");
    return fetch("http://localhost:5000/count")
      .then((res) => res.json())
      .then((res) => setCartCount(res[0].count));
  };

  // console.log(state);
  useEffect(() => {
    let mounted = true;
    // getCartCount().then((res) => {
    if (mounted) {
      getCartCount();
    }
    return () => (mounted = false);
  }, [cartCount]);

  return (
    <Fragment>
      <Router>
        <Header cartCount={cartCount} />

        <Switch>
          <Route
            path='/'
            exact
            component={() => <Products getCartCount={getCartCount} />}
          />
          <Route
            path='/iphone'
            exact
            component={() => <Iphone getCartCount={getCartCount} />}
          />
          <Route
            path='/ipad'
            exact
            component={() => <Ipad getCartCount={getCartCount} />}
          />
          <Route
            path='/mac'
            exact
            component={() => <Mac getCartCount={getCartCount} />}
          />
          <Route
            path='/cart'
            exact
            component={() => <Cart getCartCount={getCartCount} />}
          />
          <Route
            path='/:id'
            exact
            component={(props) => <ProductInfo {...props} />}
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
