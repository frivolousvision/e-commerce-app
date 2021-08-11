import React from "react";
import { Link } from "react-router-dom";
import "./disclaimer.css";

const Disclaimer = () => {
  return (
    <div className='message-container'>
      <p>You must be logged in to check out!</p>
      <Link to='/login'>Login</Link>
      <p>Don't have an account?</p>
      <Link to='/register'>Register Here</Link>
    </div>
  );
};

export default Disclaimer;
