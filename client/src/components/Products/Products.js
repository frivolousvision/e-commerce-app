import React, { Fragment, useState, useEffect } from "react";

import "./products.css";
import Product from "../Product/Product";

const Products = (props) => {
  const [items, setItems] = useState("");
  useEffect(() => {
    let mounted = true;
    allProducts().then((res) => {
      if (mounted) {
        setItems(res);
      }
    });
    return () => (mounted = false);
  }, []);

  const allProducts = () => {
    return fetch("http://localhost:5000/products").then((res) => res.json());
  };

  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {items ? (
          items.map((product, index) => (
            <Product product={product} key={index} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Fragment>
  );
};

export default Products;
