import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Carticon } from "../../assets/cart.svg";
import CartDropdownFull from "./DropDownCartContent";
import React from "react";
import "../../index.css";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import CheckoutButton from "../CheckoutButton";

function DropdownCart({ isOpen, onClose }) {
  const { cart } = useCart();
  const { user } = useAuth();
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access_token");


  // const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    console.log(user);
    setCartQuantity(cart.reduce((total, item) => total + item.quantity, 0));
    setTotalPrice(user?.totalPrice);
    setIsLoading(false);
  }, [cart, user]);

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex flex-row bg-transparent"
        type="button"
        onClick={() => isOpen && onClose()}
      >
        <div className="indicator mx-2 icon">
          <Carticon style={{ color: "var(--logo-color)" }} />
          {isLoading ? (
            <span className="loading loading-spinner loading-md justify-self-center self-center" />
          ) : (
            <span id="badge" className="badge badge-sm indicator-item">
              {cartQuantity}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div
          id="cartDropdown"
          className="absolute right-0 z-[100]  mt-2 w-80 rounded-sm   shadow-lg bg-white "
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              id="cartDropdown"
              role="menuitem"
              className="flex justify-between"
            >
              <a className="px-4 py-2 w-fit text-sm 0">In Your Cart</a>
              <a className="px-4 py-2 w-fit text-sm ">${totalPrice}</a>
            </div>
            <div role="menuitem">
              <CartDropdownFull />
            </div>
            <div className="w-full flex place-items-center">

            <CheckoutButton cart_items = {cart}/>
            </div>
            {/* <a
              // to="cart"
              className="block px-4 py-2 text-sm  text-center "
              role="menuitem"
            >
              Check-Out
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownCart;
