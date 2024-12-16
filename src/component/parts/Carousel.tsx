import React from "react";
import Slider from "react-slick";

function Carousel() {
  const settings = {
    className: "",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="slider-container h-[150px]">
      <Slider {...settings}>
        <div className="h-[150px] bg-cyan-400">
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
          <p>Hello</p>
        </div>
        <div>
          <h3>3</h3>
          <p>See ....</p>
          <p>Height is adaptive</p>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
