import React, { Fragment } from "react";
// import { Link } from "react-router-dom";

import "./products.css";
import Product from "../Product/Product";

const Products = (props) => {
  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {props.items ? (
          props.items.map((product, index) => (
            <Product
              product={product}
              key={index}
              getCartCount={props.getCartCount}
            />
          ))
        ) : (
          <p>Nothing was set</p>
        )}
      </div>
    </Fragment>
  );
};

export default Products;
