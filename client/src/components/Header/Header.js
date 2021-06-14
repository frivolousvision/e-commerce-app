import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, setCartCount } from "../../features/cartCountSlice";
import "./header.css";
import { Link } from "react-router-dom";
import appleLogo from "./apple-white.png";

const Header = (props) => {
  //Redux Variables
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  //Fetches total items in cart
  const loadCart = () => {
    return fetch("http://localhost:5000/count").then((res) => res.json());
  };

  //Renders total items in cart
  useEffect(() => {
    let mounted = true;
    loadCart().then((res) => {
      if (mounted) {
        dispatch(setCartCount(res[0].count));
      }
    });
    return () => (mounted = false);
  }, [dispatch]);

  return (
    <>
      <div className='header'>
        <li className='header-list'>
          <Link to='/'>
            <img src={appleLogo} alt='' className='logo' />
          </Link>
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
            <ul>Cart ({cartCount})</ul>
          </Link>
        </li>
      </div>
    </>
  );
};

export default Header;
