import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount, selectCartCount } from "../../features/cartCountSlice";
import "./header.css";
import { Link } from "react-router-dom";
import store from "../../store/store";

const Header = (props) => {
  const state = store.getState();

  return (
    <div className='header'>
      <li className='header-list'>
        <Link to='/iphone'>
          <ul>iPhone</ul>
        </Link>
        <Link to='/ipad'>
          <ul>iPad</ul>
        </Link>
        <Link to='/mac'>
          <ul>MacBook</ul>
        </Link>
        <Link to='/cart'>
          <ul>Cart ({state.cartCount})</ul>
        </Link>
      </li>
    </div>
  );
};

export default Header;
