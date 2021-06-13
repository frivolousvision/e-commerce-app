import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../features/cartCountSlice";
import "../Products/products.css";
import "./cart.css";

const Cart = (props) => {
  const [cart, setCart] = useState(0);
  const [total, setTotal] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = () => {
      return fetch("http://localhost:5000/cart").then((res) => res.json());
    };
    let mounted = true;
    getCart().then((res) => {
      if (mounted) {
        setCart(res);
      }
    });
    getCartTotal().then((res) => {
      if (mounted) {
        setTotal(res[0].sum);
      }
    });
    return () => (mounted = false);
  }, []);

  //Sets "in_cart" in DB to false, filers displayed results
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.product_id !== id));
    fetch(`http://localhost:5000/removefromcart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)))
      .then(getCartTotal().then((res) => setTotal(res[0].sum)));
  };
  //Get total cost of cart
  const getCartTotal = () => {
    return fetch(`http://localhost:5000/carttotal`).then((res) => res.json());
  };

  return (
    <Fragment>
      <div className='top cart'></div>
      <p className='cart-total'>Cart total:${total ? total : 0}</p>
      <div className='product-list'>
        {cart.length ? (
          cart.map((product) => (
            <div className='product-box' key={product.product_id}>
              <img src={product.img_url} alt='' />
              <h2>{product.name}</h2>
              <h2>${product.price}</h2>

              <button onClick={() => removeFromCart(product.product_id)}>
                Remove from cart
              </button>
            </div>
          ))
        ) : (
          <p className='empty-cart'>Your cart is empty</p>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
