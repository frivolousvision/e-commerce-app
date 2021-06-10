import React, { Fragment, useEffect, useState } from "react";

import Product from "../Product/Product";
// import { Link } from "react-router-dom";

import "./products.css";

const Mac = (props) => {
  const [items, setItems] = useState("");

  useEffect(() => {
    let mounted = true;
    getMacs().then((res) => {
      if (mounted) {
        setItems(res);
      }
    });
    return () => (mounted = false);
  }, []);
  const getMacs = () => {
    return fetch("http://localhost:5000/mac").then((res) => res.json());
  };

  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {items ? (
          items.map((product, index) => (
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

export default Mac;
