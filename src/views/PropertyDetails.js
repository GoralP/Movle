import React, { useState, useEffect } from "react";
import {
  Navigation,
  Footer,
  SingleRadius,
  SingleSize,
  SingleSlider,
  LengthSlider,
  SingleSliderLand,
  SingleSliderReception,
  SingleSliderSuites,
} from "../components";
import { FaMapMarkerAlt, FaBed, FaBath, FaArrowsAltV } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import { getSingleProperty } from "../redux/actions";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultImage from "../imgs/default_house_image.png";
import floorPlan from "../imgs/floor_plan.png";

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
          <Typography>{children}</Typography>
        </Box>
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 424 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 375, min: 320 },
    items: 1,
  },
};

const PropertyDetails = () => {
  const [value, setValue] = useState(0);
  const [valueOther, setOtherValue] = useState(0);

  const [living, setLiving] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [external, setExternal] = useState(false);
  const [building, setBuilding] = useState(false);
  const [anything, setAnything] = useState(false);
  // const [search, setSearch] = useState("");

  const livingToggle = () => setLiving(!living);
  const roomsToggle = () => setRooms(!rooms);
  const externalToggle = () => setExternal(!external);
  const buildingToggle = () => setBuilding(!building);
  const anythingToggle = () => setAnything(!anything);

  const mapStyles = {
    height: "350px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  const dispatch = useDispatch();

  const { loading, singleData, loadingProperty, howToData } = useSelector(
    (state) => ({
      loading: state.propertyReducers.getSingleProperty.loading,
      singleData: state.propertyReducers.getSingleProperty.singleData,
      loadingProperty: state.howToReducers.howTod.loading,
      howToData: state.howToReducers.howTod.howToData,
    })
  );

  useEffect(() => {
    dispatch(getSingleProperty(""));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeOther = (event, newValue) => {
    setOtherValue(newValue);
  };

  return (
    <div className="container-fluid">
      <Navigation />
      <section className="buyer-browse-image all-image">
        PROPERTY DETAILS
      </section>
      <section className="main-criteria-bg">
        <div className="container">
          <div className="row px">
            <div className="col-sm-3">
              <div>
                <div className="top-property">
                  <p className="recent-search">CRITERIA & FILTER</p>
                  <div className="criteria-line"></div>
                </div>

                {/* <div className="property-details-box white-box-shadow">
                  <form>
                    <label className="your-location-title">Your Location</label>
                    <br></br>
                    <input
                      type="text"
                      placeholder="Your Location"
                      className="criteria-location-input"
                    />

                    <div>
                      <label className="your-search-location-title">
                        No. Bathrooms
                      </label>
                      <br></br>
                      <input
                        type="text"
                        placeholder="Your Location"
                        className="criteria-location-input"
                      />
                    </div>
                    <div>
                      <label className="your-search-location-title">
                        No. Reception Rms
                      </label>
                      <br></br>
                      <input
                        type="text"
                        placeholder="Your Location"
                        className="criteria-location-input"
                      />
                    </div>
                    <div>
                      <label className="your-search-location-title">
                        Garden Length
                      </label>
                      <br></br>
                      <input
                        type="text"
                        placeholder="Your Location"
                        className="criteria-location-input"
                      />
                    </div>
                    <div className="value-range-padder">
                      <p className="your-location-title">Value Range</p>

                      <Range />
                    </div>
                  </form>
                </div> */}

                <div className="">
                  <div className="property-details-box white-box-shadow">
                    {loading ? (
                      <div>Loading....</div>
                    ) : (
                      singleData !== null && (
                        <form className="mt-2">
                          <label className="your-location-title">Area</label>
                          <br></br>
                          <input
                            name="area"
                            type="text"
                            defaultValue={singleData.area}
                            className="property-form-area-input"
                            onChange={handleChange}
                          />

                          <div className=" ">
                            <div className="  type-of-property">
                              <p className="your-location-title ">Radius</p>
                              <SingleRadius />
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">Type</div>

                          <div className="form-row  content-responsive">
                            {/* <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="location"
                                className="mr-1"
                                placeholder="Your Location"
                              />
                              <label>All</label>
                            </div> */}
                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="property_type"
                                className="mr-1"
                                defaultChecked={
                                  singleData.property_type &&
                                  singleData.property_type.includes(
                                    "Detached"
                                  ) !== false
                                    ? "checked"
                                    : ""
                                }
                                value="Detached"
                                defaultValue={singleData.property_type}
                              />
                              <label>Detached</label>
                            </div>

                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="property_type"
                                className="mr-1"
                                defaultChecked={
                                  singleData.property_type &&
                                  singleData.property_type.includes(
                                    "Terrace"
                                  ) !== false
                                    ? "checked"
                                    : ""
                                }
                                value="Terrace"
                                defaultValue={singleData.property_type}
                              />
                              <label>Terrace</label>
                            </div>
                            <div className="col-sm-12">
                              <input
                                type="checkbox"
                                name="property_type"
                                className="mr-1"
                                defaultChecked={
                                  singleData.property_type &&
                                  singleData.property_type.includes(
                                    "Semi-Detached"
                                  ) !== false
                                    ? "checked"
                                    : ""
                                }
                                value="Semi-Detached"
                                defaultValue={singleData.property_type}
                              />
                              <label>Semi-Detached</label>
                            </div>
                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="property_type"
                                className="mr-1"
                                defaultChecked={
                                  singleData.property_type &&
                                  singleData.property_type.includes("Flate") !==
                                    false
                                    ? "checked"
                                    : ""
                                }
                                value="Flate"
                                defaultValue={singleData.property_type}
                              />
                              <label>Flate</label>
                            </div>
                          </div>
                          <div className="form-row  content-responsive">
                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="property_type"
                                className="mr-1"
                                defaultChecked={
                                  singleData.property_type &&
                                  singleData.property_type.includes(
                                    "Bungalow"
                                  ) !== false
                                    ? "checked"
                                    : ""
                                }
                                value="Bungalow"
                                defaultValue={singleData.property_type}
                              />
                              <label>Bungalow</label>
                            </div>
                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="property_type"
                                className="mr-1"
                                defaultChecked={
                                  singleData.property_type &&
                                  singleData.property_type.includes("Other") !==
                                    false
                                    ? "checked"
                                    : ""
                                }
                                value="Other"
                                defaultValue={singleData.property_type}
                              />
                              <label>Other</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Ready to Sell?
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="ready_to_sell"
                                className="mr-1"
                                defaultChecked={
                                  singleData.ready_to_sell &&
                                  singleData.ready_to_sell.includes("Move") !==
                                    false
                                    ? "checked"
                                    : ""
                                }
                                value="Move"
                                defaultValue={singleData.ready_to_sell}
                              />
                              <label>Move</label>
                            </div>
                            <div className="col-sm-12 ">
                              <input
                                type="checkbox"
                                name="ready_to_sell"
                                className="mr-1"
                                defaultChecked={
                                  singleData.ready_to_sell &&
                                  singleData.ready_to_sell.includes("Move") !==
                                    false
                                    ? "checked"
                                    : ""
                                }
                                value="Mingle"
                                defaultValue={singleData.ready_to_sell}
                              />
                              <label>Mingle</label>
                            </div>
                            {/* <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="location"
                                className="mr-1"
                                placeholder="Your Location"
                              />
                              <label>All</label>
                            </div> */}
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Additional Criteria
                          </div>
                          <div>
                            <div
                              className="additional-block"
                              onClick={livingToggle}
                            >
                              Living space
                            </div>
                            {living && (
                              <div className="additional-criteria">
                                <div className=" type-of-property">
                                  <p className="your-location-title">
                                    Size (Sq ft)
                                  </p>
                                  <SingleSize />
                                </div>
                                <div className=" type-of-property">
                                  <p className="your-location-title ">
                                    No. of Bathrooms
                                  </p>
                                  <SingleSlider />
                                </div>
                                <div className=" type-of-property">
                                  <p className="your-location-title ">
                                    No. of Reception Rooms
                                  </p>
                                  <SingleSliderReception />
                                </div>
                                <div className=" type-of-property">
                                  <p className="your-location-title ">
                                    En Suites
                                  </p>
                                  <SingleSliderSuites />
                                </div>
                                <div className="your-location-title  pt-2 ">
                                  Open Plan
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4">
                                    <input
                                      type="radio"
                                      name="open_plan"
                                      defaultChecked={
                                        singleData.living_space.open_plan
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.living_space.open_plan
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>

                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="open_plan"
                                      defaultChecked={
                                        singleData.living_space.open_plan
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="No"
                                      defaultValue={
                                        singleData.living_space.open_plan
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>

                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <div
                              className="additional-block mt-2"
                              onClick={roomsToggle}
                            >
                              Additional Rooms
                            </div>
                            {rooms && (
                              <div className="additional-criteria">
                                <div className="your-location-title  pt-2 ">
                                  Utility Room
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="utility_room"
                                      defaultChecked={
                                        singleData.additional_rooms.utility_room
                                          ? "checked"
                                          : ""
                                      }
                                      value="Yes"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.additional_rooms.utility_room
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="utility_room"
                                      defaultChecked={
                                        singleData.additional_rooms.utility_room
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="No"
                                      defaultValue={
                                        singleData.additional_rooms.utility_room
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Cellar
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="cellar"
                                      defaultChecked={
                                        singleData.additional_rooms.cellar
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.additional_rooms.cellar
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="cellar"
                                      defaultChecked={
                                        singleData.additional_rooms.cellar
                                          ? "checked"
                                          : ""
                                      }
                                      value="No"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.additional_rooms.cellar
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Conservatory
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="conservatory"
                                      defaultChecked={
                                        singleData.additional_rooms.conservatory
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.additional_rooms.conservatory
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="conservatory"
                                      defaultChecked={
                                        singleData.additional_rooms.conservatory
                                          ? "checked"
                                          : ""
                                      }
                                      value="No"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.additional_rooms.conservatory
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Play Room
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="play_room"
                                      defaultChecked={
                                        singleData.additional_rooms.play_room
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.additional_rooms.play_room
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="play_room"
                                      defaultChecked={
                                        singleData.additional_rooms.play_room
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="No"
                                      defaultValue={
                                        singleData.additional_rooms.play_room
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Garden Room
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="garden_room"
                                      defaultChecked={
                                        singleData.additional_rooms.garden_room
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.additional_rooms.garden_room
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="garden_room"
                                      defaultChecked={
                                        singleData.additional_rooms.garden_room
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="No"
                                      defaultValue={
                                        singleData.additional_rooms.garden_room
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Out Buildings
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="out_buildings"
                                      defaultChecked={
                                        singleData.additional_rooms
                                          .out_buildings
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.additional_rooms
                                          .out_buildings
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="out_buildings"
                                      defaultChecked={
                                        singleData.additional_rooms
                                          .out_buildings
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="No"
                                      defaultValue={
                                        singleData.additional_rooms
                                          .out_buildings
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div
                              className="additional-block mt-2"
                              onClick={externalToggle}
                            >
                              External
                            </div>
                            {external && (
                              <div className="additional-criteria">
                                <div className=" type-of-property">
                                  <p className="your-location-title ">
                                    Garden Length(ft)
                                  </p>
                                  <LengthSlider />
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Garden Type
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-3 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="garden_type"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.garden_type &&
                                        singleData.external.garden_type.includes(
                                          "Mature"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      defaultValue={
                                        singleData.external.garden_type
                                      }
                                      value="Mature"
                                    />
                                    <label>Mature</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="garden_type"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.garden_type &&
                                        singleData.external.garden_type.includes(
                                          "Landscaped"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      defaultValue={
                                        singleData.external.garden_type
                                      }
                                      value="Landscaped"
                                    />
                                    <label>Landscaped</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="garden_type"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.garden_type &&
                                        singleData.external.garden_type.includes(
                                          "Lawn"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      defaultValue={
                                        singleData.external.garden_type
                                      }
                                      value="Lawn"
                                    />
                                    <label>Lawn</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="garden_type"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.garden_type &&
                                        singleData.external.garden_type.includes(
                                          "Artificial"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      defaultValue={
                                        singleData.external.garden_type
                                      }
                                      value="Artificial"
                                    />
                                    <label>Artificial</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="garden_type"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.garden_type &&
                                        singleData.external.garden_type.includes(
                                          "Dacking"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      defaultValue={
                                        singleData.external.garden_type
                                      }
                                      value="Dacking"
                                    />
                                    <label>Dacking</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="garden_type"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.garden_type &&
                                        singleData.external.garden_type.includes(
                                          "Patio"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      defaultValue={
                                        singleData.external.garden_type
                                      }
                                      value="Patio"
                                    />
                                    <label>Patio</label>
                                  </div>
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Garden facing South
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="garden_facing_south"
                                      defaultChecked={
                                        singleData.external.garden_facing_south
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.external.garden_facing_south
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="garden_facing_south"
                                      defaultChecked={
                                        singleData.external.garden_facing_south
                                          ? "checked"
                                          : ""
                                      }
                                      value="No"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.external.garden_facing_south
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Parking
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="parking"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.parking &&
                                        singleData.external.parking.includes(
                                          "Street"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Street"
                                      defaultValue={singleData.external.parking}
                                    />
                                    <label>Street</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="parking"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.parking &&
                                        singleData.external.parking.includes(
                                          "Car Park"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Car Park"
                                      defaultValue={singleData.external.parking}
                                    />
                                    <label>Car Park</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="parking"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.parking &&
                                        singleData.external.parking.includes(
                                          "Private Road"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Private Road"
                                      defaultValue={singleData.external.parking}
                                    />
                                    <label>Private Road</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="parking"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.parking &&
                                        singleData.external.parking.includes(
                                          "Driveway"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Driveway"
                                      defaultValue={singleData.external.parking}
                                    />
                                    <label>Driveway</label>
                                  </div>
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="parking"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.parking &&
                                        singleData.external.parking.includes(
                                          "Single Garage"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Single Garage"
                                      defaultValue={singleData.external.parking}
                                    />
                                    <label>Single Garage</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="parking"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.external.parking &&
                                        singleData.external.parking.includes(
                                          "Double Garage"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Double Garage"
                                      defaultValue={singleData.external.parking}
                                    />
                                    <label>Double Garage</label>
                                  </div>
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className=" type-of-property">
                                  <p className="your-location-title ">
                                    Land (acres)
                                  </p>
                                  <SingleSliderLand />
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div
                              className="additional-block mt-2"
                              onClick={buildingToggle}
                            >
                              Building
                            </div>
                            {building && (
                              <div className="additional-criteria">
                                <div className="your-location-title  pt-2 ">
                                  Style
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-4 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="style"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.style &&
                                        singleData.building.style.includes(
                                          "New Build"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="New Build"
                                      defaultValue={singleData.building.style}
                                    />
                                    <label>New Build</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="style"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.style &&
                                        singleData.building.style.includes(
                                          "Period"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Period"
                                      defaultValue={singleData.building.style}
                                    />
                                    <label>Period</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="style"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.style &&
                                        singleData.building.style.includes(
                                          "Townhouse"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Townhouse"
                                      defaultValue={singleData.building.style}
                                    />
                                    <label>Townhouse</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="style"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.style &&
                                        singleData.building.style.includes(
                                          "Victorian"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Victorian"
                                      defaultValue={singleData.building.style}
                                    />
                                    <label>Victorian</label>
                                  </div>
                                </div>
                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="style"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.style &&
                                        singleData.building.style.includes(
                                          "Listed"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Listed"
                                      defaultValue={singleData.building.style}
                                    />
                                    <label>Listed</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="style"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.style &&
                                        singleData.building.style.includes(
                                          "Conservation Area"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Conservation Area"
                                      defaultValue={singleData.building.style}
                                    />
                                    <label>Conservation Area</label>
                                  </div>
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Condition
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-5 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="condition"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.condition &&
                                        singleData.building.condition.includes(
                                          "New Build"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="New Build"
                                      defaultValue={
                                        singleData.building.condition
                                      }
                                    />
                                    <label>New Build</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="condition "
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.condition &&
                                        singleData.building.condition.includes(
                                          "Refurbished"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Refurbished"
                                      defaultValue={
                                        singleData.building.condition
                                      }
                                    />
                                    <label>Refurbished</label>
                                  </div>

                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="condition"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.condition &&
                                        singleData.building.condition.includes(
                                          "Part Refurbish"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Part Refurbish"
                                      defaultValue={
                                        singleData.building.condition
                                      }
                                    />
                                    <label>Part Refurbish</label>
                                  </div>

                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="condition"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.condition &&
                                        singleData.building.condition.includes(
                                          "Requires Work"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Requires Work"
                                      defaultValue={
                                        singleData.building.condition
                                      }
                                    />
                                    <label>Requires Work</label>
                                  </div>
                                </div>
                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="condition"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.condition &&
                                        singleData.building.condition.includes(
                                          "Need of Modernising"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Need of Modernising"
                                      defaultValue={
                                        singleData.building.condition
                                      }
                                    />
                                    <label>Need of Modernising</label>
                                  </div>
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Windows
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-6 ">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="windows"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.windows &&
                                        singleData.building.windows.includes(
                                          "Triple Glazed"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Triple Glazed"
                                      defaultValue={singleData.building.windows}
                                    />
                                    <label>Triple Glazed</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="windows"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.windows &&
                                        singleData.building.windows.includes(
                                          "Double Glazed"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Double Glazed"
                                      defaultValue={singleData.building.windows}
                                    />
                                    <label>Double Glazed</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="windows"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.windows &&
                                        singleData.building.windows.includes(
                                          "Single Glaze"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Single Glaze"
                                      defaultValue={singleData.building.windows}
                                    />
                                    <label>Single Glaze</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="windows"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.windows &&
                                        singleData.building.windows.includes(
                                          "sash"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="sash"
                                      defaultValue={singleData.building.windows}
                                    />
                                    <label>sash</label>
                                  </div>
                                </div>
                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="windows"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.windows &&
                                        singleData.building.windows.includes(
                                          "bay"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="bay"
                                      defaultValue={singleData.building.windows}
                                    />
                                    <label>bay</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="windows"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.windows &&
                                        singleData.building.windows.includes(
                                          "PVC"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="PVC"
                                      defaultValue={singleData.building.windows}
                                    />
                                    <label>PVC</label>
                                  </div>
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Loft Conversion
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-6 ">
                                    <input
                                      type="radio"
                                      name="loft_conversion"
                                      defaultChecked={
                                        singleData.building.loft_conversion
                                          ? "checked"
                                          : ""
                                      }
                                      className="mr-1"
                                      value="Yes"
                                      defaultValue={
                                        singleData.building.loft_conversion
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes</label>
                                  </div>
                                  <div className="col-sm-6 ">
                                    <input
                                      type="radio"
                                      name="loft_conversion"
                                      defaultChecked={
                                        singleData.building.loft_conversion
                                          ? "checked"
                                          : ""
                                      }
                                      value="No"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.building.loft_conversion
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-3">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>
                                <div className=" type-of-property">
                                  <p className="your-location-title ">
                                    Age(Approx)
                                  </p>
                                  <LengthSlider />
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Period Features
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-6">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "High Ceilings"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="High Ceilings"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>High Ceilings</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Cornicing"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Cornicing"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Cornicing</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Stain glass"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Stain glass"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Stain glass</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Shutters"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Shutters"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Shutters</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Original Floors"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Original Floors"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Original Floors</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Beams"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Beams"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Beams</label>
                                  </div>
                                </div>
                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Thatched Roof"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Thatched Roof"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Thatched Roof</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="period_features"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.period_features &&
                                        singleData.building.period_features.includes(
                                          "Original Fire Places"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Original Fire Places"
                                      defaultValue={
                                        singleData.building.period_features
                                      }
                                    />
                                    <label>Original Fire Places</label>
                                  </div>
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Potential to Expand
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-4">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="potential_expand"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.potential_expand &&
                                        singleData.building.potential_expand.includes(
                                          "Loft"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Loft"
                                      defaultValue={
                                        singleData.building.potential_expand
                                      }
                                    />
                                    <label>Loft</label>
                                  </div>

                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="potential_expand"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.potential_expand &&
                                        singleData.building.potential_expand.includes(
                                          "Garage"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Garage"
                                      defaultValue={
                                        singleData.building.potential_expand
                                      }
                                    />
                                    <label>Garage</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="potential_expand"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.potential_expand &&
                                        singleData.building.potential_expand.includes(
                                          "Land"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Land"
                                      defaultValue={
                                        singleData.building.potential_expand
                                      }
                                    />
                                    <label>Land</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="potential_expand"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.potential_expand &&
                                        singleData.building.potential_expand.includes(
                                          "Side Return"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Side Return"
                                      defaultValue={
                                        singleData.building.potential_expand
                                      }
                                    />
                                    <label>Side Return</label>
                                  </div>
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  Heating
                                </div>

                                <div className="form-row  content-responsive">
                                  {/* <div className="col-sm-5">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="heating"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.heating &&
                                        singleData.building.heating.includes(
                                          "Central"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Central"
                                      defaultValue={singleData.building.heating}
                                    />
                                    <label>Central</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="heating"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.heating &&
                                        singleData.building.heating.includes(
                                          "Gas"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Gas"
                                      defaultValue={singleData.building.heating}
                                    />
                                    <label>Gas</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="heating"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.heating &&
                                        singleData.building.heating.includes(
                                          "Combi"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Combi"
                                      defaultValue={singleData.building.heating}
                                    />
                                    <label>Combi</label>
                                  </div>
                                  <div className="col-sm-12">
                                    <input
                                      type="checkbox"
                                      name="heating"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.heating &&
                                        singleData.building.heating.includes(
                                          "Fire Place"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Fire Place"
                                      defaultValue={singleData.building.heating}
                                    />
                                    <label>Fire Place</label>
                                  </div>
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="heating"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.heating &&
                                        singleData.building.heating.includes(
                                          "Heated Floor"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Heated Floor"
                                      defaultValue={singleData.building.heating}
                                    />
                                    <label>Heated Floor</label>
                                  </div>
                                </div>
                                <div className="form-row  content-responsive">
                                  <div className="col-sm-12 ">
                                    <input
                                      type="checkbox"
                                      name="heating"
                                      className="mr-1"
                                      defaultChecked={
                                        singleData.building.heating &&
                                        singleData.building.heating.includes(
                                          "Air Conditioning"
                                        ) !== false
                                          ? "checked"
                                          : ""
                                      }
                                      value="Air Conditioning"
                                      defaultValue={singleData.building.heating}
                                    />
                                    <label>Air Conditioning</label>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div
                              className="additional-block mt-2"
                              onClick={anythingToggle}
                            >
                              Anything Else
                            </div>
                            {anything && (
                              <div className="additional-criteria">
                                <div className="your-location-title  pt-2 ">
                                  Chain Fee
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="chain_fee"
                                      defaultChecked={
                                        singleData.anything_else.chain_fee
                                          ? "checked"
                                          : ""
                                      }
                                      value="Yes"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.anything_else.chain_fee
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes </label>
                                  </div>
                                  <div className="col-sm-4">
                                    <input
                                      type="radio"
                                      name="chain_fee"
                                      defaultChecked={
                                        singleData.anything_else.chain_fee
                                          ? "checked"
                                          : ""
                                      }
                                      value="No"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.anything_else.chain_fee
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>

                                <div className="your-location-title  pt-2 ">
                                  STC /Sold/Under Offer
                                </div>

                                <div className="form-row  content-responsive">
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="sold_under_offer"
                                      defaultChecked={
                                        singleData.anything_else
                                          .sold_under_offer
                                          ? "checked"
                                          : ""
                                      }
                                      value="Yes"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.anything_else
                                          .sold_under_offer
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>Yes </label>
                                  </div>
                                  <div className="col-sm-4 ">
                                    <input
                                      type="radio"
                                      name="sold_under_offer"
                                      defaultChecked={
                                        singleData.anything_else
                                          .sold_under_offer
                                          ? "checked"
                                          : ""
                                      }
                                      value="No"
                                      className="mr-1"
                                      defaultValue={
                                        singleData.anything_else
                                          .sold_under_offer
                                      }
                                      onChange={handleChange}
                                    />
                                    <label>No</label>
                                  </div>
                                  {/* <div className="col-sm-4">
                                    <input
                                      type="checkbox"
                                      name="location"
                                      className="mr-1"
                                      placeholder="Your Location"
                                    />
                                    <label>All</label>
                                  </div> */}
                                </div>
                                <label className="your-location-title">
                                  Keyword
                                </label>
                                <br></br>
                                <input
                                  type="text"
                                  name="location"
                                  placeholder="keyword"
                                  className="criteria-input"
                                  // onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        </form>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              {loading ? (
                <div>Loading...</div>
              ) : (
                singleData !== null && (
                  <div className="row tab-bar">
                    <AppBar
                      position="static"
                      className="tab-bg container m-width92"
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                      >
                        <Tab
                          label="PHOTO"
                          className="property-tab-name"
                          {...activeTab(0)}
                        />
                        <Tab
                          label="FLOOR PLAN"
                          className="property-tab-name"
                          {...activeTab(1)}
                        />
                        <Tab
                          label="MAP"
                          className="property-tab-name"
                          {...activeTab(2)}
                        />
                        <Tab
                          label="EPC"
                          className="property-tab-name"
                          {...activeTab(3)}
                        />
                      </Tabs>
                    </AppBar>
                    <TabPanel
                      value={value}
                      index={0}
                      className="container-fluid "
                    >
                      <div className="property-tab-box">
                        <Carousel
                          responsive={responsive}
                          infinite
                          autoPlaySpeed={1000}
                        >
                          <div>
                            <img
                              src={
                                singleData.front_house_img
                                  ? singleData.front_house_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.lounge_img
                                  ? singleData.lounge_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.back_house_img
                                  ? singleData.back_house_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.bed1_img
                                  ? singleData.bed1_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.bed2_img
                                  ? singleData.bed2_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.kitchen_img
                                  ? singleData.kitchen_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.reception_img
                                  ? singleData.reception_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                singleData.garden_img
                                  ? singleData.garden_img
                                  : defaultImage
                              }
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                        </Carousel>
                      </div>
                    </TabPanel>
                    <TabPanel
                      value={value}
                      index={1}
                      className="container-fluid"
                    >
                      <div className="property-tab-box">
                        <Carousel
                          responsive={responsive}
                          infinite
                          autoPlaySpeed={1000}
                        >
                          <div>
                            <img
                              src={floorPlan}
                              alt="floor"
                              className="floor-img"
                            />
                          </div>
                        </Carousel>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={2} className="container">
                      <div className="property-tab-box">
                        <LoadScript googleMapsApiKey="AIzaSyDUE3FDtMZTFr8oZFk1iZXAU9BuQMmA4uI">
                          <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                          />
                        </LoadScript>
                      </div>
                    </TabPanel>

                    <AppBar
                      position="static"
                      className="tab-bg container m-width92"
                    >
                      <Tabs
                        value={valueOther}
                        onChange={handleChangeOther}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                      >
                        <Tab
                          label="DESCRIPTION"
                          className="property-tab-name"
                          {...activeTab(0)}
                        />
                        <Tab
                          label="AREA"
                          className="property-tab-name"
                          {...activeTab(1)}
                        />
                        <Tab
                          label="COMMUNITY"
                          className="property-tab-name"
                          {...activeTab(2)}
                        />
                      </Tabs>
                    </AppBar>
                    <TabPanel
                      value={valueOther}
                      index={0}
                      className="container-fluid "
                    >
                      <div className="description-tab">
                        {singleData.front_house_img_desc}
                      </div>
                    </TabPanel>
                    <TabPanel
                      value={valueOther}
                      index={1}
                      className="container-fluid"
                    >
                      <div className="description-tab">
                        {singleData.area}
                        {/* {singleData.area_details &&
                          singleData.area_details.map((item) => (
                            <div className="row">
                              <div className="col-2">
                                <img
                                  src={icon_one}
                                  alt="area"
                                  className="area-tag"
                                />
                              </div>
                              <div className="col-10 area-content-border text-primary">
                                <u>{item.ar_name}</u>
                              </div>
                            </div>
                          ))} */}
                      </div>
                    </TabPanel>
                    <TabPanel
                      value={valueOther}
                      index={2}
                      className="container-fluid"
                    >
                      <div className="description-tab">
                        {singleData.front_house_img_com}
                      </div>
                    </TabPanel>
                  </div>
                )
              )}

              <div className="text-center">
                <button className="contact-seller">CONTACT SELLER</button>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="top-property">
                <p className="recent-search">TOP 3 PROPERTIES</p>
                <div className="criteria-line"></div>
              </div>
              {loadingProperty ? (
                <div>Loading...</div>
              ) : (
                howToData !== null &&
                howToData.Top3Property.map((list) => (
                  <Link
                    to="/propertydetails"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="row property-box ">
                      <div className="col-sm-12">
                        <div className="blog-box">
                          <div className="col-sm-12 top-property-image">
                            <img
                              src={
                                list.front_house_img
                                  ? list.front_house_img
                                  : defaultImage
                              }
                              alt="blog"
                              className="three-property-image"
                            />
                            <div className="bottom-left">$ {list.price}</div>
                          </div>
                          <div className="property-content">
                            <div className="property-beautiful-waterfront">
                              {list.name}
                            </div>
                            <div className="property-address">
                              <FaMapMarkerAlt className="icon-location" />
                              {list.location}
                            </div>

                            <div className="row  waterfront-facility">
                              <div className="col-4 tblock">
                                <FaBed className="mr-1" />
                                {list.bedrooms} Beds
                              </div>
                              <div className="col-4 t-block">
                                <FaBath className="mr-1" />
                                {list.bathrooms} Baths
                              </div>
                              <div className="col-4 t-block">
                                <FaArrowsAltV />
                                {list.area} Sq Ft
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="main-criteria-bg pb-5">
        <div className="bg-white">
          <div className="container">
            <div className="row px">
              <div className="col-sm-12">
                <div>
                  <p className="recent-search">OTHER SERVICES</p>
                  <p className="criteria-line"></p>
                </div>
                <div>
                  {loadingProperty ? (
                    <div>Loading...</div>
                  ) : (
                    howToData !== null &&
                    howToData.OtherService.map((list) => (
                      <ul className="padder">
                        <li className="other-service-link">
                          <a href="#" className="dummy">
                            {list.url_link}
                          </a>
                        </li>
                      </ul>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to="/sell">
            <button className="create-profile-button">
              CREATE A HOUSE PROFILE
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
