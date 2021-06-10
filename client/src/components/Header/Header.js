import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount, selectCartCount } from "../../features/cartCountSlice";
import "./header.css";
import { Link } from "react-router-dom";
import store from "../../store/store";

const Header = (props) => {
  const state = store.getState();
  // const dispatch = useDispatch();
  // const cartCount = useSelector(selectCartCount);
  // const getCartCount = () => {
  //   console.log("header fetch called");
  //   return fetch("http://localhost:5000/count").then((res) => res.json());
  // };

  // // console.log(state);
  // useEffect(() => {
  //   let mounted = true;
  //   getCartCount().then((res) => {
  //     if (mounted) {
  //       dispatch(setCartCount(res[0].count));
  //     }
  //   });
  //   return () => (mounted = false);
  // }, [dispatch]);
  return (
    <div className='header'>
      <li className='header-list'>
        <Link to='/iphone'>
          <ul onClick={props.getIphones}>iPhone</ul>
        </Link>
        <Link to='/ipad'>
          <ul>iPad</ul>
        </Link>
        <Link to='/mac'>
          <ul>MacBook</ul>
        </Link>
        <Link to='/cart'>
          <ul onClick={props.getCart}>Cart ({props.cartCount})</ul>
        </Link>
      </li>
    </div>
  );
};

export default Header;
