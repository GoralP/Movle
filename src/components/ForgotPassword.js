import React from "react";
import login_logo from "../imgs/login.png";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { forgotPassword } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Old Password is a required field."),
});

const ForgotPassword = ({ modalForgot, toggleForgot }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(forgotPassword(data, history));
  };

  return (
    <div>
      <Modal size="lg" isOpen={modalForgot} toggle={toggleForgot}>
        <ModalHeader toggle={toggleForgot} className="how-to-header">
          <img src={login_logo} alt="login logo" className="mr-3" />
          <span className="log-in-title">FORGOT YOUR PASSWORD?</span>
        </ModalHeader>

        <ModalBody>
          <div className="enter-your-email">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </div>
          <Form className="form__padder" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormGroup>
                <Label className="property-from-label">Email</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="email"
                  type="email"
                  placeholder="Email"
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
              <Button type="submit" className="log-in-button">
                SEND
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
