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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { changePassword } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const changePasswordSchema = yup.object().shape({
  old_pwd: yup.string().required("Old Password is a required field."),
  new_pwd: yup.string().required("New Password is a required field."),
  confirm_password: yup
    .string()
    .required("Confirm Password is a required field."),
});

const ChangePassword = ({ modalPassword, toggleModalPassword }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const id = localStorage.getItem("id");

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(changePassword(data, history));
  };
  return (
    <div>
      <Modal size="lg" isOpen={modalPassword} toggle={toggleModalPassword}>
        <ModalHeader toggle={toggleModalPassword} className="how-to-header">
          <img src={login_logo} alt="login logo" className="mr-3" />
          <span className="log-in-title">CHANGE PASSWORD</span>
        </ModalHeader>

        <ModalBody>
          <Form className="form__padder" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormGroup>
                <Controller
                  as={Input}
                  control={control}
                  name="id"
                  type="hidden"
                  placeholder="id"
                  defaultValue={`${id}`}
                  ref={register}
                  className="login-inputs"
                />
                {errors && errors.old_pwd && (
                  <span className="text-danger">{errors.old_pwd.message}</span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Old Password</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="old_pwd"
                  type="text"
                  placeholder="Old Password"
                  defaultValue=""
                  ref={register}
                  className="login-inputs"
                />
                {errors && errors.old_pwd && (
                  <span className="text-danger">{errors.old_pwd.message}</span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">New Password</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="new_pwd"
                  type="text"
                  placeholder="New Password"
                  defaultValue=""
                  ref={register}
                  className="login-inputs"
                />
                {errors && errors.new_pwd && (
                  <span className="text-danger">{errors.new_pwd.message}</span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Confirm Password</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="confirm_password"
                  type="text"
                  placeholder="Confirm Password"
                  defaultValue=""
                  ref={register}
                  className="login-inputs"
                />
                {errors && errors.confirm_password && (
                  <span className="text-danger">
                    {errors.confirm_password.message}
                  </span>
                )}
              </FormGroup>
            </div>

            <div className="pb-1 mt-3">
              <Button className="modal-btn">SAVE</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangePassword;
