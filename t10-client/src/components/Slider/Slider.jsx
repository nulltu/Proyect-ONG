/* eslint-disable react/prop-types */

import React from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import './Slider.css';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = ({ slides }) => (
  <Swiper
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
  >
    {slides.map((slide) => (
      <SwiperSlide className="swipeContainer" key={slide.id}>
        <img className="swipeImage" src={slide.image} alt={slide.description} />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Slider;
