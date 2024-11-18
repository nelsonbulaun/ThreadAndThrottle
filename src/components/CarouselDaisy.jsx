import React from "react";

const Carousel = ({ items }) => {
  return (
    <div className="carousel w-full">
      {items.map((item, index) => (
        <div
          key={item.id}
          id={`slide${index + 1}`}
          className="carousel-item relative w-full"
        >
          <img src={item.imageUrl} className="w-full" alt={`Slide ${index + 1}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${index === 0 ? items.length : index}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${(index + 1) % items.length === 0 ? 1 : index + 2}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
