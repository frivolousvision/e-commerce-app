import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../features/cartCountSlice";
import { toast } from "react-toastify";
import "../Products/products.css";
import "./cart.css";

const Cart = (props) => {
  const [cart, setCart] = useState(0);
  const [total, setTotal] = useState();
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    let count;
    let total;
    setCart(cart.filter((item) => item.product_id !== id));
    if (!localStorage.token) {
      fetch(`/remove-from-cart-guest/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          total = res.total;
          count = res.count;
        })
        .then((res) => {
          if (!count[0].sum) {
            dispatch(setCartCount(0));
          }
          if (count[0].sum) {
            dispatch(setCartCount(count[0].sum));
          }
        })
        .then((res) => setTotal(total[0].sum));
    }

    if (localStorage.token) {
      fetch(`/remove-from-cart-user/${id}`, {
        method: "GET",
        headers: { token: localStorage.token },
      })
        .then((res) => res.json())
        .then((res) => {
          total = res.total;
          count = res.count;
        })
        .then((res) => {
          if (!count[0].sum) {
            dispatch(setCartCount(0));
          }
          if (count[0].sum) {
            dispatch(setCartCount(count[0].sum));
          }
        })
        .then((res) => setTotal(total[0].sum));
    }
  };

  const getCart = () => {
    if (!localStorage.token) {
      try {
        let count;
        let total;
        let product;
        fetch("/api/guest-cart-info", {
          method: "GET",
          headers: { cart: localStorage.cart },
        })
          .then((res) => res.json())
          .then((res) => {
            product = res.product;
            count = res.count;
            total = res.total;
          })
          .then((res) => setCart(product))
          .then((res) => {
            if (!count[0].sum) {
              dispatch(setCartCount(0));
            }
            if (count[0].sum) {
              dispatch(setCartCount(count[0].sum));
            }
          })
          .then((res) => setTotal(total[0].sum));
      } catch (err) {
        console.error(err.message);
      }
    }
    if (localStorage.token) {
      try {
        let count;
        let total;
        let product;
        return fetch("/api/user-cart", {
          method: "GET",
          headers: { token: localStorage.token },
        })
          .then((res) => res.json())
          .then((res) => {
            product = res.product;
            count = res.count;
            total = res.total;
          })
          .then((res) => setCart(product))
          .then((res) => {
            if (!count[0].sum) {
              dispatch(setCartCount(0));
            }
            if (count[0].sum) {
              dispatch(setCartCount(count[0].sum));
            }
          })
          .then((res) => setTotal(total[0].sum));
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setAuth(false);
    props.loadCart();
    toast.success("You logged out successfully");
    dispatch(setCartCount(0));
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Fragment>
      <div className='top'>
        {localStorage.token && (
          <div className='orders-button-container'>
            <Link to='/ordered'>
              <button className='orders-button'>View Orders</button>
            </Link>
          </div>
        )}
      </div>
      <div className='product-list'>
        {cart.length ? (
          cart.map((product) => (
            <div className='product-box' key={product.product_id}>
              <Link to={`/${product.product_id}`}>
                <img className='cart-image' src={product.img_url} alt='' />
                <h2>{product.name}</h2>
              </Link>
              <h2 className='price'>${product.price}</h2>
              <h3 className='quantity'>quantity: {product.quantity}</h3>
              <button
                onClick={() => removeFromCart(product.product_id)}
                className='remove-from-cart-button'
              >
                Remove from cart
              </button>
            </div>
          ))
        ) : (
          <p className='empty-cart'>Your cart is empty</p>
        )}
      </div>
      <div className='cart-total-container'>
        <div className=''>
          <p className='cart-total'>Cart total:${total ? total : 0}</p>
        </div>
        <div className='checkout-button'>
          <Link to='/checkout'>
            <p className=''>Checkout</p>
          </Link>
        </div>
      </div>
      <div className='logout-container'>
        {localStorage.token ? (
          <button onClick={(e) => logout(e)} className='logout-button'>
            Logout
          </button>
        ) : (
          <Link to='/login'>
            <button className='login-button'>Login</button>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
