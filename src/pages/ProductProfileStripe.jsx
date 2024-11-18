import "../App.css";
import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../helpers";
const apisite = url + "/stripe/product/";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

// Product fields:
// "title, description, colour, type, size, price, imageurl, relateditems"
const ProductPage = () => {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const { cart, dispatch } = useCart();
  const [item, setItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState();
  const [selectedStock, setSelectedStock] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios.get(apisite + id).then((res) => {
      const item = res.data;
      setQuantity(
        Array.from({ length: item.quantity + 1 }, (_, index) => index)
      );
      setItem(item);
    //   setSelectedSize(item.size_stock_info[0].size);
      setSelectedStock(parseInt(item.metadata.Stock));
      // setPrice(item.price.amount);
      setIsLoading(false);

      console.log(res.data);
    });
  }, [id]);

  const addToCart = (priceId, productId, quantity) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        price_id: priceId,
        product_id: productId,
        quantity: quantity,
      },
    });
  };


  const options = Array.from(
    { length: selectedStock + 1 },
    (_, index) => index
  );

  const render = () => {
    if (isLoading)
      return <span className="skeleton h-[80%] w-[80%]"></span>;

    return (
      <div className="w-min-full px-2">
        <div className="w-full m-6 grid grid-cols-2 gap-[2%]">
          <div className="flex flex-col h-fit col-span-1 items-center justify-center">
              <img
                className="m-6 aspect-auto h-[32rem] rounded-md overflow-x-hidden shadow-xl"
                src={item.images[currentImageIndex]}
              />

            <div className="h-32 aspect-auto flex flex-row gap-x-2 overflow-x-hidden">
              {item.images?.map((link, index) => (
                <img onClick={()=>{setCurrentImageIndex(index)}} className={currentImageIndex === index ? "h-32 aspect-auto border-2" : "h-32 aspect-auto"} key={index} src={item.images[index]} />
              ))}
            </div>
          </div>
          <div className="flex text-left col-span-1 ">
            <div className="mb-2 h-full text-xl font-medium rounded-tl-lg px-2 mt-2">
              <div>
                <h3 className="text-grey-400 text-md mb-0">
                  Brand: {item.metadata.Brand}
                </h3>
                <div className="flex flex-row items-center">
                  <h1 className="text-[30px]">{item.name}</h1>
                </div>
                <div className="flex-col">
                  <p className="mb-4 text-base  ">${parseFloat(item.amount / 100)} {item.currency.toUpperCase()}</p>
                  <p className="mb-4 text-base  ">Category: {item.metadata.Type}</p>
                  <p className="mb-4 text-base ">Colour: {item.metadata.Colour}</p>
                  <div>
                    <p className="text-base  ">Size: {item.metadata.Size}</p>

                    {/* <div className="flex gap-x-0.5">
                      {item.size_stock_info.map((sizeInfo, index) => (
                        <button
                          value={sizeInfo}
                          onClick={() => handleSize(sizeInfo)}
                          className={
                            sizeInfo.size !== selectedSize
                              ? "p-2 text-sm"
                              : "bg-transparent border-inherit p-2 text-sm btn-disabled"
                          }
                          key={index}
                        >
                          {sizeInfo.size}
                        </button>
                      ))}
                    </div> */}
                  </div>

                  <p className="mb-4 text-base  ">
                    Availability:{" "}
                    {selectedStock > 0 ? (
                      <p className="mb-4 text-base text-green-600 ">
                        {selectedStock} in stock
                      </p>
                    ) : (
                      <p className="mb-4 text-base text-red-600 ">
                        Item is out of stock
                      </p>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-3 w-full">
                  <div className="flex justify-center w-full">
                    <select
                      id="quantitySelect"
                      className="w-full text-center text-white rounded bg-[#1a1a1a]"
                      name="quantity"
                      onChange={(event) =>
                        setSelectedQuantity(event.target.value)
                      }
                    >
                      {options.map((item) => (
                        <option className="text-white" key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-4">
                    <button
                      className="font-bold rounded w-full"
                      onClick={() => addToCart(item.price_id, id, parseInt(selectedQuantity))}
                    >
                      {" "}
                      ADD TO CART{" "}
                    </button>
                  </div>
                </div>
              </div>
              {item.category != null ? (
                <>
                  <p className="mb-4 text-base ">Category: {item.metadata.Type}</p>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="text-left m-6 px-2 mt-2">
          <div className=" rounded-tl-lg">
            {" "}
            <h2 className="OriginSans text-3xl border-t-2 rounded-t-md ">
              Description
            </h2>{" "}
          </div>

          <p className="tracking-wide mb-4 text-base  ">{item.description}</p>
        </div>
      </div>
    );
  };
  return render();
};

export default ProductPage;
