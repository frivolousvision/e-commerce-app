import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount } from "../../features/cartCountSlice";
import {
  setCartFalse,
  setCartTrue,
  selectInCart,
} from "../../features/inCartSlice";
import "../Products/products.css";

const ProductInfo = ({ match }) => {
  const dispatch = useDispatch();
  const inCart = useSelector(selectInCart);
  const [product, setProduct] = useState("");

  //Loads individual product on render
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:5000/${match.params.id}`);
      const jsonProduct = await response.json();
      setProduct(jsonProduct);
    };
    getProduct();
  }, [match.params.id]);

  const addToCart = (id) => {
    dispatch(setCartTrue());
    fetch(`http://localhost:5000/addtocart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)));
  };
  const removeFromCart = (id) => {
    dispatch(setCartFalse());
    fetch(`http://localhost:5000/removefromcart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)));
  };

  return (
    <Fragment>
      <div className='top'></div>
      <div className='product-list'>
        {product ? (
          product.map((productInfo) => (
            <div className='product-box' key={productInfo.product_id}>
              <img src={productInfo.img_url} alt='' />
              <h2>{productInfo.name}</h2>
              <h3>{productInfo.description}</h3>
              <h2>${productInfo.price}</h2>
              <div className='buttons'>
                <button onClick={() => addToCart(productInfo.product_id)}>
                  Add to cart
                </button>
                {inCart ? (
                  <button
                    onClick={() => removeFromCart(productInfo.product_id)}
                  >
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
