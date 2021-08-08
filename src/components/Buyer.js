import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import login_logo from "../imgs/login.png";
import { Range, ValueRange } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registration } from "../redux/actions";

const signUpSchema = yup.object().shape({
  beds: yup.string().required("Beds is a required field."),
  buyers_type: yup.string().required("Type is a required field."),
  style: yup.string().required("Style is a required field."),
});

const Buyer = ({ modalBuyer, toggleBuyer }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    var regData = localStorage.getItem("registerData");
    regData = JSON.parse(regData);
    regData.user_type = "buyer";
    regData.min_size_range = localStorage.getItem("min_size_range") ?? "0";
    regData.max_size_range = localStorage.getItem("max_size_range") ?? "0";
    regData.min_value_range = localStorage.getItem("min_value_range") ?? "0";
    regData.max_value_range = localStorage.getItem("max_value_range") ?? "0";
    regData = { ...data, ...regData };
    // console.log("regData", regData);
    dispatch(registration(regData, history));
  };

  return (
    <div>
      <Modal size="lg" isOpen={modalBuyer}>
        <ModalHeader toggle={toggleBuyer} className="how-to-header">
          <img src={login_logo} alt="login logo" className="mr-3" />
          <span className="log-in-title">SIGN UP</span>
        </ModalHeader>

        <ModalBody>
          <Form className="form__padder" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormGroup>
                <Label className="property-from-label">Beds</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="beds"
                  type="number"
                  placeholder="Beds"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.beds && (
                  <span className="text-danger">{errors.beds.message}</span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Type</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="buyers_type"
                  type="text"
                  placeholder="Type"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.buyers_type && (
                  <span className="text-danger">
                    {errors.buyers_type.message}
                  </span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Style</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="style"
                  type="text"
                  placeholder="Style"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.style && (
                  <span className="text-danger">{errors.style.message}</span>
                )}
              </FormGroup>
            </div>

            <div className="form-row-padder">
              <p className="property-from-label">Size Range</p>
              <ValueRange />
            </div>

            <div className="form-row-padder">
              <p className="property-from-label">Value Range</p>
              <Range />
            </div>

            <div className="pb-1 mt-3">
              <Button type="submit" className="modal-btn mb-5">
                SIGN UP
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Buyer;
