import "../App.css";
import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, Loadingsign } from "../helpers";
const apisite = url + "/stripe/products/";
import { useAuth } from "../contexts/AuthContext";
import { ProductCard } from "../components/ProductCard";

// Product fields:
// "title, description, colour, type, size, price, imageurl, relateditems"
const ProductList = () => {
  const { user } = useAuth();
  const [productList, setProductList] = useState([]);
  const [brands, setBrands] = useState();
  // const [sizes, setSizes] = useState();
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
      setTypes(Array.from(new Set(res.data?.map((product) => product.metadata.Type))));
      setBrands(Array.from(new Set(res.data?.map((product) => product.metadata.Brand))));
      
      // setSizes(
      //   Array.from(
      //     new Set(
      //       res.data?.flatMap((product) =>
      //         product.size_stock_info.map((info) => info.size)
      //       )
      //     )
      //   )
      // );
      setIsLoading(false);
    });
  }, []);

  const handleFilter = ({ filterType, filterVal }) => {
    const newFilteredList = productList.filter((product) => {
      if (filterType === "size_stock_info") {
        return product.size_stock_info.some((info) => info.size === filterVal);
      } else {
        return product.metadata[filterType] === filterVal;
      }
    });
    console.log(filterType);
    console.log(filterVal);
    // const newFilteredList = productList.filter((product) => product[filterType] === filterVal);
    setFilteredList(newFilteredList.length > 0 ? newFilteredList : null);
  };

  const render = () => {
    if (isLoading)
      return <span className="loading loading-spinner loading-md"></span>;
    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content glass overflow-y-hidden flex flex-col items-center justify-center">
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
        <div className="drawer-side sidebarText menu min-h-full min-w-[15vw]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div>
            <h2 className="text-3xl pr-8 pl-2 pt-2 mb-0">Filters:</h2>
            <li
              className="bg-transparent p-0 mt-0 w-fit"
              onClick={() => setFilteredList(null)}
            >
              <h2 className="text-grey-600">Clear Filters</h2>
            </li>
          </div>
          <div className="text-left p-2">
            <h2 className="text-2xl">Brands:</h2>
            <ul className="text-xl px-3">
              {brands?.map((brand, index) => (
                <li
                  className="px-1 w-fit"
                  key={index}
                  onClick={() =>
                    handleFilter({ filterType: "Brand", filterVal: brand })
                  }
                >
                  <a className="p-0" href="#" value={brand}>
                    {brand}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl">Type:</h2>
            <ul className="text-xl px-3">
              {types?.map((type, index) => (
                <li
                  className="px-1 w-fit"
                  key={index}
                  onClick={() =>
                    handleFilter({ filterType: "Type", filterVal: type })
                  }
                >
                  <a className="p-0" href="#" value={type}>
                    {type}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl">Sizes:</h2>
            {/* <ul className="text-xl px-3">
              {sizes?.map((size, index) => (
                <li
                  className="px-1 w-fit"
                  key={index}
                  onClick={() =>
                    handleFilter({
                      filterType: "size_stock_info",
                      filterVal: size,
                    })
                  }
                >
                  <a className="p-0" href="#" value={size}>
                    {size}
                  </a>
                </li>
              ))}
            </ul> */}
            <h2 className="text-2xl">Types:</h2>
            <ul className="text-xl px-3">
              {types?.map((type, index) => (
                <li
                  className="px-1 w-fit"
                  key={index}
                  onClick={() =>
                    handleFilter({ filterType: "Type", filterVal: type })
                  }
                >
                  <a className="p-0" href="#" value={type}>
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  return render();
};

export default ProductList;
