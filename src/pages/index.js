import * as React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForms";
import { graphql, StaticQuery, useStaticQuery } from "gatsby";
const IndexPage = () => {
  console.log("data", data);
  const stripePromise = loadStripe(
    "pk_test_51JagUeCE3jhPVdWsoteTE4pfDQIJM4JKBckIVik3rU9BVus94QFc0LIRvGrzBF8LdcEzzpmsKHYQWpELoikvuh9c00kUrZR3iV"
  );
  return (
    <main>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </main>
  );
};

export default IndexPage;
