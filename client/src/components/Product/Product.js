import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setCartCount } from "../../features/cartCountSlice";
import {
  setCartTrue,
  setCartFalse,
  selectInCart,
} from "../../features/inCartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = (props) => {
  //Redux Variable
  const dispatch = useDispatch();
  const inCart = useSelector(selectInCart);
  const [button, setButton] = useState();

  //Set "in_cart" to true in db, updates item count in cart
  const addToCart = (id) => {
    dispatch(setCartTrue());
    fetch(`http://localhost:5000/addtocart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)));
    setButton(true);
  };

  const removeFromCart = (id) => {
    dispatch(setCartFalse());
    fetch(`http://localhost:5000/removefromcart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)));
    setButton(false);
  };

  return (
    <div className='product-box' key={props.product.product_id}>
      <Link to={`/${props.product.product_id}`}>
        <img src={props.product.img_url} alt='' />
        <h2>{props.product.name}</h2>
      </Link>
      <h3 className='description'>{props.product.description}</h3>
      <h2 className='price'>${props.product.price}</h2>
      <div className='buttons'>
        <button onClick={() => addToCart(props.product.product_id)}>
          Add to cart
        </button>
        {button || props.product.in_cart ? (
          <button onClick={() => removeFromCart(props.product.product_id)}>
            Remove from cart
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Product;
