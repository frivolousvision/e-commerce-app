import React from "react";
import { Link } from "react-router-dom";
import "./loginHeader.css";

const LoginHeader = () => {
  return (
    <div>
      <Link to='/login'>
        <p className='login-message'>
          Login to view and add items to your cart!
        </p>
      </Link>
    </div>
  );
};

export default LoginHeader;
