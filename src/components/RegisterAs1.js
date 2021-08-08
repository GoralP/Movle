import React, { useState } from "react";
import register_as from "../imgs/register_as.png";
import { Modal, ModalBody, Button } from "reactstrap";
import { Buyer } from "../components";
import { Link } from "react-router-dom";

const ForgotPassword = ({ modalRegister, toggleRegister }) => {
  const [modalBuyer, setModalBuyer] = useState(false);

  const toggleBuyer = () => setModalBuyer(!modalBuyer);

  return (
    <div>
      <Modal size="lg" isOpen={modalRegister} toggle={toggleRegister}>
        <ModalBody>
          <div className="register-as">
            <img src={register_as} alt="register" />
          </div>
          <div className="reagister-title">REGISTER AS</div>

          <div className="register-block">
            <Link to="/sell">
              <Button type="submit" className="modal-btn" onClick="test('seller')">
                SELLER
              </Button>
            </Link>
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

export default ForgotPassword;
