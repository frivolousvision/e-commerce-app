import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const [button, setButton] = useState();

  /*const toggleButton = () => {
    if (button) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
*/
  const addToCart = async (id) => {
    fetch(`http://localhost:5000/addtocart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    setButton(true);
    console.log(button);
  };
  const removeFromCart = async (id) => {
    fetch(`http://localhost:5000/removefromcart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    setButton(false);
    console.log(button);
  };

  return (
    <div className='product-box' key={props.product.product_id}>
      <Link to={`/${props.product.product_id}`}>
        <img src={props.product.img_url} />
        <h2>{props.product.name}</h2>
      </Link>
      <h3>{props.product.description}</h3>
      <h2>${props.product.price}</h2>
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
