import "../App.css";
import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, Loadingsign } from "../helpers";
const apisite = url + "/products/";
import { useAuth } from "../contexts/AuthContext";
import { ProductCard } from "../components/ProductCard";

// Product fields:
// "title, description, colour, type, size, price, imageurl, relateditems"
const Brands = () => {
  const { user } = useAuth();
  const [productList, setProductList] = useState([]);
  const [brands, setBrands] = useState();
  const [sizes, setSizes] = useState();
  const [types, setTypes] = useState();
  const [filteredList, setFilteredList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredObject, setHoveredObject] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredObject(index);
  };

  const handleMouseLeave = () => {
    setHoveredObject(null);
  };

  useEffect(() => {
    axios.get(apisite).then((res) => {
      setProductList(res.data);
      setTypes(Array.from(new Set(res.data?.map((product) => product.type))));
      setBrands(Array.from(new Set(res.data?.map((product) => product.brand))));
      setSizes(
        Array.from(
          new Set(
            res.data?.flatMap((product) =>
              product.size_stock_info.map((info) => info.size)
            )
          )
        )
      );
      setIsLoading(false);
    });
  }, []);

  const handleFilter = ({ filterType, filterVal }) => {
    const newFilteredList = productList.filter((product) => {
      if (filterType === "size_stock_info") {
        return product.size_stock_info.some((info) => info.size === filterVal);
      } else {
        return product[filterType] === filterVal;
      }
    });
    console.log(filterType);
    // const newFilteredList = productList.filter((product) => product[filterType] === filterVal);
    setFilteredList(newFilteredList.length > 0 ? newFilteredList : null);
  };

  const render = () => {
    if (isLoading)
      return <span className="loading loading-spinner loading-md"></span>;
    return (
      <div className="drawer-content glass overflow-y-scroll flex flex-col items-center justify-center">
        <div className="min-w-full min-h-full px-2">
          <div className="w-full grid grid-cols-3 gap-[2%]  py-2">
            {filteredList === null
              ? productList?.map((product, index) => (
                  <div key={index}>
                    <ProductCard
                      product={product}
                      isHovered={hoveredObject === index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                ))
              : filteredList?.map((product, index) => (
                  <div key={index}>
                    <ProductCard
                      product={product}
                      isHovered={hoveredObject === index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  };
  return render();
};

export default Brands;
