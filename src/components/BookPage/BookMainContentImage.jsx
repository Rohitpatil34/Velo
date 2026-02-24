import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BookMainContentImage = ({ venue }) => {
  const images = venue.images?.length
    ? venue.images
    : ["https://via.placeholder.com/800"];

  return (
    <div className="hidden w-full md:block md:col-span-2 md:row-span-1 bg-surface/50 backdrop-blur-lg rounded-md">
      <div className="overflow-hidden aspect-video rounded-md w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          style={{
            "--swiper-pagination-color": "#00B562",
            "--swiper-navigation-color": "#ffffff",
          }}
          className="rounded-md"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-video w-full">
                <img
                  src={img}
                  alt={venue.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookMainContentImage;