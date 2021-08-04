import { Link } from "react-router-dom";
import React from "react";
import iphones from "./iphones.jpeg";
import macbooks from "./macbooks.jpeg";
import ipads from "./ipads.jpeg";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className='home-container'>
      <Link to='/iphone'>
        <div className='image-container'>
          <img src={iphones} />
          <p className='icon-title'>iPhone</p>
        </div>
      </Link>
      <Link to='/mac'>
        <div className='image-container'>
          <img src={macbooks} />
          <p className='icon-title'>Macbook</p>
        </div>
      </Link>
      <Link to='/ipad'>
        <div className='image-container'>
          <img src={ipads} />
          <p className='icon-title'>iPad</p>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
