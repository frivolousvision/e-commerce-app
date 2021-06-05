import React, { Fragment, useEffect, useState } from "react";
import Product from "../Product/Product";
// import { Link } from "react-router-dom";

import "./products.css";

const Mac = (props) => {
  const [items, setItems] = useState(props.items);
  useEffect(() => {
    const getIphones = async () => {
      try {
        const response = await fetch("http://localhost:5000/mac");
        const jsonProducts = await response.json();
        setItems(jsonProducts);
      } catch (err) {
        console.log(err.messsage);
      }
    };
    getIphones();
  }, []);

  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {items ? (
          items.map((product, index) => (
            <Product product={product} key={index} />
          ))
        ) : (
          <p>Nothing was set</p>
        )}
      </div>
    </Fragment>
  );
};

export default Mac;
