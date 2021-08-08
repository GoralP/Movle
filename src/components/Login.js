import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormGroup,
  Button,
  Label,
} from "reactstrap";
import login_logo from "../imgs/login.png";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ForgotPassword } from "../components";
import { login } from "../redux/actions";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email id is a required field."),
  password: yup.string().required("Password is a required field."),
});

const Login = ({ modalLogin, setModalLogin, toggleLogin }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [modalForgot, setModalForgot] = useState(false);

  const toggleForgot = () => setModalForgot(!modalForgot);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login(data, history, setModalLogin));
    toggleLogin();
  };
  return (
    <div>
      <Modal size="lg" isOpen={modalLogin}>
        <ModalHeader toggle={toggleLogin} className="how-to-header">
          <img src={login_logo} alt="login logo" className="mr-3" />
          <span className="log-in-title">LOG IN</span>
        </ModalHeader>

        <ModalBody>
          <Form className="form__padder" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormGroup>
                <Label className="property-from-label">Email</Label>
                <Controller
                  as={Input}
                  id="user"
                  control={control}
                  name="email"
                  type="text"
                  placeholder="Email Id"
                  defaultValue=""
                  ref={register}
                  className="login-inputs"
                />
                {errors && errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label className="property-from-label">Password</Label>
                <Controller
                  as={Input}
                  id="pwd"
                  control={control}
                  name="password"
                  type="password"
                  placeholder="Password"
                  defaultValue=""
                  ref={register}
                  className="login-inputs"
                />
                {errors && errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </FormGroup>
            </div>

            <div className="form-row">
              <div className="col-sm-6">
                <input type="checkbox" className="rememberme-checkbox" />
                <span className="remember-me">Remember me</span>
              </div>
              <div className="col-sm-6">
                <div className="forgot-password" onClick={toggleForgot}>
                  Forgot your password?
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="log-in-button">
                LOGIN
              </Button>
            </div>
          </Form>
          <div className="form__padder">
            <div className="or-line ">
              <span className="or-text">or</span>
            </div>
          </div>
          <div className="row form__padder pb-4">
            <div className="col-sm-6">
              <button className="google-btn">
                <FcGoogle className="google-icon" />
                Continue With Google
              </button>
            </div>
            <div className="col-sm-6">
              <button className="facebook-btn">
                <FaFacebookF className="google-icon" />
                Continue With Facebook
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {modalForgot && (
        <ForgotPassword
          modalForgot={modalForgot}
          setModalForgot={setModalForgot}
          toggleForgot={toggleForgot}
        />
      )}
    </div>
  );
};

export default Login;
