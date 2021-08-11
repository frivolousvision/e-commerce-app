import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setCartCount } from "../../features/cartCountSlice";
import { setCartTrue } from "../../features/inCartSlice";
import { useDispatch } from "react-redux";
import "./product.css";

const Product = (props) => {
  //Redux Variable
  const dispatch = useDispatch();
  const [button, setButton] = useState();

  const addToCart = (id) => {
    let localStorageCart = [];
    //If user isn't logged in, add items in local storage to cart
    if (!localStorage.token) {
      fetch(`/add-to-cart-guest/${id}`)
        .then((res) => res.json())
        .then((res) => dispatch(setCartCount(res[0].sum)));
      console.log("guest cart");
    }

    //If user is logged in
    if (localStorage.token) {
      dispatch(setCartTrue());
      fetch(`/add-to-cart-user/${id}`, {
        method: "GET",
        headers: { token: localStorage.token },
      })
        .then((res) => res.json())

        .then((res) => dispatch(setCartCount(res[0].sum)));
      console.log("user cart");
    }
    setButton(true);
    setTimeout(() => setButton(false), 1000);
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
        {/* {props.isAuthenticated ? ( */}
        {button ? (
          <button className='add-to-cart-action buttons'>Added to cart!</button>
        ) : (
          <button
            className='buttons'
            onClick={() => addToCart(props.product.product_id)}
          >
            Add to cart
          </button>
        )}
        {/* ) : null} */}
      </div>
    </div>
  );
};
export default Product;
