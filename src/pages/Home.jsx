import "../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../helpers";

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

  const render = () => {
    if (isLoading)
      return <span className="loading loading-spinner loading-md"></span>;
    return (
      <>
        <div className="w-full h-full ">
          <div className=" w-full flex-col justify-center place-content-center absolute ">
            {/* {itemslist.length > 0 ? (
              <div className="h-[50vh] -mt-[10vh] w-full relative top-0">
                <CarouselScratch itemslist={itemslist} />
              </div>
            ) : null} */}

            <div className="mt-20 m-5 z-100 relative">

             
            </div>
          </div>
        </div>
      </>
    );
  };
  return render();
};
export default Home;