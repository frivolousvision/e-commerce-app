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

  const loadCart = () => {
    try {
      fetch("/count", {
        method: "GET",
        headers: { token: localStorage.token },
      })
        .then((res) => res.json())
        .then((res) => {
          return dispatch(setCartCount(res[0].sum));
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOrdered();
    loadCart();
  }, []);

  return (
    <div className='ordered-container'>
      {products && products[0] && products[0].user_name ? (
        <h2>Welcome back, {products[0].user_name}!</h2>
      ) : (
        <h2>Welcome!</h2>
      )}
      {products && products[0] ? (
        <p>Your orders:</p>
      ) : (
        <div>
          <p>You don't have any previous orders</p>
          <Link to='/'>Start shopping here!</Link>
        </div>
      )}
      {products && products[0]
        ? products.map((product, index) => (
            <div key={index}>
              <p>{product.product_name}</p>
              <img src={product.img_url} />
              <p>quantity: {product.quantity}</p>
            </div>
          ))
        : null}
    </div>
  );
};
export default Ordered;
