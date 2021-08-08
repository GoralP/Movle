import React, { useState } from "react";
import register_as from "../imgs/register_as.png";
import { Modal, ModalBody, Button, ModalHeader } from "reactstrap";
import { Buyer } from "../components";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registration } from "../redux/actions";

const RegisterAs = ({ modalRegister, setModalRegister, toggleRegister }) => {
  const [modalBuyer, setModalBuyer] = useState(false);

  const toggleBuyer = () => setModalBuyer(!modalBuyer);

  const dispatch = useDispatch();
  const history = useHistory();
  const registerSeller = () => {
    var regData = localStorage.getItem("registerData");
    regData = JSON.parse(regData);
    regData.user_type = "seller";
    dispatch(registration(regData, history));
  };

  return (
    <div>
      <Modal size="lg" isOpen={modalRegister}>
        <ModalHeader
          toggle={toggleRegister}
          // className="how-to-header"
        ></ModalHeader>
        <ModalBody>
          <div className="register-as">
            <img src={register_as} alt="register" />
          </div>
          <div className="reagister-title">REGISTER AS</div>

          <div className="register-block">
            <Button
              type="button"
              className="modal-btn"
              onClick={() => {
                registerSeller();
              }}
            >
              SELLER
            </Button>
          </div>
          <div className="register-block pb-3">
            <Button
              type="submit"
              className="modal-btn"
              onClick={() => {
                toggleBuyer();
              }}
            >
              BUYER
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {modalBuyer && (
        <Buyer
          modalBuyer={modalBuyer}
          setModalBuyer={setModalBuyer}
          toggleBuyer={toggleBuyer}
        />
      )}
    </div>
  );
};

export default RegisterAs;
