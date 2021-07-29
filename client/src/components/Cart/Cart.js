import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      return fetch("/cart").then((res) => res.json());
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
    let count;
    let total;
    setCart(cart.filter((item) => item.product_id !== id));
    fetch(`/removefromcart/${id}`)
      .then((res) => res.json())
      .then((res) => {
        total = res.total;
        count = res.count;
      })
      .then((res) => dispatch(setCartCount(count[0].count)))
      .then((res) => setTotal(total[0].sum));
  };
  //Get total cost of cart
  const getCartTotal = () => {
    return fetch(`/carttotal`).then((res) => res.json());
  };

  return (
    <Fragment>
      <div className='top'></div>
      <div className='cart-total-container'>
        <p className='cart-total'>Cart total: ${total ? total : 0}</p>
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
