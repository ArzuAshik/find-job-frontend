import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

export default function CheckoutForm({setPaymentSucceeded, amount}) {
    console.log(amount);
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
  };

  const handleSubmit = async ev => {
    ev.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    });
    if(!error) {
        try{
            const {id} = paymentMethod;
            const res = await fetch("https://find-job-server.herokuapp.com/payment", {
                  method: "POST",
                  body: JSON.stringify({
                      amount: parseInt(amount) * 100,
                      id
                  }),
                  headers: { "Content-type": "application/json; charset=UTF-8" }
              });
            const result = await res.json();
            console.log(result);
              if(result.status === "success"){
                setPaymentSucceeded(true);
              }
        }catch (error) {
          console.log(error);
        }
    } else{
        console.log(error);
    }
  };


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button>SignUp</button>
    </form>
  );
}
