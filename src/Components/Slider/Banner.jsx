import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import UiBanner from "./UiBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    fetch("/banner.json")
      .then((res) => res.json())
      .then((data) => setBannerData(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false
  };

  return (
    <div className="mb-10">
      <Slider {...settings}>
        {bannerData.map((item) => (
          <UiBanner key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
