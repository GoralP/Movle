import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  NavItem,
  NavLink,
} from "reactstrap";
import { Accord, Login, SignUp } from "../components";
import logo from "../imgs/movle_logo.png";
import userprofile from "../imgs/default_profile_image.png";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { howTo } from "../redux/actions";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const [modalLogin, setModalLogin] = useState(false);

  const toggleLogin = () => setModalLogin(!modalLogin);

  const [modalSignUp, setModalSignUp] = useState(false);

  const toggleSignUp = () => setModalSignUp(!modalSignUp);
  const user_type = localStorage.getItem("user_type");
  const history = useHistory();

  const profile = localStorage.getItem("profilePicture");
  const token = localStorage.getItem("token");

  const logout = () => {
    if (localStorage.clear("tokenn")) {
      history.push("/");
    } else {
      history.push("/");
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

  return (
    <div className=" navbar-bg container block">
      <Navbar className="header" light expand="md">
        <NavbarBrand>
          <img className="app-logo" src={logo} alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="rightNav ml-auto" navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/"
                className="navbar-link link-item"
                activeClassName="active"
                exact
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/search"
                className="navbar-link link-item"
                activeClassName="active"
                exact
              >
                Search
              </NavLink>
            </NavItem>
            {token && user_type === "seller" ? (
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/sell"
                  className="navbar-link link-item"
                  activeClassName="active"
                  exact
                >
                  Sell
                </NavLink>
              </NavItem>
            ) : (
              ""
            )}
            {/* <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/sell"
                className="navbar-link link-item"
                activeClassName="active"
                exact
              >
                Sell
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                className="navbar-link link-item"
                onClick={toggleModal}
                style={{ cursor: "pointer" }}
              >
                How to
              </NavLink>
            </NavItem>
            {token ? (
              <Button className="navbar-log-in-button" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className="navbar-log-in-button"
                  onClick={() => {
                    toggleLogin();
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="navbar-sign-up-button"
                  onClick={() => {
                    toggleSignUp();
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}

            <NavItem>
              <Link to="/editprofile" className="navbar-link">
                {token ? (
                  profile ? (
                    <img
                      className="nav-profile-icon"
                      src={profile}
                      alt=""
                    ></img>
                  ) : (
                    <img
                      className="nav-profile-icon"
                      src={userprofile}
                      alt=""
                    ></img>
                  )
                ) : (
                  ""
                )}
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <Modal size="lg" isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} className="how-to-header">
          <span className="how-to-title">HOW TO</span>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div>Loading</div>
          ) : (
            <>
              {howToData !== null &&
                howToData.HowTo.map((item) => (
                  <Accord title={item.title} text={item.description} />
                ))}
            </>
          )}
        </ModalBody>
      </Modal>

      {modalLogin && (
        <Login
          modalLogin={modalLogin}
          setModalLogin={setModalLogin}
          toggleLogin={toggleLogin}
        />
      )}

      {modalSignUp && (
        <SignUp
          modalSignUp={modalSignUp}
          setModalSignUp={setModalSignUp}
          toggleSignUp={toggleSignUp}
        />
      )}
    </div>
  );
};

export default Navigation;
