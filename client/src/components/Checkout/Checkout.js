import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../features/cartCountSlice";
import "./checkout.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const [user, setUser] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
      cartToOrder();
    }
  };

  const getCart = () => {
    try {
      let count;
      let total;
      let product;
      return fetch("http://localhost:5000/api/user-cart", {
        method: "GET",
        headers: { token: localStorage.token },
      })
        .then((res) => res.json())
        .then((res) => {
          product = res.product;
          count = res.count;
          total = res.total;
        })
        .then((res) => setCart(product))
        .then((res) => dispatch(setCartCount(count[0].count)))
        .then((res) => setTotal(total[0].sum));
    } catch (err) {
      console.error(err.message);
    }
  };
  const getUser = () => {
    try {
      fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: { token: localStorage.token },
      })
        .then((res) => res.json())
        .then((res) => setUser(res[0]));
    } catch (err) {
      console.error(err.message);
    }
  };

  const cartToOrder = () => {
    fetch("http://localhost:5000/cart-to-ordered", {
      method: "GET",
      headers: { token: localStorage.token },
    });
  };

  useEffect(() => {
    getCart();
    getUser();
    console.log(total);

    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: { token: localStorage.token },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  return (
    <div className='cart-content'>
      {user ? (
        <div>
          <p>
            <span className='user-info'>Name</span> {user.user_name}
          </p>
          <p>
            <span className='user-info'>Email</span> {user.user_email}
          </p>
        </div>
      ) : null}
      <div className='stripe-form'>
        <form onSubmit={handleSubmit}>
          <CardElement
            onChange={handleChange}
            className='stripe-checkout'
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000000",
                  "::placeholder": {
                    color: "#777777",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <p>
            <span className='user-info'>Total</span> ${total}
          </p>
          <button
            type='submit'
            className='pay-button'
            disabled={processing || disabled || succeeded}
          >
            Pay
          </button>
        </form>
      </div>
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
      {redirect ? <Redirect to='/ordered' /> : null}
    </div>
  );
};

export default Checkout;
