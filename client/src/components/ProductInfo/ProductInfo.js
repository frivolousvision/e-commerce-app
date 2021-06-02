import { Fragment, useState, useEffect } from "react";

const ProductInfo = ({ match }) => {
  const [product, setProduct] = useState("");
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    const product = await fetch(`http://localhost:5000/${match.params.id}`);
    const jsonProduct = await product.json();
    setProduct(jsonProduct);
  };
  const addToCart = async (id) => {
    fetch(`http://localhost:5000/addtocart/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };
  const removeFromCart = async (id) => {
    fetch(`http://localhost:5000/removefromcart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Fragment>
      <div className='product-list'>
        {product ? (
          product.map((productInfo) => (
            <div className='product-box' key={productInfo.product_id}>
              <img src={productInfo.img_url} />
              <h2>{productInfo.name}</h2>
              <h3>{productInfo.description}</h3>
              <h2>${productInfo.price}</h2>
              <div className='buttons'>
                <button onClick={() => addToCart(product.product_id)}>
                  Add to cart
                </button>
                {productInfo.in_cart === true ? (
                  <button onClick={() => removeFromCart(product.product_id)}>
                    Remove from cart
                  </button>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <p>Nothing was set</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductInfo;
