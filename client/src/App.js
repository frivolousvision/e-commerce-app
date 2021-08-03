import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartCount } from "./features/cartCountSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import LoginHeader from "./components/LoginHeader/LoginHeader";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();

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
  const loadCart = () => {
    try {
      if (!localStorage.token) {
        return dispatch(setCartCount(JSON.parse(localStorage.cart).length));
      }
      if (localStorage.token) {
        fetch("/count", {
          method: "GET",
          headers: { token: localStorage.token },
        })
          .then((res) => res.json())
          .then((res) => {
            return dispatch(setCartCount(res[0].count));
          });
      } else {
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    isAuth();
    if (mounted) {
      loadCart();
      return () => (mounted = false);
    }
  }, [dispatch, localStorage.token, localStorage.cart]);

  return (
    <Fragment>
      <Router>
        <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
        <Switch>
          <Route
            path='/'
            exact
            component={() => <Products isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/iphone'
            exact
            component={() => <Iphone isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/ipad'
            exact
            component={() => <Ipad isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/mac'
            exact
            component={() => <Mac isAuthenticated={isAuthenticated} />}
          />
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
                  loadCart={loadCart}
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
            component={(props) => (
              <ProductInfo {...props} isAuthenticated={isAuthenticated} />
            )}
          />
        </Switch>
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
}

export default App;
