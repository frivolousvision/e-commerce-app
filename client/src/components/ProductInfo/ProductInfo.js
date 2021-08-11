import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../features/cartCountSlice";
import { setCartFalse, setCartTrue } from "../../features/inCartSlice";
import "../Products/products.css";

const ProductInfo = ({ match, isAuthenticated }) => {
  const dispatch = useDispatch();
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
    // console.log(product);
  }, []);

  const addToCart = (id) => {
    let localStorageCart = [];
    //If user isn't logged in, add items in local storage to cart
    if (!localStorage.token) {
      fetch(`/add-to-cart-guest/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())

        .then((res) => dispatch(setCartCount(res[0].sum)));
    }
    //If user is logged in
    if (localStorage.token) {
      dispatch(setCartTrue());
      fetch(`/add-to-cart-user/${id}`, {
        method: "GET",
        headers: { token: localStorage.token },
      })
        .then((res) => res.json())

        .then((res) => dispatch(setCartCount(res[0].sum)));
    }
    setButton(true);
    setTimeout(() => setButton(false), 1000);
  };
  const removeFromCart = (id) => {
    let count;
    dispatch(setCartFalse());
    fetch(`removefromcart/${id}`, {
      method: "GET",
      headers: { token: localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        count = res.count;
      })
      .then((res) => dispatch(setCartCount(count[0].sum)));
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
                  <button className='add-to-cart-action buttons'>
                    Added to cart!
                  </button>
                ) : (
                  <button
                    className='buttons'
                    onClick={() => addToCart(productInfo.product_id)}
                  >
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
          <p>Sorry, looks like this page doesn't exist</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductInfo;
