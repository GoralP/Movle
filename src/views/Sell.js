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
  AgeSlider,
} from "../components";
import rectangle from "../imgs/rectangle.png";
import { FaPlus } from "react-icons/fa";
import icon_two from "../imgs/icon2.png";
import Switch from "react-switch";
import { addProperty } from "../redux/actions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Sell = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, updateFormData] = useState("");
  const [preview, setPreview] = useState("");
  const [location, setAddress] = useState("");
  const [living, setLiving] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [external, setExternal] = useState(false);
  const [building, setBuilding] = useState(false);
  const [anything, setAnything] = useState(false);
  const [checkedSwitch, setChecked] = useState(false);

  const livingToggle = () => setLiving(!living);
  const roomsToggle = () => setRooms(!rooms);
  const externalToggle = () => setExternal(!external);
  const buildingToggle = () => setBuilding(!building);
  const anythingToggle = () => setAnything(!anything);

  const handleChangeSwitch = (nextChecked) => {
    setChecked(nextChecked);
    updateFormData({
      ...formData,
      is_area: nextChecked ? "1" : "0",
    });
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    console.log("fdata", formData);
  };

  // useEffect(() => {
  //   console.log("Updated State", formData);
  // }, [formData]);

  const handleChangeAddress = (location) => {
    setAddress(location);
    updateFormData({
      ...formData,
      location,
    });
  };

  const handleSelect = (location) => {
    setAddress(location);

    geocodeByAddress(location)
      .then((results) => getLatLng(results[0]))
      .then((res) => {
        localStorage.setItem("lat", res.lat);
        localStorage.setItem("lng", res.lng);
        // console.log(res);
      })
      .catch((error) => console.error("Error", error));
  };

  var propertyType = "";

  const handleChangeCheckbox = (e) => {
    if (checkboxval !== "") {
      propertyType =
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
      updateFormData({
        ...formData,
        [e.target.name]: propertyType,
      });
      // console.log("fdata", formData);
    }
  };

  const fileHandler = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
    setPreview({
      ...preview,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    formData.radius = localStorage.getItem("radius")
      ? localStorage.getItem("radius")
      : 0;
    formData.size = localStorage.getItem("range")
      ? localStorage.getItem("range")
      : 0;
    formData.bath_room = localStorage.getItem("single_range")
      ? localStorage.getItem("single_range")
      : 0;
    formData.recep_room = localStorage.getItem("single_range_recp")
      ? localStorage.getItem("single_range_recp")
      : 0;
    formData.en_suit = localStorage.getItem("single_range_suites")
      ? localStorage.getItem("single_range_suites")
      : 0;
    formData.land = localStorage.getItem("single_range_Land")
      ? localStorage.getItem("single_range_Land")
      : 0;
    formData.garden_length = localStorage.getItem("length_range")
      ? localStorage.getItem("length_range")
      : "0";
    formData.age = localStorage.getItem("age_range")
      ? localStorage.getItem("age_range")
      : 0;
    formData.location = location;
    formData.latitude = localStorage.getItem("lat");
    formData.longitude = localStorage.getItem("lng");
    dispatch(addProperty(formData, history));
  };

  return (
    <div className="container-fluid">
      <Navigation />

      <section className="buyer-browse-image all-image">
        BUILD YOUR PROPERTY PROFILE
      </section>
      <div className="main-criteria-bg">
        <section>
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-sm-4">
                  <div className="sell-criteria-box white-box-shadow">
                    <div className="mt-2">
                      <label className="your-location-title">Area</label>
                      <br></br>
                      {/* <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <>
                            <input
                              {...getInputProps({
                                placeholder: "type address",
                              })}
                              type="text"
                              name="area"
                              placeholder="Your Location"
                              className="criteria-input"
                              onChange={handleChange}
                            />
                            <div>
                              {suggestions.map((suggestion) => {
                                <div {...getSuggestionItemProps(suggestion)}>
                                  {suggestion.description}
                                </div>;
                              })}
                            </div>
                          </>
                        )}
                      </PlacesAutocomplete> */}

                      <input
                        type="text"
                        name="area"
                        placeholder="Your Location"
                        className="property-form-area-input"
                        onChange={handleChange}
                        required
                      />

                      <div className=" ">
                        <div className="  type-of-property">
                          <p className="your-location-title ">Radius</p>
                          <SingleRadius />
                        </div>
                      </div>

                      <div className="your-location-title  pt-2 ">Type</div>

                      <div className="form-row  content-responsive">
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
                      </div>
                      <div className="form-row  content-responsive">
                        <div className="col-sm-6 ">
                          <input
                            type="checkbox"
                            name="property_type"
                            className="mr-1"
                            value="Bungalow"
                            onChange={handleChangeCheckbox}
                          />
                          <label>Bungalow</label>
                        </div>
                        <div className="col-sm-5 ">
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
                        <div className="col-sm-4">
                          <input
                            type="checkbox"
                            name="ready_to_sell"
                            className="mr-1"
                            value="Mingle"
                            onChange={handleChangeCheckbox}
                          />
                          <label>Mingle</label>
                        </div>
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
                              <p className="your-location-title ">En Suites</p>
                              <SingleSliderSuites />
                            </div>
                            <div className="your-location-title  pt-2 ">
                              Open Plan
                            </div>

                            <div className="form-row  content-responsive">
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="open_plan"
                                  className="mr-1"
                                  value="Yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="open_plan"
                                  className="mr-1"
                                  value="No"
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
                                  className="mr-1"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="utility_room"
                                  className="mr-1"
                                  value="No"
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
                                  className="mr-1"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="cellar"
                                  className="mr-1"
                                  value="No"
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
                                  className="mr-1"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="conservatory"
                                  className="mr-1"
                                  value="No"
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
                                  className="mr-1"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="play_room"
                                  className="mr-1"
                                  value="No"
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
                                  className="mr-1"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="garden_room"
                                  className="mr-1"
                                  value="No"
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
                                  className="mr-1"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="out_buildings"
                                  className="mr-1"
                                  value="No"
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

                            <div className="your-location-title  pt-2">
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
                              <div className="col-sm-5 ">
                                <input
                                  type="checkbox"
                                  name="garden_type"
                                  className="mr-1"
                                  value="Dacking"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>Dacking</label>
                              </div>
                              <div className="col-sm-3 ">
                                <input
                                  type="checkbox"
                                  name="garden_type"
                                  className="mr-1"
                                  value="Patio"
                                  onChange={handleChangeCheckbox}
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
                                  className="mr-1"
                                  value="Yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="garden_facing_south"
                                  className="mr-1"
                                  value="No"
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
                            </div>
                            <div className="form-row  content-responsive">
                              <div className="col-sm-5 ">
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
                              {/* <div className="col-sm-5 ">
                                <input
                                  type="checkbox"
                                  name="location"
                                  className="mr-1"
                                  placeholder="Your Location"
                                />
                                <label>All</label>
                              </div> */}
                              <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="condition"
                                  className="mr-1"
                                  value="New Build"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>New Build</label>
                              </div>
                              <div className="col-sm-6">
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
                            </div>
                            <div className="form-row  content-responsive">
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
                              {/* <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="location"
                                  className="mr-1"
                                  placeholder="Your Location"
                                />
                                <label>All</label>
                              </div> */}
                              <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="windows"
                                  className="mr-1"
                                  value="Triple Glazed"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>Triple Glazed</label>
                              </div>
                              <div className="col-sm-6">
                                <input
                                  type="checkbox"
                                  name="windows"
                                  className="mr-1"
                                  value="Double Glazed"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>Double Glazed</label>
                              </div>
                              <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="windows"
                                  className="mr-1"
                                  value="Single Glazed"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>Single Glazed</label>
                              </div>
                              <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="windows"
                                  className="mr-1"
                                  value="sash"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>sash</label>
                              </div>
                            </div>
                            <div className="form-row  content-responsive">
                              <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="windows"
                                  className="mr-1"
                                  value="bay"
                                  onChange={handleChangeCheckbox}
                                />
                                <label>bay</label>
                              </div>
                              <div className="col-sm-6 ">
                                <input
                                  type="checkbox"
                                  name="windows"
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
                                  type="radio"
                                  name="loft_conversion"
                                  className="mr-1"
                                  value="Yes"
                                  onChange={handleChange}
                                />
                                <label>Yes</label>
                              </div>
                              <div className="col-sm-3 ">
                                <input
                                  type="radio"
                                  name="loft_conversion"
                                  className="mr-1"
                                  value="No"
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
                              <AgeSlider />
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
                                <label>Stain glass </label>
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
                            </div>
                            <div className="form-row  content-responsive">
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

                            <div className="form-row content-responsive">
                              {/* <div className="col-sm-4">
                                <input
                                  type="checkbox"
                                  name="location"
                                  className="mr-1"
                                  placeholder="Your Location"
                                />
                                <label>All</label>
                              </div> */}
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
                              {/* <div className="col-sm-5">
                                <input
                                  type="checkbox"
                                  name="location"
                                  className="mr-1"
                                  placeholder="Your Location"
                                />
                                <label>All</label>
                              </div> */}
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
                                  type="radio"
                                  name="chain_fee"
                                  className="mr-1"
                                  value="Yes"
                                  onChange={handleChange}
                                />
                                <label>Yes </label>
                              </div>
                              <div className="col-sm-4">
                                <input
                                  type="radio"
                                  name="chain_fee"
                                  className="mr-1"
                                  value="No"
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
                              STC/Sold/Under Offer
                            </div>

                            <div className="form-row  content-responsive">
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="sold_under_offer"
                                  className="mr-1"
                                  value="Yes"
                                  onChange={handleChange}
                                />
                                <label>Yes </label>
                              </div>
                              <div className="col-sm-4 ">
                                <input
                                  type="radio"
                                  name="sold_under_offer"
                                  className="mr-1"
                                  value="No"
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
                              onChange={handleChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" col-sm-8 px ">
                  <div className="upload__image-wrapper">
                    <div className="row front-house-images">
                      <div className="col-sm-4">
                        <div className="front-of-house  pl-2">
                          Front Of House
                        </div>

                        <div className="house-wrapper  ">
                          <label className="property-from-label ">
                            <img
                              src={rectangle}
                              alt="front house"
                              className="sell-property-image"
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.front_house_img}
                                alt="front house"
                                className={
                                  preview.front_house_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>

                          <input
                            name="front_house_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="front_house_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="front_house_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="front-of-house sell-image-responsive pl-2">
                          Lounge
                        </div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Lounge"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.lounge_img}
                                alt="Lounge"
                                className={
                                  preview.lounge_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="lounge_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="lounge_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="lounge_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="front-of-house sell-image-responsive pl-2">
                          Back of House
                        </div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Back of House"
                              className="sell-property-image "
                            />
                            <div className="centered-text">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.back_house_img}
                                alt="Back of House"
                                className={
                                  preview.back_house_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="back_house_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="back_house_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="back_house_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="upload__image-wrapper">
                    <div className="row front-house-images">
                      <div className="col-sm-4">
                        <div className="front-of-house pl-2">Bed 1</div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Bed 1"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.bed1_img}
                                alt="Bed 1"
                                className={
                                  preview.bed1_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="bed1_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="bed1_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="bed1_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="front-of-house sell-image-responsive pl-2">
                          Bed 2
                        </div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Bed 2"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.bed2_img}
                                alt="Bed 2"
                                className={
                                  preview.bed2_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="bed2_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="bed2_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="bed2_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="front-of-house sell-image-responsive pl-2">
                          Kitchen
                        </div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Kitchen"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.kitchen_img}
                                alt="Kitchen"
                                className={
                                  preview.kitchen_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="kitchen_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="kitchen_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="kitchen_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="upload__image-wrapper">
                    <div className="row front-house-images">
                      <div className="col-sm-4">
                        <div className="front-of-house pl-2">Reception</div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Reception"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.reception_img}
                                alt="Reception"
                                className={
                                  preview.reception_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="reception_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="reception_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="reception_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="front-of-house sell-image-responsive pl-2">
                          Garden
                        </div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Garden"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.garden_img}
                                alt="Garden"
                                className={
                                  preview.garden_img
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="garden_img"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="garden_img_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="garden_img_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="front-of-house sell-image-responsive pl-2">
                          Additional Upload
                        </div>
                        <div className="house-wrapper">
                          <label className="property-from-label">
                            <img
                              src={rectangle}
                              alt="Additional Upload"
                              className="sell-property-image "
                            />
                            <div className="centered-text ">
                              <FaPlus className="plus-icon" />
                            </div>
                            <div className="picture-preview">
                              <img
                                src={preview.additional_upload}
                                alt="Additional Upload"
                                className={
                                  preview.additional_upload
                                    ? "set-show-preview"
                                    : "show-preview"
                                }
                              ></img>
                            </div>
                          </label>
                          <input
                            name="additional_upload"
                            type="file"
                            accept="image/*"
                            className="image-file"
                            onChange={fileHandler}
                          />
                        </div>
                        <div className="">
                          <input
                            type="text"
                            name="additional_upload_desc"
                            className="image-input-box "
                            placeholder="Description"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="additional_upload_com"
                            className="image-input-box "
                            placeholder="Community"
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="form-row property-form-padder">
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Price</label>
                    <input
                      name="price"
                      type="number"
                      placeholder="Price"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Bedrooms</label>
                    <input
                      name="bedrooms"
                      type="number"
                      placeholder="Bedrooms"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Bathrooms</label>
                    <input
                      name="bathrooms"
                      type="number"
                      placeholder="Bathrooms"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row ">
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">
                      Property Status
                    </label>

                    <input
                      name="property_status"
                      type="text"
                      placeholder="Property Status"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Location</label>
                    {/* <input
                      name="location"
                      type="text"
                      placeholder="location"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    /> */}
                    <PlacesAutocomplete
                      value={location}
                      onChange={handleChangeAddress}
                      onSelect={handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "location",
                              className: "property-form-input",
                            })}
                            required
                          />

                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    {/* <input
                      name="location"
                      type="text"
                      placeholder="Location"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    /> */}
                  </div>
                </div>
              </div>

              <div className="form-row ">
                {/* <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Location</label>

                    <input
                      name="location"
                      type="text"
                      placeholder="Location"
                      className="property-form-input"
                      // onChange={handleChange}
                      onChange={handleChange}
                      required
                    />

                    <GooglePlacesAutocomplete
                      placeholder="Location"
                      name="location"
                      className="form-control property-form-input"
                      onSelect={(result) => {
                        console.log("result", result);
                      }}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
                {/* <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Area</label>
                    <input
                      name="area"
                      type="number"
                      placeholder="Area"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div> */}
              </div>

              <div className="form-row property-form-padder">
                <div className="form-group col-sm-6">
                  <div>
                    <label className="property-from-label">Area/postcode</label>

                    <input
                      name="postcode"
                      type="number"
                      placeholder="Area/postcode"
                      className="property-form-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6"></div>
              </div>

              {/* <div className="form-row property-form-padder">
                <div className="form-group col-sm-12">
                  <label className="property-from-label">Description</label>
                  <textarea
                    type="textarea"
                    name="description"
                    className="form-control description-input"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                    rows="7"
                  />
                </div>
              </div> */}

              <div className=" amenities-box">
                <div className="row">
                  <div className="col-6 amenities">Area</div>
                  <div className="col-6">
                    <div className="on-button-block">
                      <label for="toggle">
                        <Switch
                          onChange={handleChangeSwitch}
                          checked={checkedSwitch}
                          value={checkedSwitch ? "1" : "0"}
                          height={34}
                          width={75}
                          handleDiameter={27}
                          className="react-switch"
                          uncheckedIcon={<div className="off-button">OFF</div>}
                          checkedIcon={<div className="on-button">ON</div>}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <hr></hr>

                <div className="form-row">
                  <div className="form-group col-sm-3 area-checkbox">
                    <input
                      type="checkbox"
                      name="chk1"
                      value="Wifi"
                      className="amenities-checkbox"
                      onChange={handleChange}
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                    <label className="amenities-checkbox-name">Wifi</label>
                  </div>
                  <div className="col-sm-8 form-group ">
                    <input
                      type="text"
                      name="url_path1"
                      className="form-control amenities-textbox"
                      placeholder="Enter URL"
                      onChange={handleChange}
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                  </div>
                  <div className="col-sm-1 ">
                    <img
                      src={icon_two}
                      alt="icon"
                      className="amenities-images"
                    />
                  </div>
                </div>

                <div className="form-row form-padder">
                  <div className="form-group col-sm-3 area-checkbox">
                    <input
                      type="checkbox"
                      name="chk2"
                      className="amenities-checkbox"
                      onChange={handleChange}
                      value="Smoking allowed"
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                    <label className="amenities-checkbox-name">
                      Smoking allowed
                    </label>
                  </div>
                  <div className="col-sm-8 form-group ">
                    <input
                      type="text"
                      name="url_path2"
                      className="form-control amenities-textbox"
                      placeholder="Enter URL"
                      onChange={handleChange}
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                  </div>
                  <div className="col-sm-1 ">
                    <img
                      src={icon_two}
                      alt="icon"
                      className="amenities-images"
                    />
                  </div>
                </div>

                <div className="form-row form-padder">
                  <div className="form-group col-sm-3 area-checkbox">
                    <input
                      type="checkbox"
                      name="chk3"
                      className="amenities-checkbox"
                      onChange={handleChange}
                      value="DishWasher"
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                    <label className="amenities-checkbox-name">
                      DishWasher
                    </label>
                  </div>
                  <div className="col-sm-8 form-group ">
                    <input
                      type="text"
                      name="url_path3"
                      className="form-control amenities-textbox"
                      placeholder="Enter URL"
                      onChange={handleChange}
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                  </div>
                  <div className="col-sm-1">
                    <img
                      src={icon_two}
                      alt="icon"
                      className="amenities-images"
                    />
                  </div>
                </div>

                <div className="form-row form-padder">
                  <div className="form-group col-sm-3 area-checkbox">
                    <input
                      type="checkbox"
                      name="chk4"
                      className="amenities-checkbox"
                      onChange={handleChange}
                      value="Cable-tv"
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                    <label className="amenities-checkbox-name">Cable-tv</label>
                  </div>
                  <div className="col-sm-8 form-group ">
                    <input
                      type="text"
                      className="form-control amenities-textbox"
                      placeholder="Enter URL"
                      onChange={handleChange}
                      name="url_path4"
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                  </div>
                  <div className="col-sm-1 ">
                    <img
                      src={icon_two}
                      alt="icon"
                      className="amenities-images"
                    />
                  </div>
                </div>

                <div className="form-row form-padder">
                  <div className="form-group col-sm-3 area-checkbox">
                    <input
                      type="checkbox"
                      name="chk5"
                      className="amenities-checkbox"
                      onChange={handleChange}
                      value="Animals allowed"
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                    <label className="amenities-checkbox-name">
                      Animals allowed
                    </label>
                  </div>
                  <div className="col-sm-8 form-group ">
                    <input
                      type="text"
                      className="form-control amenities-textbox"
                      placeholder="Enter URL"
                      name="url_path5"
                      onChange={handleChange}
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                  </div>
                  <div className="col-sm-1">
                    <img
                      src={icon_two}
                      alt="icon"
                      className="amenities-images"
                    />
                  </div>
                </div>

                <div className="form-row form-padder">
                  <div className="form-group col-sm-3 area-checkbox">
                    <input
                      type="checkbox"
                      name="chk6"
                      className="amenities-checkbox"
                      onChange={handleChange}
                      value="Washing Machine"
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                    <label className="amenities-checkbox-name">
                      Washing Machine
                    </label>
                  </div>
                  <div className="col-sm-8 form-group ">
                    <input
                      type="text"
                      className="form-control amenities-textbox"
                      placeholder="Enter URL"
                      name="url_path6"
                      onChange={handleChange}
                      disabled={checkedSwitch ? "" : "disabled"}
                    />
                  </div>
                  <div className="col-sm-1 ">
                    <img
                      src={icon_two}
                      alt="icon"
                      className="amenities-images"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row property-form-padder community-box">
                {/* <div className="form-group col-sm-12">
                  <label className="property-from-label">Community</label>
                  <textarea
                    type="textarea"
                    name="community"
                    onChange={handleChange}
                    className="form-control description-input"
                    placeholder="Community"
                    rows="7"
                    required
                  />
                </div> */}
              </div>
              <div className="create-button-block mt-5">
                <Button className="create-button">CREATE</Button>
              </div>
            </div>
          </form>
        </section>
        <section></section>
        <Footer />
      </div>
    </div>
  );
};

export default Sell;
