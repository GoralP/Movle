import React, { useState, useEffect } from "react";
import {
  Navigation,
  Footer,
  Range,
  BedRange,
  RadiusRange,
  SizeRange,
  GardenLength,
} from "../components";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaArrowsAltV,
  FaList,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import defaultImage from "../imgs/default_house_image.png";

import { howTo, getSingleProperty, searchProperty } from "../redux/actions";
import { Link } from "react-router-dom";

// const markers = [
//   {
//     id: 1,
//     name: "Chicago, Illinois",
//     position: { lat: 41.881832, lng: -87.623177 },
//   },
//   {
//     id: 2,
//     name: "Denver, Colorado",
//     position: { lat: 39.739235, lng: -104.99025 },
//   },
//   {
//     id: 3,
//     name: "Los Angeles, California",
//     position: { lat: 34.052235, lng: -118.243683 },
//   },
//   {
//     id: 4,
//     name: "New York, New York",
//     position: { lat: 40.712776, lng: -74.005974 },
//   },
// ];

const Search = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [list, setList] = useState(true);
  const [map, setMap] = useState(false);
  const [color, setColor] = useState("white");
  const [living, setLiving] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [external, setExternal] = useState(false);
  const [building, setBuilding] = useState(false);
  const [anything, setAnything] = useState(false);

  const livingToggle = () => setLiving(!living);
  const roomsToggle = () => setRooms(!rooms);
  const externalToggle = () => setExternal(!external);
  const buildingToggle = () => setBuilding(!building);
  const anythingToggle = () => setAnything(!anything);

  // const [search, setSearch] = useState("");
  const [formData, updateFormData] = useState("");

  const dispatch = useDispatch();

  // const a = JSON.stringify({ lat });

  const center = {
    lat: 21.1702,
    lng: 72.8311,
  };

  const { loading, howToData, searchPropertyData } = useSelector((state) => ({
    loading: state.howToReducers.howTod.loading,
    howToData: state.howToReducers.howTod.howToData,
    // searchLoading: state.searchPropertyReducers.searchProperties.loading,
    searchPropertyData:
      state.searchPropertyReducers.searchProperties.searchPropertyData,
  }));

  useEffect(() => {
    dispatch(howTo());
    dispatch(searchProperty(formData));
  }, [dispatch, formData]);

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
    dispatch(searchProperty(formData));
  };

  const handleChange = (e) => {
    // console.log("radius", localStorage.getItem("radius"));
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    dispatch(searchProperty(formData));
  };

  const markers = [];

  {
    searchPropertyData !== null &&
      searchPropertyData.map((item) => {
        var mar = {};
        var pos = {};
        mar["id"] = item.id;
        mar["location"] = item.location;
        pos["lat"] = parseFloat(item.latitude);
        pos["lng"] = parseFloat(item.longitude);
        mar["position"] = pos;
        markers.push(mar);
      });
  }

  const handleChangeCheckbox = (e) => {
    if (checkboxval !== "") {
      var propertyType =
        formData && formData[e.target.name] !== undefined
          ? formData[e.target.name]
          : "";
      var checkboxval = e.target.value.trim() + ",";

      // console.log("checkbox", checkboxval);
      if (e.target.checked === true) {
        propertyType += checkboxval;
      } else {
        propertyType = propertyType.replace(checkboxval, "");
      }
      // console.log("propertyType", propertyType);
      dispatch(searchProperty(formData));
      updateFormData({
        ...formData,
        [e.target.name]: propertyType,
      });
      // console.log("fdata", formData);
      dispatch(searchProperty(formData));
    }
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    // searchPropertyData !== null &&
    //   searchPropertyData.map((item) =>
    //     bounds.extend(item.latitude, item.longitude)
    //   );
    map.fitBounds(bounds);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUE3FDtMZTFr8oZFk1iZXAU9BuQMmA4uI",
  });

  return (
    <div className="container-fluid">
      <Navigation />
      <section className="buyer-browse-image all-image">SEARCH</section>
      <section className="main-criteria-bg">
        {/* <div className="container">
          <div className="row px">
            <div className="col-sm-3">
              <div>
                <p className="recent-search">CRITERIA & FILTER</p>
                <div className="criteria-line"></div>

                <div className="search-criteria-box white-box-shadow">
                  <form className="mt-2">
                    <label className="your-location-title">Your Location</label>
                    <br></br>
                    <input
                      type="text"
                      name="location"
                      placeholder="Your Location"
                      className="criteria-location-input"
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    <div>
                      <label className="your-search-location-title">
                        No. Bedrooms
                      </label>
                      <br></br>
                      <input
                        type="text"
                        name="bedrooms"
                        placeholder="No. Bedrooms"
                        className="criteria-location-input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="your-search-location-title">
                        No. Bathrooms
                      </label>
                      <br></br>
                      <input
                        type="text"
                        name="bathrooms"
                        placeholder="No. Bathrooms"
                        className="criteria-location-input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="your-search-location-title">Area</label>
                      <br></br>
                      <input
                        type="text"
                        name="area"
                        placeholder="area"
                        className="criteria-location-input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="value-range-padder">
                      <p className="your-location-title">Value Range</p>

                      <Range />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-sm-6 sblock-p">
              <div className="row ml-1">
                <button
                  style={{ background: color }}
                  className="list-button"
                  className={list ? "list-button-change" : "list-button"}
                  onClick={() => {
                    setMap(false);
                    setList(true);
                  }}
                >
                  <FaList className="list-icon" />
                  List
                </button>
                <button
                  className={list ? "map-button-change" : "map-button"}
                  onClick={() => {
                    setMap(true);
                    setList(false);
                  }}
                >
                  <FaMapMarkedAlt className="list-icon" />
                  Map
                </button>
              </div>

              {list && (
                <div className="list-box">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    filteredProperty !== null &&
                    filteredProperty.map((list) => (
                      <Link to="/propertyDetails" className="link-property">
                        <div
                          className="row list-item propert-list-padder"
                          onClick={() => {
                            dispatch(getSingleProperty(list.id));
                          }}
                        >
                          <div className="col-sm-4 list-item-image">
                            <img
                              src={
                                list.front_house_img
                                  ? list.front_house_img
                                  : defaultImage
                              }
                              alt="list image"
                              className="condo-image"
                            />
                          </div>
                          <div className="col-sm-8 ">
                            <div className="row  ">
                              <div className="col-9 p__block mt-1 property-list">
                                {list.name}
                              </div>
                              <div className="col-3 mt-1 price">
                                <span className="price-list">
                                  ${list.price}
                                </span>
                              </div>
                            </div>
                            <div className="row mt-1">
                              <div className="col-12">
                                <FaMapMarkerAlt className="icon-location" />
                                <span className="list-property-address">
                                  {list.location}
                                </span>
                              </div>
                            </div>
                            <div className="row list-property-address my-1 facility-line">
                              <div className="col-4">
                                <FaBed className="mx-2" />
                                {list.bedrooms} Beds
                              </div>
                              <div className="col-4">
                                <FaBath className="mr-2" />
                                {list.bathrooms} Baths
                              </div>
                              <div className="col-4 t-block">
                                <FaArrowsAltV className="mr-2" />
                                {list.area}Sq Ft
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 list-property-address">
                                {list.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}

              {map && (
                <div className="list-box">
                  <LoadScript googleMapsApiKey="AIzaSyDUE3FDtMZTFr8oZFk1iZXAU9BuQMmA4uI">
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={13}
                      center={defaultCenter}
                    />
                  </LoadScript>
                </div>
              )}
            </div>

            <div className="col-sm-3 sblock-p">
              <div className="">
                <p className="recent-search">TOP 3 PROPERTIES</p>
                <div className="criteria-line"></div>
              </div>

              {loading ? (
                <div>Loading...</div>
              ) : (
                howToData !== null &&
                howToData.Top3Property.map((list) => (
                  <Link
                    to="/propertydetails"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="row property-box">
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
        </div> */}

        <div className="container ">
          <div className="row px">
            {/* <div className="col-sm-6">
              <div>
                <p className="recent-search">CRITERIA & FILTER</p>
                <div className="criteria-line"></div>

                <div className="search-criteria-box white-box-shadow">
                  <form className="mt-2">
                    <label className="your-location-title">Your Location</label>
                    <br></br>
                    <input
                      type="text"
                      name="location"
                      placeholder="Your Location"
                      className="criteria-location-input"
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    <div>
                      <label className="your-search-location-title">
                        No. Bedrooms
                      </label>
                      <br></br>
                      <input
                        type="text"
                        name="bedrooms"
                        placeholder="No. Bedrooms"
                        className="criteria-location-input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="your-search-location-title">
                        No. Bathrooms
                      </label>
                      <br></br>
                      <input
                        type="text"
                        name="bathrooms"
                        placeholder="No. Bathrooms"
                        className="criteria-location-input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="your-search-location-title">Area</label>
                      <br></br>
                      <input
                        type="text"
                        name="area"
                        placeholder="area"
                        className="criteria-location-input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="value-range-padder">
                      <p className="your-location-title">Value Range</p>

                      <Range />
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
            <div className="col-sm-4">
              <div>
                <p className="recent-search">SEARCH</p>
                <div className="criteria-line"></div>

                <div className="search-criteria-box white-box-shadow">
                  <form className="mt-2">
                    <label className="your-location-title">Area</label>
                    <br></br>

                    <input
                      type="text"
                      name="area"
                      placeholder="Your Location"
                      className="property-form-area-input"
                      onChange={handleChange}
                    />

                    <div className=" ">
                      <div className="  type-of-property">
                        <p className="your-location-title ">Radius</p>
                        <RadiusRange
                          handleChangeRangeSlider={handleChangeRangeSlider}
                        />
                      </div>
                    </div>

                    <div>
                      <div className=" type-of-property">
                        <p className="your-location-title ">No. of Beds</p>
                        <BedRange
                          handleChangeRangeSlider={handleChangeRangeSlider}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="type-of-property">
                        <p className="your-location-title ">Value Range</p>

                        <Range
                          handleChangeRangeSlider={handleChangeRangeSlider}
                        />
                      </div>
                    </div>
                    <div className="your-location-title  pt-2 ">Type</div>

                    <div className="form-row  content-responsive">
                      <div className="col-sm-4 ">
                        <input
                          type="checkbox"
                          name="property_type"
                          className="mr-1"
                          value="All"
                          onChange={handleChangeCheckbox}
                        />
                        <label>All</label>
                      </div>
                      <div className="col-sm-6 ">
                        <input
                          type="checkbox"
                          name="property_type"
                          className="mr-1"
                          value="Detached"
                          onChange={handleChangeCheckbox}
                        />
                        <label>Detached</label>
                      </div>

                      <div className="col-sm-4 ">
                        <input
                          type="checkbox"
                          name="property_type"
                          className="mr-1"
                          value="Terrace"
                          onChange={handleChangeCheckbox}
                        />
                        <label>Terrace</label>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="checkbox"
                          name="property_type"
                          className="mr-1"
                          value="Semi-Detached"
                          onChange={handleChangeCheckbox}
                        />
                        <label>Semi-Detached</label>
                      </div>
                    </div>
                    <div className="form-row  content-responsive">
                      <div className="col-sm-4 ">
                        <input
                          type="checkbox"
                          name="property_type"
                          className="mr-1"
                          value="Flate"
                          onChange={handleChangeCheckbox}
                        />
                        <label>Flate</label>
                      </div>
                      <div className="col-sm-5 ">
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

                    <div className="your-location-title  pt-2 ">
                      Ready to Sell?
                    </div>

                    <div className="form-row  content-responsive">
                      <div className="col-sm-4 ">
                        <input
                          type="checkbox"
                          name="ready_to_sell"
                          className="mr-1"
                          value="Move"
                          onChange={handleChangeCheckbox}
                        />
                        <label>Move</label>
                      </div>
                      <div className="col-sm-4 ">
                        <input
                          type="checkbox"
                          name="ready_to_sell"
                          className="mr-1"
                          value="Mingle"
                          onChange={handleChangeCheckbox}
                        />
                        <label>Mingle</label>
                      </div>
                      <div className="col-sm-4 ">
                        <input
                          type="checkbox"
                          name="ready_to_sell"
                          className="mr-1"
                          value="All"
                          onChange={handleChangeCheckbox}
                        />
                        <label>All</label>
                      </div>
                    </div>

                    <div className="your-location-title  pt-2 ">
                      Additional Criteria
                    </div>
                    <div>
                      <div className="additional-block" onClick={livingToggle}>
                        Living space
                      </div>
                      {living && (
                        <div className="additional-criteria">
                          <div className=" type-of-property">
                            <p className="your-location-title">Size (Sq ft)</p>
                            <SizeRange />
                          </div>
                          <div className=" type-of-property">
                            <p className="your-location-title ">
                              No. of Bathrooms
                            </p>
                            <BedRange />
                          </div>
                          <div className=" type-of-property">
                            <p className="your-location-title ">
                              No. of Reception Rooms
                            </p>
                            <BedRange />
                          </div>
                          <div className=" type-of-property">
                            <p className="your-location-title ">En Suites</p>
                            <BedRange />
                          </div>
                          <div className="your-location-title  pt-2 ">
                            Open Plan
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="open_plan"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="open_plan"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="open_plan"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
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
                                type="checkbox"
                                name="utility_room"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChange}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="utility_room"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="utility_room"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Cellar
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="cellar"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="cellar"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="cellar"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Conservatory
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="conservatory"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="conservatory"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="conservatory"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Play Room
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="play_room"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="play_room"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="play_room"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Garden Room
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_room"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_room"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_room"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Out Buildings
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="out_buildings"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="out_buildings"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="out_buildings"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
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
                            <GardenLength />
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Garden Type
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-3 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="Mature"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Mature</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="Landscaped"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Landscaped</label>
                            </div>
                            <div className="col-sm-3 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="Lawn"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Lawn</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="Artificial"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Artificial</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="Patio"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Patio</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_type"
                                className="mr-1"
                                value="Dacking"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Dacking</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Garden facing South
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_facing_south"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_facing_south"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="garden_facing_south"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Parking
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="Street"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Street</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="Car Park"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Car Park</label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="Private Road"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Private Road</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="Driveway"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Driveway</label>
                            </div>
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="Single Garage"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Single Garage</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="Double Garage"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Double Garage</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="parking"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className=" type-of-property">
                            <p className="your-location-title ">Land (acres)</p>
                            <BedRange />
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
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="New Build"
                                onChange={handleChangeCheckbox}
                              />
                              <label>New Build</label>
                            </div>
                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="Period"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Period</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="Townhouse"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Townhouse</label>
                            </div>
                          </div>
                          <div className="form-row  content-responsive">
                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="Victorian"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Victorian</label>
                            </div>
                            <div className="col-sm-3 ">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="Listed"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Listed</label>
                            </div>
                            <div className="col-sm-7 ">
                              <input
                                type="checkbox"
                                name="style"
                                className="mr-1"
                                value="Conservation Area"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Conservation Area</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Condition
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="New Build"
                                onChange={handleChangeCheckbox}
                              />
                              <label>New Build</label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Refurbished"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Refurbished</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Part Refurbish"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Part Refurbish</label>
                            </div>
                          </div>
                          <div className="form-row  content-responsive">
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Requires Work"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Requires Work</label>
                            </div>
                            <div className="col-sm-8 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Need of Modernising"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Need of Modernising</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Windows
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Triple Glazed"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Triple Glazed</label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Double Glazed"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Double Glazed</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="Single Glaze"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Single Glaze</label>
                            </div>
                          </div>
                          <div className="form-row  content-responsive">
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="sash"
                                onChange={handleChangeCheckbox}
                              />
                              <label>sash</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="bay"
                                onChange={handleChangeCheckbox}
                              />
                              <label>bay</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="condition"
                                className="mr-1"
                                value="PVC"
                                onChange={handleChangeCheckbox}
                              />
                              <label>PVC</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Loft Conversion
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-3 ">
                              <input
                                type="checkbox"
                                name="loft_conversion"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes</label>
                            </div>
                            <div className="col-sm-3 ">
                              <input
                                type="checkbox"
                                name="loft_conversion"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-3">
                              <input
                                type="checkbox"
                                name="loft_conversion"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>
                          <div className=" type-of-property">
                            <p className="your-location-title ">Age(Approx)</p>
                            <GardenLength />
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Period Features
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-6">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="High Ceilings"
                                onChange={handleChangeCheckbox}
                              />
                              <label>High Ceilings </label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Cornicing"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Cornicing</label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Stain glass"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Stain glass</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Shutters"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Shutters</label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Original Floors"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Original Floors</label>
                            </div>
                          </div>
                          <div className="form-row  content-responsive">
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Beams"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Beams</label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Thatched Roof"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Thatched Roof</label>
                            </div>
                            <div className="col-sm-8 ">
                              <input
                                type="checkbox"
                                name="period_features"
                                className="mr-1"
                                value="Original Fire Places"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Original Fire Places</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Potential to Expand
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="potential_expand"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="potential_expand"
                                className="mr-1"
                                value="Loft"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Loft</label>
                            </div>

                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="potential_expand"
                                className="mr-1"
                                value="Garage"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Garage</label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="potential_expand"
                                className="mr-1"
                                value="Land"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Land</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="potential_expand"
                                className="mr-1"
                                value="Side Return"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Side Return</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            Heating
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-5">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="Central"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Central</label>
                            </div>
                            <div className="col-sm-5 ">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="Gas"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Gas</label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="Combi"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Combi</label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="Fire Place"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Fire Place</label>
                            </div>
                            <div className="col-sm-6 ">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="Heated Floor"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Heated Floor</label>
                            </div>
                          </div>
                          <div className="form-row  content-responsive">
                            <div className="col-sm-7 ">
                              <input
                                type="checkbox"
                                name="heating"
                                className="mr-1"
                                value="Air Conditioning"
                                onChange={handleChangeCheckbox}
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
                                type="checkbox"
                                name="chain_fee"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes </label>
                            </div>
                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="chain_fee"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="chain_fee"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>

                          <div className="your-location-title  pt-2 ">
                            STC /Sold/Under Offer
                          </div>

                          <div className="form-row  content-responsive">
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="sold_under_offer"
                                className="mr-1"
                                value="Yes"
                                onChange={handleChangeCheckbox}
                              />
                              <label>Yes </label>
                            </div>
                            <div className="col-sm-4 ">
                              <input
                                type="checkbox"
                                name="sold_under_offer"
                                className="mr-1"
                                value="No"
                                onChange={handleChangeCheckbox}
                              />
                              <label>No</label>
                            </div>
                            <div className="col-sm-4">
                              <input
                                type="checkbox"
                                name="sold_under_offer"
                                className="mr-1"
                                value="All"
                                onChange={handleChangeCheckbox}
                              />
                              <label>All</label>
                            </div>
                          </div>
                          <label className="your-location-title">Keyword</label>
                          <br></br>
                          <input
                            type="text"
                            name="keyword"
                            placeholder="keyword"
                            className="criteria-input"
                            onChange={handleChangeCheckbox}
                          />
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-sm-8 sblock-p">
              <div className="row ml-1">
                <button
                  style={{ background: color }}
                  // className="list-button"
                  className={list ? "list-button-change" : "list-button"}
                  onClick={() => {
                    setMap(false);
                    setList(true);
                  }}
                >
                  <FaList className="list-icon" />
                  List
                </button>
                <button
                  className={list ? "map-button-change" : "map-button"}
                  onClick={() => {
                    setMap(true);
                    setList(false);
                  }}
                >
                  <FaMapMarkedAlt className="list-icon" />
                  Map
                </button>
              </div>
              {/* <div>
                {searchPropertyData !== null &&
                  searchPropertyData.map(({ location, external }) => (
                    <>
                      {location}
                      {external}
                    </>
                  ))}
              </div> */}

              {list && (
                <div className="list-box">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    searchPropertyData !== null &&
                    searchPropertyData.map((list, index) => (
                      <Link to="/propertyDetails" className="link-property">
                        <div
                          key={index}
                          className="row list-item propert-list-padder"
                          onClick={() => {
                            dispatch(getSingleProperty(list.id));
                          }}
                        >
                          {/* <div className="col-sm-4 list-item-image">
                            <img
                              src={
                                list.front_house_img
                                  ? list.front_house_img
                                  : defaultImage
                              }
                              alt="list image"
                              className="condo-image"
                            />
                          </div> */}
                          <div className="col-sm-3  list-item-image">
                            <img
                              src={
                                list.front_house_img
                                  ? list.front_house_img
                                  : defaultImage
                              }
                              alt="list"
                              className="view-preoperties-list-image"
                            />
                          </div>

                          <div className="col-sm-9 ">
                            <div className="row">
                              <div className="col-9 p__block mt-1 property-list">
                                {list.name}
                              </div>
                              <div className="col-3 mt-1 price">
                                <span className="price-list">
                                  ${list.price}
                                </span>
                              </div>
                            </div>
                            <div className="row mt-1">
                              <div className="col-12">
                                <FaMapMarkerAlt className="icon-location" />
                                <span className="list-property-address">
                                  {list.location}
                                </span>
                              </div>
                            </div>
                            <div className="row list-property-address my-1 facility-line">
                              <div className="col-4">
                                <FaBed className="mx-2" />
                                {list.bedrooms} Beds
                              </div>
                              <div className="col-4">
                                <FaBath className="mr-2" />
                                {list.bathrooms} Baths
                              </div>
                              <div className="col-4 t-block">
                                <FaArrowsAltV className="mr-2" />
                                {list.area}Sq Ft
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 list-property-address">
                                {/* {list.description} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}

              {map && (
                <div className="list-box">
                  {/* <LoadScript>
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={13}
                      center={defaultCenter}
                    />
                  </LoadScript> */}

                  {/* <div style={{ height: "100vh", width: "100%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyDUE3FDtMZTFr8oZFk1iZXAU9BuQMmA4uI",
                      }}
                      defaultCenter={{
                        address:
                          "1600 Amphitheatre Parkway, Mountain View, california.",
                        lat: 18.52,
                        lng: 73.856,
                      }}
                      defaultZoom={12}
                    >
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        searchPropertyData !== null &&
                        searchPropertyData.map((list) => (
                          // <Marker lat={list.latitude} lng={list.longitude} />
                          // <AnyReactComponent
                          //   lat={list.latitude}
                          //   lng={list.longitude}
                          //   src={<FaMapMarkerAlt color="red" size="25px" />}
                          // ></AnyReactComponent>

                          <LocationPin
                            lat={list.latitude}
                            lng={list.longitude}
                            text={list.location}
                          />
                        ))
                      )}
                    </GoogleMapReact>
                  </div> */}

                  {/* <GoogleMapReact
                    bootstrapURLKeys={{
                      // remove the key if you want to fork
                      key: "AIzaSyDUE3FDtMZTFr8oZFk1iZXAU9BuQMmA4uI",
                    }}
                    defaultCenter={{ lat: 21.1702, lng: 72.8311 }}
                    defaultZoom={15}
                  >
                    <AnyReactComponent
                      lat={21.1702}
                      lng={72.8311}
                      src={<FaMapMarkerAlt color="red" size="25px" />}
                    ></AnyReactComponent>
                  </GoogleMapReact> */}
                  {isLoaded ? (
                    <GoogleMap
                      onLoad={handleOnLoad}
                      onClick={() => setActiveMarker(null)}
                      mapContainerStyle={{ width: "100%", height: "100vh" }}
                      zoom={5}
                      center={center}
                    >
                      {markers.map(({ id, location, position }) => (
                        <Marker
                          key={id}
                          position={position}
                          onClick={() => handleActiveMarker(id)}
                        >
                          {activeMarker === id ? (
                            <InfoWindow
                              onCloseClick={() => setActiveMarker(null)}
                            >
                              <div>{location}</div>
                            </InfoWindow>
                          ) : null}
                        </Marker>
                      ))}
                    </GoogleMap>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="main-criteria-bg pb-5">
        <div className="container">
          <div className=" px ">
            <div className=" sblock-p">
              <div className="">
                <p className="recent-search">TOP 3 PROPERTIES</p>
                <div className="criteria-line"></div>
              </div>
              <div className="row ">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  howToData !== null &&
                  howToData.Top3Property.map((list) => (
                    <div className="col-sm-4  ">
                      <div className="blog-box">
                        <div className=" top-property-image mt-2">
                          <img
                            src={
                              list.front_house_img
                                ? list.front_house_img
                                : defaultImage
                            }
                            alt="blog"
                            style={{ width: "100%" }}
                          />
                          <div className="bottom-left">$ {list.price}</div>
                        </div>
                        <div className="property-content ">
                          <div className="property-beautiful-waterfront ">
                            {list.name}
                          </div>
                          <div className="property-address">
                            <FaMapMarkerAlt className="icon-location" />
                            {list.location}
                          </div>

                          <div className="row  waterfront-facility">
                            <div className="col-4 tblock ">
                              <FaBed className="mr-1" />
                              {list.bedrooms} Beds
                            </div>
                            <div className="col-4 t-block">
                              <FaBath className="mr-1" />
                              {list.bathrooms} Baths
                            </div>
                            <div className="col-4 t-block ">
                              <FaArrowsAltV />
                              {list.area} Sq Ft
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* {loading ? (
                  <div>Loading...</div>
                ) : (
                  howToData !== null &&
                  howToData.Top3Property.map((list) => (
                    <Link
                      to="/propertydetails"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="">
                        <div className="col-sm-12 property-box border">
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
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-criteria-bg pb-5">
        <div className="bg-white">
          <div className="container">
            <div className="row px">
              <div className="col-sm-6">
                <div>
                  <p className="recent-search">OTHER SERVICES</p>
                  <p className="criteria-line"></p>
                </div>
                <div className="link-box">
                  <ul className="padder">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <>
                        {howToData !== null &&
                          howToData.OtherService.map((item) => (
                            <li className="link-border">
                              <a href="#">{item.url_link}</a>
                            </li>
                          ))}
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div>
                  <p className="recent-search">BLOG LINKS</p>
                  <p className="criteria-line"></p>
                </div>
                <div className="link-box">
                  <ul className="padder">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      howToData !== null &&
                      howToData.BlogLink.map((item) => (
                        <li className="link-border">
                          <a href="#" className="dummy">
                            {item.link}
                          </a>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Search;
