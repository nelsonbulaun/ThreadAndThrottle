import { Link } from "react-router-dom";

export const SplitScreen = (props) => {
  return (
    <div className="h-full w-full">
      <div className="divider pt-0 mt-0" />

      <div className="h-[90vh] w-full flex justify-center items-center relative -top-20">
        <div className="h-[50vh] w-[65vw] justify-center flex  items-center relative shadow-lg rounded-md">
          <div className="h-full container shadow-sm grid grid-cols-2 justify-center items-center rounded-l-lg">
            <div
              className="h-[50vh] w-full relative rounded-l-lg"
              style={{
                backgroundImage: `url(${props.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: "0.5rem",
              }}
            >
              <div className="absolute inset-0 opacity-50 rounded-l-lg"></div>
            
            </div>
            <div className="basis-1/2 rounded-r-lg shadow-sm flex flex-col sm:py-12 items-center bg-blockbuster-yellow h-full justify-center relative">
              <div className="justify-start flex flex-col">
                <div className="text-left pb-3">
                  <h1 className="secondaryTitle  text-[#1b4796] text-3xl">
                    {props.title}
                  </h1>
                  {props.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
