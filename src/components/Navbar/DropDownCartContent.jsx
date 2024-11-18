import React from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

import { useEffect, useState } from "react";
import "../../index.css";
import { url } from "../../helpers";
const apisite = url + "/stripe/product/";

export function Findkey(props) {
  const [item, setItem] = useState();
  const [cost, setCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useAuth();
  const token = localStorage.getItem("access_token");
  const { dispatch } = useCart();

  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        product_id: productId,
      },
    });
  };

  useEffect(() => {
    axios.get(apisite + props.pid).then((res) => {
      const item = res.data;
      setItem(item);
      setCost(item.price * props.quantity);
      setIsLoading(false);
    });
  }, [props.pid]);

  const render = () => {
    if (isLoading)
      return (
        <div className="flex h-[6rem] w-full m-2">
          <div className="skeleton h-full w-1/4"></div>
          <div className="flex h-full flex-col w-full gap-3">
            <div className="skeleton h-6 w-3/4"></div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-3/4"></div>

          </div>
        </div>
      );
    return (
      <div className="flex items-center border-t border-gray-200">
        <div className="w-1/4">
          <img
            className="w-full h-full object-center object-cover"
            src={item.images[0]}
          />
        </div>
        <div className="md:w-3/4 m-1 h-full">
          <p className="text-base font-black leading-none text-gray-800">
            {item.name}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            {item.metadata.Size}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            Amount in Cart: {props.quantity}
          </p>
          <p className="text-xs leading-3 text-gray-600 pt-2">
            ${parseFloat(item.amount / 100)} {item.currency.toUpperCase()}
          </p>
        </div>
        <div className="flex justify-center place-items-center w-full">
          <button
            className="bg-transparent text-[#242424] p-1 m-1"
            onClick={() => removeFromCart(props.pid)}
          >
            x
          </button>
        </div>
      </div>
    );
  };
  return render();
}

export default function CartDropdownFull() {
  const { cart, dispatch } = useCart();


  if (cart) {
    return (
      <div>
        {Array.isArray(cart) &&
          cart?.map((product, index) => (
            <div className="px-1" key={index}>
              <Findkey
                pid={product.product_id}
            
                quantity={product.quantity}
              />
            </div>
          ))}
      </div>
    );
  } else {
    return <div>empty</div>;
  }
}
