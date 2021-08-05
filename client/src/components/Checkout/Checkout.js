import React from "react";
import "./checkout.css";
import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  return (
    <div>
      <StripeCheckout
        className='stripe-checkout'
        stripeKey=''
        token=''
        name=''
      />
    </div>
  );
};

export default Checkout;
