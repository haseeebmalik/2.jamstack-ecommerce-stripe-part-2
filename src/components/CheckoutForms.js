import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements,useStripe } from "@stripe/react-stripe-js";
import * as React from "react";
import "./CheckoutForm.css";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const CheckoutForm = () => {
    const stripe=useStripe()
    const elements=useElements()
  //   const stripePromise = loadStripe(
  //     "pk_test_51JagUeCE3jhPVdWsoteTE4pfDQIJM4JKBckIVik3rU9BVus94QFc0LIRvGrzBF8LdcEzzpmsKHYQWpELoikvuh9c00kUrZR3iV"
  //   );
  const checkOutSubmit = async () => {
    const response = await fetch("/.netlify/functions/checkout", {
      method: "post",
    });
    const data = await response.json();
    console.log("dataa", data);

    const result=await stripe.confirmCardPayment(data.client_secret,{
        payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: 'Jenny Rosen',
            },
          }
    })
    console.log("result",result)
  };
  return (
    <main>
      checkout form
      {/* <CardElement options={CARD_ELEMENT_OPTIONS} /> */}
      {/*instead of writing all in one row wee can distribute in in multiple fields */}
      <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
      <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
      <div>
        <button onClick={checkOutSubmit}>checkout</button>
      </div>
    </main>
  );
};

export default CheckoutForm;
