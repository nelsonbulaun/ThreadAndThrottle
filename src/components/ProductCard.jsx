import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


export const ProductCard = ({
  product,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { cart, dispatch } = useCart();

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

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % (product.images.length || 1)
        );
      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(intervalId);
  }, [isHovered, product.images.length]);

  return (
    <div
      className="relative rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/Threadandthrottle/products/${product.id}`}>
        <NonHoveredObject
          product={product}
          currentImageIndex={currentImageIndex}
        />
      </Link>
      <div>
        <div className="flex w-full justify-between">
          <div className="flex">
            <h5 className="ml-2 mt-2 text-gray-600 text-left text-xl">
              {" "}
              Size: {product.metadata.Size}{" "}
            </h5>
          </div>
          <div className="flex">
            <h5 className="mr-2 mt-2 text-gray-600 text-right text-xl">
              {" "}
              Brand: {product.metadata.Brand}{" "}
            </h5>
          </div>
        </div>

        <h2 className="mb-2 text-3xl">{product.name}</h2>
        {/* <button onClick={()=>addToCart(product.price_id, product.id, 1)}>
          add to cart
        </button> */}
      </div>
    </div>
  );
};

const NonHoveredObject = ({ product, currentImageIndex }) => {
  return (
    <div className="relative">
      <img
        className="relative overflow-hidden h-full object-fill bg-no-repeat rounded-lg"
        src={product?.images[currentImageIndex]}
      />
    </div>
  );
};
