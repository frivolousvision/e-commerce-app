import React from "react";
import { Link } from "react-router-dom";
import { setCartCount } from "../../features/cartCountSlice";
import { useDispatch } from "react-redux";

const Product = (props) => {
  const dispatch = useDispatch();

  const getCartCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/count");
      const jsonResponse = await response.json();
      console.log(jsonResponse[0].count);
      dispatch(setCartCount(jsonResponse[0].count));
    } catch (err) {
      console.log(err.message);
    }
  };
  const addToCart = async (id) => {
    fetch(`http://localhost:5000/addtocart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  };
  const handleAddToCart = async (id) => {
    addToCart(id);
    getCartCount();
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
        <button onClick={() => handleAddToCart(props.product.product_id)}>
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
