import React, { useEffect } from "react";
import { Navigation, Footer } from "../components";
import { FaMapMarkerAlt, FaBed, FaBath, FaArrowsAltV } from "react-icons/fa";
import { Link } from "react-router-dom";

import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import defaultImage from "../imgs/default_house_image.png";
import { Button } from "reactstrap";
import {
  allProperty,
  getSingleProperty,
  deleteProperty,
} from "../redux/actions";

const ViewProperties = () => {
  const dispatch = useDispatch();

  const { loading, propertyData } = useSelector((state) => ({
    loading: state.propertyReducers.allProperties.loading,
    propertyData: state.propertyReducers.allProperties.propertyData,
  }));

  // var count = Object.keys(propertyData).length;

  // console.log("gv", count);

  // if (propertyData.length > 0) {
  //   console.log("hiii");
  // }
  console.log("allProperty", propertyData);

  useEffect(() => {
    dispatch(allProperty());
  }, [dispatch]);

  const removeProperty = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this record file! !",
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
        console.log(id);
        dispatch(deleteProperty(id));
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
        VIEW MY PROPERTIES
      </section>
      <section className="main-criteria-bg">
        <div className="container">
          <div className="view-properties-padder">
            {loading ? (
              <div>Loading...</div>
            ) : (
              propertyData !== null &&
              propertyData.map((item) => (
                <div>
                  <div className="row view-list-item  mb-3">
                    <div className="col-sm-2  list-item-image">
                      <img
                        src={
                          item.front_house_img
                            ? item.front_house_img
                            : defaultImage
                        }
                        alt="list"
                        className="view-preoperties-list-image"
                      />
                    </div>
                    <div className="col-sm-7 mx-2 mt-2">
                      <div className="row">
                        <div className="col-8 p__block mt-1 view-property-name">
                          {item.name}
                        </div>
                        <div className="col-4 mt-1 text-center view-price">
                          <span className="">${item.price}</span>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-12">
                          <FaMapMarkerAlt className="icon-location" />
                          <span className="view-property-address">
                            {item.location}
                          </span>
                        </div>
                      </div>
                      <div className="row view-property-address my-1 view-property-line">
                        <div className="col-4">
                          <FaBed className="mx-1" />
                          {item.bedrooms} Beds
                        </div>
                        <div className="col-4 text-center">
                          <FaBath className="mr-1" />
                          {item.bathrooms} Baths
                        </div>
                        <div className="col-4 text-center t-block">
                          <FaArrowsAltV className="mr-1" />
                          {item.area} Sq Ft
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 view-property-address mt-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2 view-action text-center ">
                      <Link to="/createproperty">
                        <Button
                          className="property-edit-button"
                          onClick={() => {
                            dispatch(getSingleProperty(item.id));
                          }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <br></br>
                      <Button
                        className="property-delete-button"
                        onClick={() => {
                          removeProperty(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default ViewProperties;
