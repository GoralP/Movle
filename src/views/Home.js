import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Navigation,
  Slider,
  BlogSlider,
  Footer,
  Range,
  FaqAccord,
  BedRange,
} from "../components";

import { FaMapMarkerAlt, FaBed, FaBath, FaArrowsAltV } from "react-icons/fa";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { howTo } from "../redux/actions";
import defaultImage from "../imgs/default_house_image.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
        // <Container>
        //   <Box>{children}</Box>
        // </Container>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function activeTab(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Home = () => {
  const [value, setValue] = useState(0);
  const [formData, updateFormData] = useState("");
  // const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInput = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    localStorage.setItem("searchData", JSON.stringify(formData));
  };

  const handleChangeRangeSlider = async (valuearr, key1, key2) => {
    console.log("handleChange", key1, valuearr[0], "  ", valuearr[1], key2);
    await Promise.resolve(
      updateFormData({
        ...formData,
        [key1]: valuearr[0],
        [key2]: valuearr[1],
      })
    );
    console.log("formData", formData);
    localStorage.setItem("searchData", JSON.stringify(formData));
  };

  var propertyType = "";
  const handleChangeCheckbox = (e) => {
    if (checkboxval !== "") {
      propertyType =
        formData && formData[e.target.name] !== undefined
          ? formData[e.target.name]
          : "";
      var checkboxval = e.target.value.trim() + ",";

      if (e.target.checked === true) {
        propertyType += checkboxval;
      } else {
        propertyType = propertyType.replace(checkboxval, "");
      }

      updateFormData({
        ...formData,
        [e.target.name]: propertyType,
      });
      localStorage.setItem("searchData", JSON.stringify(formData));
    }
  };

  const dispatch = useDispatch();

  const { loading, howToData } = useSelector((state) => ({
    loading: state.howToReducers.howTod.loading,
    howToData: state.howToReducers.howTod.howToData,
  }));

  useEffect(() => {
    dispatch(howTo());
  }, [dispatch]);

  const onSubmit = (e) => {
    localStorage.setItem("searchData", JSON.stringify(formData));
    e.preventDefault();
    // console.log("form", formData);
  };

  return (
    <div className="container-fluid">
      <Navigation />
      <Slider />
      <section className="main-criteria-bg">
        <div className="container">
          <div className="row px ">
            <div className="col-sm-4 ">
              <div>
                <p className="recent-search">SAVED / RECENT SEARCHES</p>
                <div className="line"></div>
              </div>
              <div className="white-box white-box-shadow home-box">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  howToData !== null &&
                  howToData.Result.map((item, index) => (
                    <div key={index}>
                      <div
                        className="white-box-inner white-box-shadow"
                        style={{ cursor: "pointer" }}
                      >
                        <Link to="/propertydetails">
                          <img
                            src={
                              item.front_house_img
                                ? item.front_house_img
                                : defaultImage
                            }
                            className="waterfront-image"
                            alt="waterfront"
                          />
                        </Link>
                        <div className="px-10">
                          <div className="facility-line">
                            <span className="beautiful-waterfront-title">
                              {item.name}
                              <br></br>
                            </span>
                            <span className="text-secondary waterfront-content">
                              <FaMapMarkerAlt className="icon-location"></FaMapMarkerAlt>
                              {item.location}
                            </span>
                          </div>

                          <div className="row list-property-address py-2">
                            <div className="col-4">
                              <FaBed className="mr-1" />
                              {item.bedrooms} Beds
                            </div>
                            <div className="col-4">
                              <FaBath className="mr-1" />
                              {item.bathrooms} Baths
                            </div>
                            <div className="col-4">
                              <FaArrowsAltV />
                              {item.area} Sq Ft
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="col-sm-8 critarea">
              <div>
                <p className="recent-search">MAIN CRITERIA</p>
                <div className="line"></div>
              </div>
              {/* <div className="white-box white-box-shadow home-box">
                <form>
                  <div className="form-row">
                    <div className="col-sm-6 px-3">
                      <label className="your-location-title">
                        Your Location
                      </label>
                      <br></br>
                      <input
                        type="text"
                        name="location"
                        placeholder="Your Location"
                        className="criteria-input"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="col-sm-6 px-3">
                      <label className="your-location-title">No. Beds</label>
                      <br></br>
                      <input
                        type="text"
                        name="bedrooms"
                        placeholder="No. Beds"
                        className="criteria-input"
                        onChange={handleChangeInput}
                      />
                    </div>
                  </div>
                  <div className="form-row type-of-property">
                    <div className="col-sm-6 px-3">
                      <label className="your-location-title">
                        Type of Property
                      </label>
                      <br></br>
                      <input
                        type="text"
                        name="property_type"
                        placeholder="Select Type"
                        className="criteria-input"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="col-sm-6 px-3">
                      <label className="your-location-title">No. Baths</label>
                      <br></br>
                      <input
                        type="text"
                        name="bathrooms"
                        placeholder="No. Baths"
                        className="criteria-input"
                        onChange={handleChangeInput}
                      />
                    </div>
                  </div>

                  <div className="px-3 type-of-property">
                    <p className="your-location-title">Size Range</p>

                    <Range />
                  </div>
                  <div className="px-3 type-of-property">
                    <p className="your-location-title">Value Range</p>

                    <Range />
                  </div>
                  <div className="px-3 mt-3 advanced-button-block">
                    <Link to="/search">
                      <Button className="advanced-button" onClick={onSubmit}>
                        ADVANCED CRITERIA
                      </Button>
                    </Link>
                  </div>
                </form>
              </div> */}

              <div className="white-box white-box-shadow home-box">
                <form onSubmit={onSubmit}>
                  <div className="form-row">
                    <div className="col-sm-12 px-3">
                      <label className="your-location-title">Area</label>
                      <br></br>
                      <input
                        type="text"
                        name="location"
                        placeholder="Your Location"
                        className="criteria-input"
                        onChange={handleChangeInput}
                      />
                    </div>
                  </div>
                  <div className="form-row px-3">
                    <div className="col-sm-12">
                      <div className=" type-of-property">
                        <p className="your-location-title ">No. of Beds</p>
                        <BedRange
                          handleChangeRangeSlider={handleChangeRangeSlider}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row px-3">
                    <div className="col-sm-12">
                      <div className="type-of-property">
                        <p className="your-location-title ">Value Range</p>

                        <Range
                          handleChangeRangeSlider={handleChangeRangeSlider}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="your-location-title  pt-2 px-3">Type</div>

                  <div className="form-row px-3 content-responsive">
                    <div className="col-sm-2 ">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="All"
                        onChange={handleChangeCheckbox}
                      />
                      <label>All</label>
                    </div>
                    <div className="col-sm-3 ">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="Detached"
                        onChange={handleChangeCheckbox}
                      />
                      <label>Detached</label>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="Semi-Detached"
                        onChange={handleChangeCheckbox}
                      />
                      <label>Semi-Detached</label>
                    </div>
                    <div className="col-sm-3 ">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="Terrace"
                        onChange={handleChangeCheckbox}
                      />
                      <label>Terrace</label>
                    </div>
                  </div>
                  <div className="form-row px-3 content-responsive">
                    <div className="col-sm-2 ">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="Flate"
                        onChange={handleChangeCheckbox}
                      />
                      <label>Flate</label>
                    </div>
                    <div className="col-sm-3 ">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="Bungalow"
                        onChange={handleChangeCheckbox}
                      />
                      <label>Bungalow</label>
                    </div>
                    <div className="col-sm-4 ">
                      <input
                        type="checkbox"
                        name="property_type"
                        className="mr-1"
                        value="Other"
                        onChange={handleChangeCheckbox}
                      />
                      <label>Other</label>
                    </div>
                  </div>

                  <div className="your-location-title  pt-2 px-3">
                    Ready to Move or just want to Mingle?
                  </div>

                  <div className="form-row px-3 content-responsive">
                    <div className="col-sm-2 ">
                      <input
                        type="checkbox"
                        name="ready_to_sell"
                        className="mr-1"
                        placeholder="Your Location"
                        onChange={handleChangeCheckbox}
                        value="Move"
                      />
                      <label>Move</label>
                    </div>
                    <div className="col-sm-3 ">
                      <input
                        type="checkbox"
                        name="ready_to_sell"
                        className="mr-1"
                        placeholder="Your Location"
                        onChange={handleChangeCheckbox}
                        value="Mingle"
                      />
                      <label>Mingle</label>
                    </div>
                    <div className="col-sm-4 ">
                      <input
                        type="checkbox"
                        name="ready_to_sell"
                        className="mr-1"
                        placeholder="Your Location"
                        onChange={handleChangeCheckbox}
                        value="All"
                      />
                      <label>All</label>
                    </div>
                  </div>

                  <div className="px-3 mt-3 advanced-button-block">
                    <Link to="/search">
                      <Button className="advanced-button">
                        ADVANCED CRITERIA
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row test">
          <div className="col-sm-6 house-profile ">
            <div className="house-profile-block">
              <div className="text-white">
                <h3 className="h3-text">CREATE A HOUSE PROFILE</h3>
              </div>
              <div className="house-profile-line"></div>
              <div className="house-profile-content">
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when a unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
                <Link to="/sell">
                  <button className="house-profile-button">
                    CREATE A HOUSE PROFILE
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6 browse-profile">
            <div className="house-profile-block">
              <div className="text-white">
                <h3 className="h3-text">BROWSE HOUSE</h3>
              </div>
              <div className="house-profile-line"></div>
              <div className="house-profile-content">
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when a unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
                <Link to="/search">
                  <button className="browse-house-button">BROWSE HOUSES</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 home-tab">
          <AppBar position="static" className="container tab-bg">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="GUIDES" className="tab-name" {...activeTab(0)} />
              <Tab label="FAQS" className="tab-name" {...activeTab(1)} />
              <Tab
                label="OTHER SERVICES"
                className="tab-name"
                {...activeTab(2)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className="container">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {howToData !== null &&
                  howToData.Guide.map((item, index) => (
                    <div key={index} className="tab-content">
                      {item.name}
                    </div>
                  ))}
              </>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} className="container">
            <div className="tab-content">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {howToData !== null &&
                    howToData.Faq.map((item, index) => (
                      <FaqAccord
                        key={index}
                        title={item.title}
                        text={item.description}
                      />
                    ))}
                </>
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} className="container">
            <div className="tab-content">
              <ul>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {howToData !== null &&
                      howToData.OtherService.map((item, index) => (
                        <li key={index} className="p-tb-5">
                          <a href="#">{item.url_link}</a>
                        </li>
                      ))}
                  </>
                )}
              </ul>
            </div>
          </TabPanel>
        </div>
      </section>
      <section className="latest-blog-block">
        <div className="container">
          <div className="recent-search">LATEST BLOG</div>
          <div className="line"></div>

          <div className="blog-slider">
            <BlogSlider></BlogSlider>{" "}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Home;
