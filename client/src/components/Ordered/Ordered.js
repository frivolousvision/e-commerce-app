import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setCartCount } from "../../features/cartCountSlice";
import { useDispatch } from "react-redux";
import "./ordered.css";

const Ordered = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);

  const getOrdered = () => {
    fetch("/ordered", {
      method: "GET",
      headers: { token: localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => setProducts(res));
  };

  const getCart = () => {
    if (!localStorage.token) {
      try {
        let count;
        fetch("/api/guest-cart-info", {
          method: "GET",
          headers: { cart: localStorage.cart },
        })
          .then((res) => res.json())
          .then((res) => {
            count = res.count;
          })
          .then((res) => {
            if (!count[0].sum) {
              dispatch(setCartCount(0));
            }
            if (count[0].sum) {
              dispatch(setCartCount(count[0].sum));
            }
          });
      } catch (err) {
        console.error(err.message);
      }
    }
    if (localStorage.token) {
      try {
        let count;
        return fetch("/api/user-cart", {
          method: "GET",
          headers: { token: localStorage.token },
        })
          .then((res) => res.json())
          .then((res) => {
            count = res.count;
          })
          .then((res) => {
            if (!count[0].sum) {
              dispatch(setCartCount(0));
            }
            if (count[0].sum) {
              dispatch(setCartCount(count[0].sum));
            }
          });
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    getOrdered();
    getCart();
  }, []);

  return (
    <div className='ordered-container'>
      <div>
        {products && products[0] && products[0].user_name ? (
          <h2>Welcome back, {products[0].user_name}!</h2>
        ) : (
          <h2>Welcome!</h2>
        )}
        {products && products[0] ? (
          <h3>Thank you for your orders!</h3>
        ) : (
          <div>
            <p>You don't have any previous orders</p>
            <Link to='/'>Start shopping here!</Link>
          </div>
        )}
        <div className='product-container'>
          {products && products[0]
            ? products.map((product, index) => (
                <div key={index} className='products'>
                  <p className='product-name'>{product.product_name}</p>
                  <p className='quantity'>quantity: {product.quantity}</p>
                  <img src={product.img_url} alt='' className='ordered-image' />
                </div>
              ))
            : null}
        </div>
        {/* {products && products[0] && (
          <button className='clear-orders'>Clear orders</button>
        )} */}
      </div>
    </div>
  );
};
export default Ordered;
