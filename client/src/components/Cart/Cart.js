import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, setCartCount } from "../../features/cartCountSlice";
import "../Products/products.css";

const Cart = (props) => {
  const [cart, setCart] = useState(0);
  const [total, setTotal] = useState();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    const handlePageLoad = async () => {
      getCart();
      getCartTotal();
      getCartCount();
    };
    handlePageLoad();
  }, []);

  const getCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const jsonProducts = await response.json();
      setCart(jsonProducts);
    } catch (err) {
      console.log(err.message);
    }
  };
  //Sets "in_cart" in DB to false, filers displayed results
  const removeFromCart = async (id) => {
    try {
      fetch(`http://localhost:5000/removefromcart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      setCart(cart.filter((item) => item.product_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };
  //Gets total cart dollar amount
  const getCartTotal = async () => {
    try {
      const response = await fetch(`http://localhost:5000/carttotal`);
      const jsonResponse = await response.json();
      setTotal(jsonResponse[0].sum);
    } catch (err) {
      console.log(err.message);
    }
  };
  //Gets number of items in cart, uses Redux to set state
  const getCartCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/count");
      const jsonResponse = await response.json();
      dispatch(setCartCount(jsonResponse[0].count));
      return cartCount;
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleRemoveFromCart = async (id) => removeFromCart(id);
  getCartCount();
  getCartTotal();

  return (
    <Fragment>
      <div className='top cart'></div>
      <p>Cart total:${total ? total : 0}</p>
      <div className='product-list'>
        {cart.length ? (
          cart.map((product) => (
            <div className='product-box' key={product.product_id}>
              <img src={product.img_url} alt='' />
              <h2>{product.name}</h2>
              <h2>${product.price}</h2>

              <button onClick={() => handleRemoveFromCart(product.product_id)}>
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
