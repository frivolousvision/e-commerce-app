import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//Components
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Iphone from "./components/Products/Iphone";
import Ipad from "./components/Products/Ipad";
import Mac from "./components/Products/Mac";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    isAuth();
  }, []);
  return (
    <Fragment>
      <Router>
        <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />

        <Switch>
          <Route path='/' exact component={() => <Products />} />
          <Route path='/iphone' exact component={() => <Iphone />} />
          <Route path='/ipad' exact component={() => <Ipad />} />
          <Route path='/mac' exact component={() => <Mac />} />
          <Route
            path='/login'
            exact
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/cart' />
              )
            }
          />
          <Route
            path='/register'
            exact
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/cart' />
              )
            }
          />
          <Route
            path='/cart'
            exact
            render={(props) =>
              isAuthenticated ? (
                <Cart
                  {...props}
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                />
              ) : (
                <Redirect to='/login' />
              )
            }
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
