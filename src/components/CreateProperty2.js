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
import { Button } from "reactstrap";
import rectangle from "../imgs/rectangle.png";
import { FaPlus } from "react-icons/fa";
import icon_two from "../imgs/icon2.png";
import { useSelector } from "react-redux";
import { deleteProperty, updateProperty } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { getSingleProperty } from "../redux/actions";
import Switch from "react-switch";

const CreateProperty = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, singleData } = useSelector((state) => ({
    loading: state.propertyReducers.getSingleProperty.loading,
    singleData: state.propertyReducers.getSingleProperty.singleData,
  }));

  const [checkedBox, setCheckedBox] = useState(false);
  const checktoggle = () => setCheckedBox(!checkedBox);

  const [living, setLiving] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [external, setExternal] = useState(false);
  const [building, setBuilding] = useState(false);
  const [anything, setAnything] = useState(false);
  const [search, setSearch] = useState("");

  const livingToggle = () => setLiving(!living);
  const roomsToggle = () => setRooms(!rooms);
  const externalToggle = () => setExternal(!external);
  const buildingToggle = () => setBuilding(!building);
  const anythingToggle = () => setAnything(!anything);

  const [checkedSwitch, setChecked] = useState(
    singleData && singleData.is_area == 1 ? true : false
  );
  // console.log("is_area_chk", checkedSwitch);

  // const { loading, singleData } = useSelector((state) => ({
  //   loading: state.propertyReducers.getSingleProperty.loading,
  //   singleData: state.propertyReducers.getSingleProperty.singleData,
  // }));

  const [formData, updateFormData] = useState("");
  const [preview, setPreview] = useState("");

  const handleChangeSwitch = (nextChecked) => {
    setChecked(nextChecked);

    updateFormData({
      ...formData,
      is_area: nextChecked ? "1" : "0",
    });
  };

  useEffect(() => {
    dispatch(getSingleProperty(""));
    var isAreaChecked = singleData && singleData.is_area == 1 ? true : false;
    setChecked(isAreaChecked);
  }, [dispatch]);

  var dataobj = {};
  for (let key in singleData) {
    dataobj[key] = singleData[key];
  }

  const handleChange = (e) => {
    updateFormData({
      ...dataobj,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(dataobj);
  };

  // var propertyType = "";
  // const handleChangeCheckbox = (e) => {
  //   propertyType =
  //     dataobj && dataobj[e.target.name] !== undefined
  //       ? dataobj[e.target.name]
  //       : "";

  //   var checkboxval = e.target.value.trim() + ",";
  //   console.log("prptype", propertyType);
  //   console.log("checkbox", checkboxval);
  //   console.log("othercheck", dataobj);
  //   if (e.target.checked) {
  //     // propertyType += checkboxval;
  //     propertyType += checkboxval;
  //   } else {
  //     propertyType = propertyType.replace(checkboxval, "");
  //   }
  //   console.log("propertyType", propertyType);

  //   updateFormData({
  //     ...dataobj,
  //     [e.target.name]: propertyType,
  //   });
  //   console.log("prvdata", dataobj);
  //   console.log("chk", propertyType);
  // };

  var propertyType = "";

  const handleChangeCheckbox = (e) => {
    if (checkboxval != "") {
      propertyType =
        dataobj && dataobj[e.target.name] !== undefined
          ? dataobj[e.target.name]
          : "";
      var checkboxval = "";
      if (e.target.checked == true) {
        checkboxval = e.target.value.trim() + ",";
      }
      console.log("prptype", propertyType);
      console.log("checkbox", checkboxval);
      if (e.target.checked === true) {
        propertyType += checkboxval;
        console.log("ifcheck", propertyType);
      } else {
        propertyType = propertyType.replace(checkboxval, "");

        console.log("elsecheck", propertyType);
      }

      updateFormData({
        ...dataobj,
        [e.target.name]: propertyType,
      });
      console.log("chk", propertyType);
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

  const onUpdate = (e) => {
    e.preventDefault();

    dispatch(updateProperty(formData, history));
    console.log("Updated FormData", formData);
  };

  const removeProperty = () => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this record file!!",
      icon: "warning",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        no: {
          text: "Cancel",
          value: "no",
          className: "sweet-cancel btn-center",
        },
        yes: {
          text: "Yes, delete it!",
          value: "yes",
          className: "sweet-warning btn-center",
        },
      },
    }).then((value) => {
      if (value === "yes") {
        dispatch(deleteProperty());
        swal({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: {
            ok: {
              text: "Ok",
              className: "sweet-ok swal-footer",
            },
          },
        });
      }
      return false;
    });
  };

  return (
    <div className="container-fluid">
      <Navigation />

      <section className="buyer-browse-image all-image">
        BUILD YOUR PROPERTY PROFILE
      </section>
      <div className="main-criteria-bg">
        <section>
          {loading ? (
            <div>Loading....</div>
          ) : (
            singleData !== null && (
              <form enctype="multipart/form-data">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="sell-criteria-box white-box-shadow">
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
                            <div className="col-sm-6 ">
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
                                onChange={handleChangeCheckbox}
                              />
                              <label>Detached</label>
                            </div>

                            <div className="col-sm-4 ">
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
                                onChange={handleChangeCheckbox}
                              />
                              <label>Terrace</label>
                            </div>
                            <div className="col-sm-6">
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
                                onChange={handleChangeCheckbox}
                              />
                              <label>Semi-Detached</label>
                            </div>
                            <div className="col-sm-4 ">
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
                                onChange={handleChangeCheckbox}
                              />
                              <label>Bungalow</label>
                            </div>
                            <div className="col-sm-4 ">
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
                                defaultChecked={
                                  singleData.ready_to_sell &&
                                  singleData.ready_to_sell.includes("Move") !==
                                    false
                                    ? "checked"
                                    : ""
                                }
                                value="Move"
                                defaultValue={singleData.ready_to_sell}
                                onChange={handleChangeCheckbox}
                              />
                              <label>Move</label>
                            </div>
                            <div className="col-sm-4 ">
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
                                onChange={handleChangeCheckbox}
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
                                  <div className="col-sm-4 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Mature</label>
                                  </div>
                                  <div className="col-sm-5 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Landscaped</label>
                                  </div>
                                  <div className="col-sm-3 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Lawn</label>
                                  </div>
                                  <div className="col-sm-4 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Artificial</label>
                                  </div>
                                  <div className="col-sm-5 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Dacking</label>
                                  </div>
                                  <div className="col-sm-3 ">
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
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Street</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Car Park</label>
                                  </div>
                                  <div className="col-sm-6">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Private Road</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Single Garage</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>New Build</label>
                                  </div>
                                  <div className="col-sm-4">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Period</label>
                                  </div>
                                  <div className="col-sm-5 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Townhouse</label>
                                  </div>
                                  <div className="col-sm-4">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Listed</label>
                                  </div>
                                  <div className="col-sm-7 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>New Build</label>
                                  </div>
                                  <div className="col-sm-6">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Refurbished</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Part Refurbish</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Triple Glazed</label>
                                  </div>
                                  <div className="col-sm-6">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Double Glazed</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Single Glaze</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>bay</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                  <div className="col-sm-3 ">
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
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>High Ceilings</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Cornicing</label>
                                  </div>
                                  <div className="col-sm-6">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Stain glass</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Shutters</label>
                                  </div>
                                  <div className="col-sm-6">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Original Floors</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Thatched Roof</label>
                                  </div>
                                  <div className="col-sm-8 ">
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
                                      onChange={handleChangeCheckbox}
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
                                  <div className="col-sm-4 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Loft</label>
                                  </div>

                                  <div className="col-sm-4">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Garage</label>
                                  </div>
                                  <div className="col-sm-4 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Land</label>
                                  </div>
                                  <div className="col-sm-5 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Central</label>
                                  </div>
                                  <div className="col-sm-5 ">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Gas</label>
                                  </div>
                                  <div className="col-sm-5">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Combi</label>
                                  </div>
                                  <div className="col-sm-5">
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
                                      onChange={handleChangeCheckbox}
                                    />
                                    <label>Fire Place</label>
                                  </div>
                                  <div className="col-sm-6 ">
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
                      </div>
                    </div>

                    <div className=" col-sm-8 px ">
                      <div className="upload__image-wrapper">
                        <div className="row front-house-images">
                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">
                              Front Of House
                            </div>

                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.front_house_img
                                      ? singleData.front_house_img
                                      : rectangle
                                  }
                                  alt="front house"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.front_house_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
                                </div>
                                <div className="picture-preview">
                                  <img
                                    // src={formData.image1}
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
                                // defaultValue={singleData.front_house_img}
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
                                defaultValue={singleData.front_house_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="front_house_img_com"
                                className="image-input-box "
                                placeholder="Community"
                                defaultValue={singleData.front_house_img_com}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">Lounge</div>
                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.lounge_img
                                      ? singleData.lounge_img
                                      : rectangle
                                  }
                                  alt="Lounge"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.lounge_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.lounge_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="lounge_img_com"
                                className="image-input-box "
                                defaultValue={singleData.lounge_img_com}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">
                              Back of House
                            </div>
                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.back_house_img
                                      ? singleData.back_house_img
                                      : rectangle
                                  }
                                  alt="Back of House"
                                  className="sell-property-image "
                                />
                                <div className="centered-text">
                                  {singleData.back_house_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.back_house_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="back_house_img_com"
                                className="image-input-box "
                                defaultValue={singleData.back_house_img_com}
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
                                  src={
                                    singleData.bed1_img
                                      ? singleData.bed1_img
                                      : rectangle
                                  }
                                  alt="Bed 1"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.bed1_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.bed1_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="bed1_img_com"
                                className="image-input-box "
                                defaultValue={singleData.bed1_img_com}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">Bed 2</div>
                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.bed2_img
                                      ? singleData.bed2_img
                                      : rectangle
                                  }
                                  alt="Bed 2"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.bed2_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.bed2_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="description"
                                className="image-input-box "
                                defaultValue={singleData.bed2_img_com}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">Kitchen</div>
                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.kitchen_img
                                      ? singleData.kitchen_img
                                      : rectangle
                                  }
                                  alt="Kitchen"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.kitchen_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.kitchen_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="kitchen_img_com"
                                className="image-input-box "
                                defaultValue={singleData.kitchen_img_com}
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
                                  src={
                                    singleData.reception_img
                                      ? singleData.reception_img
                                      : rectangle
                                  }
                                  alt="Reception"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.reception_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.reception_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="reception_img_com"
                                className="image-input-box "
                                defaultValue={singleData.reception_img_com}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">Garden</div>
                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.garden_img
                                      ? singleData.garden_img
                                      : rectangle
                                  }
                                  alt="Garden"
                                  className="sell-property-image "
                                />
                                <div className="centered-text ">
                                  {singleData.garden_img ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.garden_img_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="garden_img_com"
                                className="image-input-box "
                                defaultValue={singleData.garden_img_com}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div className="front-of-house pl-2">
                              Additional Upload
                            </div>
                            <div className="house-wrapper">
                              <label className="property-from-label">
                                <img
                                  src={
                                    singleData.additional_upload
                                      ? singleData.additional_upload
                                      : rectangle
                                  }
                                  alt="Additional Upload"
                                  className="sell-property-image"
                                />
                                <div className="centered-text ">
                                  {singleData.additional_upload ? (
                                    ""
                                  ) : (
                                    <FaPlus className="plus-icon" />
                                  )}
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
                                defaultValue={singleData.additional_upload_desc}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="additional_upload_com"
                                className="image-input-box "
                                defaultValue={singleData.additional_upload_com}
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
                          defaultValue={singleData.name}
                          className="property-form-input"
                          onChange={handleChange}
                        />
                      </div>
                      <div></div>
                    </div>
                    <div className="form-group col-sm-6">
                      <div>
                        <label className="property-from-label">Price</label>
                        <input
                          name="price"
                          type="text"
                          defaultValue={singleData.price}
                          className="property-form-input"
                          onChange={handleChange}
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
                          type="text"
                          defaultValue={singleData.bedrooms}
                          className="property-form-input"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-6">
                      <div>
                        <label className="property-from-label">Bathrooms</label>
                        <input
                          name="bathrooms"
                          type="text"
                          defaultValue={singleData.bathrooms}
                          className="property-form-input"
                          onChange={handleChange}
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
                          defaultValue={singleData.property_status}
                          className="property-form-input"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-6">
                      <div>
                        <label className="property-from-label">Location</label>
                        <input
                          name="location"
                          type="text"
                          defaultValue={singleData.location}
                          className="property-form-input"
                          onChange={handleChange}
                        />
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
                          defaultValue={singleData.location}
                          className="property-form-input"
                          onChange={handleChange}
                        />
                      </div>
                    </div> */}
                    {/* <div className="form-group col-sm-6">
                      <div>
                        <label className="property-from-label">Area</label>
                        <input
                          name="area"
                          type="text"
                          defaultValue={singleData.area}
                          className="property-form-input"
                          onChange={handleChange}
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className="form-row property-form-padder">
                    <div className="form-group col-sm-6">
                      <div>
                        <label className="property-from-label">
                          Area/postcode
                        </label>

                        <input
                          name="postcode"
                          type="text"
                          defaultValue={singleData.postcode}
                          className="property-form-input"
                          onChange={handleChange}
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
                        defaultValue={singleData.description}
                        className="form-control description-input"
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
                          <Switch
                            onChange={handleChangeSwitch}
                            checked={checkedSwitch}
                            // defaultChecked={
                            //   singleData.is_area == 1 ? true : false
                            // }
                            height={34}
                            width={75}
                            defaultValue={singleData.is_area}
                            handleDiameter={27}
                            className="react-switch"
                            uncheckedIcon={
                              <div className="off-button">OFF</div>
                            }
                            checkedIcon={<div className="on-button">ON</div>}
                          />
                          <input defaultValue={singleData.is_area} />
                        </div>
                      </div>
                    </div>
                    <hr></hr>

                    {singleData.is_area == 0 ? (
                      <>
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
                            <label className="amenities-checkbox-name">
                              Wifi
                            </label>
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
                            <label className="amenities-checkbox-name">
                              Cable-tv
                            </label>
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
                          <div className="col-sm-1">
                            <img
                              src={icon_two}
                              alt="icon"
                              className="amenities-images"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      singleData.area_details &&
                      singleData.area_details.map((item) => (
                        <div className="form-row form-padder">
                          <div className="form-group col-sm-3 area-checkbox">
                            <input
                              id={item.pr_ar_id}
                              type="checkbox"
                              name={"chk" + item.pr_ar_id}
                              defaultChecked={
                                item.is_checked == 1 ? "checked" : ""
                              }
                              defaultValue={item.ar_name}
                              className="amenities-checkbox"
                              onChange={handleChange}
                            />
                            <label className="amenities-checkbox-name">
                              {item.ar_name}
                            </label>
                          </div>
                          <div className="col-sm-8 form-group ">
                            <input
                              type="text"
                              name={"url_path" + item.pr_ar_id}
                              className="form-control amenities-textbox"
                              defaultValue={item.url_path}
                              onChange={handleChange}
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
                      ))
                    )}

                    {/* <div className="form-row form-padder">
                      <div className="form-group col-sm-3 area-checkbox">
                        <input
                          type="checkbox"
                          name="chk3"
                          className="amenities-checkbox"
                          onChange={handleChange}
                          value="DishWasher"
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
                        />
                        <label className="amenities-checkbox-name">
                          Cable-tv
                        </label>
                      </div>
                      <div className="col-sm-8 form-group ">
                        <input
                          type="text"
                          className="form-control amenities-textbox"
                          placeholder="Enter URL"
                          onChange={handleChange}
                          name="url_path4"
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
                          name="chk6"
                          className="amenities-checkbox"
                          onChange={handleChange}
                          value="Washing Machine"
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
                        />
                      </div>
                      <div className="col-sm-1 ">
                        <img
                          src={icon_two}
                          alt="icon"
                          className="amenities-images"
                        />
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="form-row property-form-padder community-box">
                    <div className="form-group col-sm-12">
                      <label className="property-from-label">Community</label>
                      <textarea
                        type="textarea"
                        name="community"
                        defaultValue={singleData.community}
                        onChange={handleChange}
                        className="form-control description-input"
                        rows="7"
                        required
                      />
                    </div>
                  </div> */}
                  <div className="create-button-block mt-5">
                    <Button className="create-button" onClick={removeProperty}>
                      DELETE
                    </Button>
                    <Button
                      className="create-button update-btn"
                      onClick={onUpdate}
                    >
                      UPDATE
                    </Button>
                  </div>
                </div>
              </form>
            )
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default CreateProperty;
