import React, { Fragment, useEffect, useState } from "react";
import Product from "../Product/Product";
// import { Link } from "react-router-dom";

import "./products.css";

const Iphone = (props) => {
  const [iphones, setIphones] = useState([]);
  useEffect(() => {
    const getIphones = async () => {
      try {
        const response = await fetch("http://localhost:5000/iphone");
        const jsonProducts = await response.json();
        setIphones(jsonProducts);
      } catch (err) {
        console.log(err.messsage);
      }
    };
    getIphones();
  }, [iphones]);
  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {iphones ? (
          iphones.map((product, index) => (
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

export default Iphone;
