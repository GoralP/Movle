import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";

import { FaRegClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { howTo } from "../redux/actions";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 320 },
    items: 1,
  },
};

const BlogSlider = () => {
  const dispatch = useDispatch();

  const { loading, howToData } = useSelector((state) => ({
    loading: state.howToReducers.howTod.loading,
    howToData: state.howToReducers.howTod.howToData,
  }));

  useEffect(() => {
    dispatch(howTo());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Carousel responsive={responsive} infinite autoPlaySpeed={1000}>
          {howToData !== null &&
            howToData.LatestBlog.map((item, index) => (
              <div key={index} className="slide-item  ">
                <div className=" blog-box border">
                  <div>
                    <img
                      src={item.blog_img}
                      className="blog-slider-image"
                      alt=""
                    />
                  </div>
                  <div className="blog-item">
                    <p>
                      <FaRegClock className="text-danger mr-2" />
                      <span className="blog-date">{item.add_date}</span>
                    </p>
                    <p className="dramatically-leverage">{item.title}</p>
                    <p className="Credibly line-clamp">
                      {item.desc.substring(0, 80) + "..."}
                    </p>
                    <button className="read-more-button">READ MORE</button>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default BlogSlider;
