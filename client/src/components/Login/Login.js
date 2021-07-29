import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("login successful!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <div className='login-container'>
        <h1 className='login-header'>Login to view and edit your cart</h1>
        <div className='form-container-login'>
          <form onSubmit={onSubmitForm}>
            <input
              className='email-input-login'
              type='email'
              name='email'
              placeholder='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
            <input
              className='password-input-login'
              type='password'
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <button className='submit-button-login'>Submit</button>
          </form>
        </div>
        <p>Don't have an account?</p>
        <Link to='/register' className='register-link'>
          Register Here
        </Link>
      </div>
    </Fragment>
  );
};

export default Login;
