import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import "./products.css";
import Product from "../Product/Product";

const Products = (props) => {
  /*const [button, setButton] = useState(null);

  const toggleButton = () => {
    if (button) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const addToCart = async (id) => {
    fetch(`http://localhost:5000/addtocart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    toggleButton();
  };
  const removeFromCart = async (id) => {
    fetch(`http://localhost:5000/removefromcart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    toggleButton();
  };*/

  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {props.items ? (
          props.items.map((product, index) => (
            <Product product={product} key={index} />
          ))
        ) : (
          <p>Nothing was set</p>
        )}
      </div>
    </Fragment>
  );
};

export default Products;

/*<div className='product-box' key={product.product_id}>
<Link to={`/${product.product_id}`}>
  <img src={product.img_url} />
  <h2>{product.name}</h2>
</Link>
<h3>{product.description}</h3>
<h2>${product.price}</h2>
<div className='buttons'>
  <button onClick={() => addToCart(product.product_id)}>
    Add to cart
  </button>
  {button === false ? (
    ""
  ) : (
    <button onClick={() => removeFromCart(product.product_id)}>
      Remove from cart
    </button>
  )}
</div>
</div>*/
