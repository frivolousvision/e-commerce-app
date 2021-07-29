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
  // const inCart = useSelector(selectInCart);
  const [product, setProduct] = useState("");
  const [button, setButton] = useState("");

  //Loads individual product on render
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`api/${match.params.id}`);
      const jsonProduct = await response.json();
      setProduct(jsonProduct);
    };
    getProduct();
    console.log(product);
  }, [match.params.id]);

  const addToCart = (id) => {
    dispatch(setCartTrue());
    fetch(`/addtocart/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch(setCartCount(res[0].count)));
    setButton(true);
    setTimeout(() => setButton(false), 1000);
  };
  const removeFromCart = (id) => {
    let count;
    dispatch(setCartFalse());
    fetch(`removefromcart/${id}`)
      .then((res) => res.json())
      .then((res) => {
        count = res.count;
      })
      .then((res) => dispatch(setCartCount(count[0].count)));
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
                {button ? (
                  <button className='add-to-cart-action'>Added to cart!</button>
                ) : (
                  <button onClick={() => addToCart(productInfo.product_id)}>
                    Add to cart
                  </button>
                )}
                {/* {inCart ? (
                  <button
                    className='remove-from-cart-button'
                    onClick={() => removeFromCart(productInfo.product_id)}
                  >
                    Remove from cart
                  </button>
                ) : null} */}
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
