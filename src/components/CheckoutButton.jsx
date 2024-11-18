// CheckoutButton.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QHt3wBumH5WyZE7ZyJV31mD4gApYIasT3lzKEm9azOp8Ld3kIyjqPl6tfWP3BAFV78v2B3oW35DyLvJk485r0w900FhjfcJIG"
);

const CheckoutButton = ({ cart_items }) => {
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:8000/api/stripe/create-checkout-session/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_items: cart_items }),
      }
    );
    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <button
      className="place-self-center bg-transparent text-[#242424]"
      onClick={handleClick}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
