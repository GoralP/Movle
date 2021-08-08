import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import slide_one from "../imgs/slide_1.png";
import slide_two from "../imgs/slide_2.png";
import slide_three from "../imgs/slide_3.png";
import slide_four from "../imgs/slide_4.png";
import slide_five from "../imgs/slide_5.png";
import movle_logo from "../imgs/login.png";

const items = [
  {
    src: slide_one,
    altText: "Slide 1 ",
    text: "WHERE MOVERS COME TO MINGLE",
    logo: movle_logo,
  },
  {
    src: slide_two,
    altText: "Slide 2",
    text: "BUYERS & SELLERS COMMUNICATE DIRECTLY",
  },
  {
    src: slide_three,
    altText: "Slide 3",
    text: "NO AGENT FEES",
  },
  {
    src: slide_four,
    altText: "Slide 4",
    text: "FIND YOUR PERFECT PROPERTY BEFORE THE MARKET",
  },
  {
    src: slide_five,
    altText: "Slide 5",
    text: "STEP BY STEP GUIDES",
  },
];

const Slider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="home-slider-image" src={item.src} alt={item.altText} />

        <span className="slider-text">
          <img src={item.logo} className="mr-1 slider-logo" alt="" />
          {item.text}
        </span>
        {/* <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
        dots={true}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Slider;
