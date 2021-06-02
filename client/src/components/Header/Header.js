import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className='header'>
      <li className='header-list'>
        <Link to='/iphone'>
          <ul onClick={props.getIphones}>iPhone</ul>
        </Link>
        <Link to='/ipad'>
          <ul onClick={props.getIpads}>iPad</ul>
        </Link>
        <Link to='/mac'>
          <ul onClick={props.getMacs}>MacBook</ul>
        </Link>
        <Link to='/cart'>
          <ul onClick={props.getCart}>Cart ({props.cartCount})</ul>
        </Link>
      </li>
    </div>
  );
};

export default Header;
