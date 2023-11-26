import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const stripePromise = loadStripe(
  "pk_test_51O7sPoATKMOwGEo98ZHefcNZQ1MNdOfqjXVFTKSIugudxlQegzcqwevT45Bh1rtQLu8DSdakiUNk1k558oCiyAs000MQnpNp8b"
);
const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default StripeContainer;
