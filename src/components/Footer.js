import React from "react";
import logo from "../imgs/footer_logo.png";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import footer_line from "../imgs/footer-line.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="container">
        <div className="row text-white ">
          <div className="col-sm-4 ">
            <div className="footer-content">
              <div>
                <img src={logo} alt="" />
              </div>
              <div className="footer-lorem-ipsum">
                Lorem Ipsum is simply dummy text of this's<br></br> printing and
                typesetting industry. Lorem to<br></br> Ipsum has been the
                industry's standard the<br></br> dummy text ever since the
                1500s.
              </div>
            </div>
          </div>

          <div className="footer-line">
            <img src={footer_line} alt="footer-line" />
          </div>

          <div className="col-sm-4 other-service-padder">
            <div className="footer-content">
              <div>
                <h3 className="h3-text">Other Services</h3>
              </div>
              <div className="footer-lorem-ipsum">
                <ul className="service-list">
                  <li>https://stackoverflow.com</li>
                  <li>https://www.google.com/search</li>
                  <li>https://stackoverflow.com/questions</li>
                  <li>https://www.google.com/search</li>
                  <li>https://stackoverflow.com/questions/1523</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-line">
            <img src={footer_line} alt="footer-line" />
          </div>

          <div className="col-sm-3 ">
            <div className="footer-content">
              <div>
                <h3 className="h3-text">Contact Us</h3>
              </div>
              <div className="contact-us-block ">
                <span className="location-outline">
                  <FaMapMarkerAlt className=" location-icon " />
                </span>

                <div className="lorem-ipsum-address">
                  <span className="location-title">Location</span>
                  <p className="ipsum-block">
                    Lorem Ipsum 1st Block 1st Cross, printing state,
                    industry-456
                  </p>
                </div>
              </div>
              <div className="contact-us-block">
                <span className="location-outline">
                  <FaEnvelope className=" location-icon " />
                </span>

                <div className="lorem-ipsum-address">
                  <span className="location-title">Email</span>
                  <p className="ipsum-block">Info@movle(1).com</p>
                </div>
              </div>
              <div className="contact-us-block">
                <span className="location-outline">
                  <FaPhoneAlt className=" location-icon " />
                </span>

                <div className="lorem-ipsum-address">
                  <span className="location-title">Phone</span>
                  <p className="ipsum-block">+1 256 8979000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-white"></hr>

        <div className=" text-white">
          <div className="row">
            <div className="col-sm-7 ipsum-block">
              Copyright @ 2020 Movle. All Rights Reservsed.
            </div>
            <div className="col-sm-4">
              <div className="footer-privacy">
                <a
                  href="http://kmphitech.com/MovleApi/public/privacy_policy.php"
                  target="_blank"
                  className="text-white"
                >
                  Privacy
                </a>

                <span className="mx-1">|</span>

                <a
                  href="http://kmphitech.com/MovleApi/public/terms_and_condition.php"
                  target="_blank"
                  className="text-white"
                >
                  Terms & Conditions
                </a>

                <span className="mx-1">|</span>
                <Link to="/contact" className="text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
