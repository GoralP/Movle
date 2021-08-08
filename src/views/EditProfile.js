import React, { useState } from "react";
import { Navigation, ChangePassword } from "../components";
import { Footer } from "../components";

import { updateProfile } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import userprofile from "../imgs/default_profile_image.png";

const EditProfile = () => {
  const [modalPassword, setModalPassword] = useState(false);
  const [formData, updateFormData] = useState("");
  const [preview, setPreview] = useState("");
  const toggleModalPassword = () => setModalPassword(!modalPassword);

  const dispatch = useDispatch();
  const history = useHistory();
  // const getId = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const user_name = localStorage.getItem("name");
  const user_location = localStorage.getItem("location");
  const profile_picture = localStorage.getItem("profilePicture");
  const user_type = localStorage.getItem("user_type");
  console.log("user", user_type);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
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
    dispatch(updateProfile(formData, history));
    // console.log(formData);
  };

  return (
    <div className="container-fluid">
      <Navigation />
      <section className="buyer-browse-image all-image">EDIT PROFILE</section>
      <div className="main-criteria-bg">
        <section className="container">
          <div className="profile-image"></div>
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div>
              <FormGroup>
                <div className="profile-image">
                  <div className="house-wrapper">
                    <label>
                      <img
                        src={profile_picture ? profile_picture : userprofile}
                        alt="front house"
                        className="edit-profile-image"
                      />

                      <div className="picture-preview">
                        <img
                          src={preview.profile_image}
                          alt="front house"
                          className={
                            preview.profile_image
                              ? "set-show-preview edit-profile-image"
                              : "show-preview edit-profile-image"
                          }
                        ></img>
                      </div>
                    </label>

                    <input
                      name="profile_image"
                      type="file"
                      accept="image/*"
                      className="image-file"
                      onChange={fileHandler}
                    />
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <label className="property-from-label">Name</label>
                <br></br>
                <input
                  name="name"
                  type="text"
                  defaultValue={user_name}
                  className="edit-profile-input"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <label className="property-from-label">Email</label>
                <input
                  name="email"
                  type="text"
                  disabled
                  defaultValue={`${email}`}
                  className="edit-profile-input"
                  // onChange={handleChange}
                  required
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <label className="property-from-label">Location</label>
                <input
                  name="location"
                  type="text"
                  defaultValue={`${user_location}`}
                  className="edit-profile-input"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </div>

            <div className="pb-2">
              <Button type="submit" className="save-btn">
                SAVE
              </Button>
            </div>
          </form>
          <div className="pb-2 ">
            <Button
              type="submit"
              className="change-password-btn"
              onClick={() => {
                toggleModalPassword();
              }}
            >
              CHANGE PASSWORD
            </Button>
          </div>
          <div className="pb-5 ">
            <Link to="/viewproperties" style={{ textDecoration: "none" }}>
              {user_type === "seller" ? (
                <Button type="submit" className="change-password-btn">
                  VIEW PROPERTIES
                </Button>
              ) : (
                ""
              )}

              {/* <Button className="change-password-btn">VIEW PROPERTIES</Button> */}
            </Link>
          </div>
          {modalPassword && (
            <ChangePassword
              modalPassword={modalPassword}
              toggleModalPassword={toggleModalPassword}
            />
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
