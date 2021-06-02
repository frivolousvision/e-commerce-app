import React, { Fragment, useState, useEffect } from "react";
import "../Products/products.css";

const Cart = (props) => {
  const [cart, setCart] = useState(props.cart);
  const removeFromCart = async (id) => {
    fetch(`http://localhost:5000/removefromcart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    setCart(cart.filter((item) => item.product_id !== id));
  };
  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {cart.length > 0 ? (
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
          <p>Your cart is empty</p>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
