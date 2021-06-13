import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Iphone from "./components/Products/Iphone";
import Ipad from "./components/Products/Ipad";
import Mac from "./components/Products/Mac";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Fragment>
      <Router>
        <Header />

        <Switch>
          <Route path='/' exact component={() => <Products />} />
          <Route path='/iphone' exact component={() => <Iphone />} />
          <Route path='/ipad' exact component={() => <Ipad />} />
          <Route path='/mac' exact component={() => <Mac />} />
          <Route path='/cart' exact component={() => <Cart />} />
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
