import React, { Fragment, useEffect, useState } from "react";
import Product from "../Product/Product";

import "./products.css";

const Ipad = (props) => {
  const [items, setItems] = useState("");

  useEffect(() => {
    let mounted = true;
    getIpads().then((res) => {
      if (mounted) {
        setItems(res);
      }
    });
    return () => (mounted = false);
  }, []);
  const getIpads = async () => {
    return fetch("/api/ipad").then((res) => res.json());
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
              isAuthenticated={props.isAuthenticated}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Fragment>
  );
};

export default Ipad;
