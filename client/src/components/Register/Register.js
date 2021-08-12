import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const guestCartToUserCart = () => {
    try {
      fetch("/guest-cart-to-user-cart", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      setTimeout(() => {
        try {
          fetch("/clear-guest-cart").then((res) => console.log("cleared"));
        } catch (err) {
          console.error(err.message);
        }
      }, 3000);
    } catch (err) {
      console.error(err.message);
    }
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success(`Registered Succesfully!`);
        guestCartToUserCart();
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className='register-container'>
        <h1 className='login-header'>Welcome, sign up here!</h1>
        <div className='form-container'>
          <form onSubmit={onSubmitForm}>
            <input
              type='email'
              name='email'
              placeholder='email'
              className='email-input'
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              className='password-input'
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='text'
              name='name'
              placeholder='name'
              className='name-input'
              value={name}
              onChange={(e) => handleChange(e)}
            />
            <button className='submit-button'>Submit</button>
          </form>
        </div>
        <p>Already have an account?</p>
        <Link to='/login' className='login-link'>
          Login Here
        </Link>
      </div>
    </Fragment>
  );
};

export default Register;
