import React, { useState } from "react";
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
import { RegisterAs } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registration } from "../redux/actions";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is a required field."),
  email: yup.string().required("Email is a required field."),
  password: yup.string().required("Password is a required field."),
  location: yup.string().required("location is a required field."),
});

const SignUp = ({ modalSignUp, setModalSignUp, toggleSignUp }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const [modalRegister, setModalRegister] = useState(false);

  const toggleRegister = () => setModalRegister(!modalRegister);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(registration(data));
  };

  return (
    <div>
      <Modal size="lg" isOpen={modalSignUp} toggle={toggleSignUp}>
        <ModalHeader toggle={toggleSignUp} className="how-to-header">
          <img src={login_logo} alt="login logo" className="mr-3" />
          <span className="log-in-title">SIGN UP</span>
        </ModalHeader>

        <ModalBody>
          <Form className="form__padder" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* <label className="property-from-label">Name</label> */}
              {/* <input
                type="text"
                className="form-control login-inputs"
                placeholder="Name"
              /> */}

              <FormGroup>
                <Label className="property-from-label">Name</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="name"
                  type="text"
                  placeholder="Name"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Email</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="email"
                  type="text"
                  placeholder="Email Id"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </FormGroup>
            </div>

            {/* <div className="form-row form-row-padder">
              <label className="property-from-label">Password</label>
              <input
                type="text"
                className="form-control login-inputs "
                placeholder="Password"
              />
            </div> */}

            <div>
              <FormGroup>
                <Label className="property-from-label">Password</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </FormGroup>
            </div>

            {/* <div className="form-row form-row-padder ">
              <label className="property-from-label">Location</label>
              <input
                type="text"
                className="form-control login-inputs"
                placeholder="Location"
              />
            </div> */}

            <div>
              <FormGroup>
                <Label className="property-from-label">Location</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="location"
                  type="text"
                  placeholder="Location"
                  ref={register}
                  className="form-control login-inputs"
                />
                {errors && errors.location && (
                  <span className="text-danger">{errors.location.message}</span>
                )}
              </FormGroup>
            </div>

            <div className="pb-1 mt-3">
              <Button
                type="submit"
                className="modal-btn"
                onClick={() => {
                  toggleRegister();
                }}
              >
                NEXT
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {modalRegister && (
        <RegisterAs
          modalRegister={modalRegister}
          setModalRegister={setModalRegister}
          toggleRegister={toggleRegister}
        />
      )}
    </div>
  );
};

export default SignUp;
