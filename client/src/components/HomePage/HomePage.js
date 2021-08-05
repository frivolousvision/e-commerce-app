import { Link } from "react-router-dom";
import React from "react";
import iphones from "./iphones.jpeg";
import macbooks from "./macbooks.jpeg";
import ipads from "./ipads.jpeg";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className='home-container'>
      <div className='image-container'>
        <Link to='/iphone'>
          <img src={iphones} />
          <p className='icon-title'>iPhone</p>
        </Link>
      </div>
      <div className='image-container'>
        <Link to='/mac'>
          <img src={macbooks} />
          <p className='icon-title'>Macbook</p>
        </Link>
      </div>
      <div className='image-container'>
        <Link to='/ipad'>
          <img src={ipads} />
          <p className='icon-title'>iPad</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
