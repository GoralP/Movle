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
import { Range } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

const signUpSchema = yup.object().shape({
  beds: yup.string().required("Beds is a required field."),
  buyers_type: yup.string().required("Type is a required field."),
  style: yup.string().required("Style is a required field."),
});

const Buyer = ({ modalBuyer, toggleBuyer }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div>
      <Modal size="lg" isOpen={modalBuyer} toggle={toggleBuyer}>
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
                  type="text"
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
              <p className="size-range">$20-$500</p>
              <Range />
            </div>

            <div className="form-row-padder">
              <p className="property-from-label">Value Range</p>
              <p className="size-range">2-10</p>
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
