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
  const dispatch = useDispatch();
  const [items, setItems] = useState("");
  const cartCount = useSelector(selectCartCount);

  // Load All posducts from database
  const allProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const jsonProducts = await response.json();
      setItems(jsonProducts);
    } catch (err) {
      console.log(err.messsage);
    }
  };

  const getCartCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/count");
      const jsonResponse = await response.json();
      dispatch(setCartCount(jsonResponse[0].count));
    } catch (err) {
      console.log(err.message);
    }
  };
  // const handlePageLoad = async () => {
  //   allProducts();
  //   getCartCount();
  // };
  // Render all products on page load// Updates cart count and total cost
  useEffect(() => {
    const handlePageLoad = async () => {
      allProducts();
      getCartCount();
    };
    handlePageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Router>
        <Header
          cartCount={cartCount}
          //cart={cart}
        />

        <Switch>
          <Route path='/' exact component={() => <Products items={items} />} />
          <Route
            path='/iphone'
            exact
            component={() => <Iphone items={items} />}
          />
          <Route path='/ipad' exact component={() => <Ipad items={items} />} />
          <Route path='/mac' exact component={() => <Mac items={items} />} />
          <Route path='/cart' exact component={() => <Cart />} />
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
