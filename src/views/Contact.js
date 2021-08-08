import React from "react";
import { Navigation } from "../components";
import { Footer } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { contactUs } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, FormGroup, Label } from "reactstrap";

const contactUsSchema = yup.object().shape({
  name: yup.string().required("Name is a required field."),
  email: yup.string().required("Email is a required field."),
  phone: yup.string().required("Phone number is a required field."),
  message: yup.string().required("Message is a required field."),
});

const EditProfile = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(contactUs(data, history));
  };
  return (
    <div className="container-fluid">
      <Navigation />
      <section className="buyer-browse-image all-image">CONTACT US</section>
      <div className="main-criteria-bg">
        <section className="container">
          <Form className="form__padder pt-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormGroup>
                <Controller
                  as={Input}
                  control={control}
                  name="user_id"
                  type="hidden"
                  placeholder="id"
                  defaultValue={`${id}`}
                  ref={register}
                  className="login-inputs"
                />
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Name</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="name"
                  type="text"
                  placeholder="Name"
                  defaultValue=""
                  ref={register}
                  className="login-inputs"
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
              <FormGroup>
                <Label className="property-from-label">Phone</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="phone"
                  type="number"
                  placeholder="Phone number"
                  defaultValue=""
                  ref={register({
                    min: 0,
                  })}
                  className="login-inputs"
                />
                {errors && errors.phone && (
                  <span className="text-danger">{errors.phone.message}</span>
                )}
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label className="property-from-label">Message</Label>
                <Controller
                  as={Input}
                  control={control}
                  name="message"
                  type="textarea"
                  placeholder="Message"
                  defaultValue=""
                  ref={register}
                  className="contact-message-inputs"
                />
                {errors && errors.message && (
                  <span className="text-danger">{errors.message.message}</span>
                )}
              </FormGroup>
            </div>

            <div className="pb-5">
              <Button type="submit" className="save-btn">
                SEND
              </Button>
            </div>
          </Form>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
