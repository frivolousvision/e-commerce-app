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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
import Checkout from "./components/Checkout/Checkout";
import HomePage from "./components/HomePage/HomePage";
import Ordered from "./components/Ordered/Ordered";
import Disclaimer from "./components/Disclaimer/Disclaimer";

toast.configure();

const stripePromise = loadStripe(
  "pk_test_51Iv1zIJ8hAWttu63e1gQb89JlY7yHoPI0So6GfQS9RiI87ltv6Q2dCLxkvOBFscnzEI31pHYw9YvZdyG7ziNGApG00jUejxDf9"
);

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
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  const loadCart = () => {
    try {
      if (!localStorage.token) {
        fetch("/guest-cart-count")
          .then((res) => res.json())
          .then((res) => {
            if (!res[0].sum) {
              return dispatch(setCartCount(0));
            }
            if (res[0].sum) return dispatch(setCartCount(res[0].sum));
          });
      }
      if (localStorage.token) {
        fetch("/user-cart-count", {
          method: "GET",
          headers: { token: localStorage.token },
        })
          .then((res) => res.json())
          .then((res) => {
            return dispatch(setCartCount(res[0].sum));
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
  }, [dispatch]);

  return (
    <Fragment>
      <Elements stripe={stripePromise}>
        <Router>
          <Header
            isAuthenticated={isAuthenticated}
            setAuth={setAuth}
            loadCart={loadCart}
          />
          <Switch>
            <Route path='/' exact component={() => <HomePage />} />
            <Route
              path='/products'
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
              component={
                (props) => (
                  // isAuthenticated ? (
                  <Cart
                    {...props}
                    isAuthenticated={isAuthenticated}
                    setAuth={setAuth}
                    loadCart={loadCart}
                  />
                )
                // ) : (
                // <Redirect to='/disclaimer' />
                // )
              }
            />
            <Route
              path='/checkout'
              exact
              render={(props) =>
                isAuthenticated ? <Checkout /> : <Redirect to='/disclaimer' />
              }
            />
            <Route
              path='/ordered'
              exact
              render={(props) =>
                isAuthenticated ? (
                  <Ordered
                    {...props}
                    setAuth={setAuth}
                    loadCart={loadCart}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  <Redirect to='/disclaimer' />
                )
              }
            />
            <Route
              path='/disclaimer'
              exact
              component={(props) => (
                <Disclaimer {...props} isAuthenticated={isAuthenticated} />
              )}
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
      </Elements>
    </Fragment>
  );
}

export default App;
