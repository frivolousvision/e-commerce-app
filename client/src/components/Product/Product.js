import React from "react";
import { Link } from "react-router-dom";
import { setCartCount } from "../../features/cartCountSlice";
import { useDispatch } from "react-redux";

const Product = (props) => {
  //Redux Variable
  const dispatch = useDispatch();
  //Set "in_cart" to true in db, updates item count in cart
  const addToCart = (id) => {
    fetch(`http://localhost:5000/addtocart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)));
  };

  //   const removeFromCart = async (id) => {
  // dispatch(decrementCart);
  // fetch(`http://localhost:5000/removefromcart/${id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  // });
  // setButton(false);
  // props.getCartCount();
  // console.log(button);
  //   };

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
        {/* {button || props.product.in_cart ? (
          <button onClick={() => removeFromCart(props.product.product_id)}>
            Remove from cart
          </button>
        ) : (
          ""
        )}*/}
      </div>
    </div>
  );
};
export default Product;
