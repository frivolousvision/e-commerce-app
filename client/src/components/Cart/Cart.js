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

  //Sets "in_cart" in DB to false, filers displayed results
  const removeFromCart = (id) => {
    let count;
    let total;
    setCart(cart.filter((item) => item.product_id !== id));
    fetch(`/removefromcart/${id}`, {
      method: "GET",
      headers: { token: localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        total = res.total;
        count = res.count;
      })
      .then((res) => dispatch(setCartCount(count[0].count)))
      .then((res) => setTotal(total[0].sum));
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setAuth(false);
    props.loadCart();
    toast.success("You logged out successfully");
    dispatch(setCartCount(0));
  };

  const getCart = () => {
    if (localStorage.cart) {
      try {
        let count;
        let total;
        let product;
        return fetch("/api/guest-cart", {
          method: "GET",
          headers: { token: localStorage.token, cart: localStorage.cart },
        })
          .then((res) => res.json())
          .then((res) => {
            product = res.product;
            count = res.count;
            total = res.total;
          })
          .then((res) => setCart(product))
          .then((res) => dispatch(setCartCount(count[0].count)))
          .then((res) => setTotal(total[0].sum))
          .then(localStorage.removeItem("cart"));
      } catch (err) {
        console.error(err.message);
      }
    }
    if (!localStorage.cart) {
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
          .then((res) => dispatch(setCartCount(count[0].count)))
          .then((res) => setTotal(total[0].sum));
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Fragment>
      <div className='top'>
        <Link to='/ordered'>Order History</Link>
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
      <div className='logout-container'>
        <button onClick={(e) => logout(e)} className='logout-button'>
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default Cart;
