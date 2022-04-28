import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { registerAsync } from "../redux/actions/actionRegister";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("debe ser de tipo email ana@gmail.com")
    .min(5, "email muy corto")
    .max(50, "excede el máximo")
    .required("El email es obligatorio"),
  name: Yup.string()
    .min(5, "name muy corto")
    .max(50, "excede el máximo")
    .required("El name es obligatorio"),
  password1: Yup.string()
    .min(5, "Mínimo 5 caracteres")
    .max(20, "Máximo 20 caracteres")
    .required("Password is required")
    .equals([Yup.ref("password2"), "Passwords must match"]),
  password2: Yup.string()
    .min(5, "Mínimo 5 caracteres")
    .max(20, "Máximo 20 caracteres")
    .required("Password is required")
    .equals([Yup.ref("password1"), "Passwords must match"]),
});

function Register() {
  const dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{ email: "", name: "", password1: "", password2: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          dispatch(registerAsync(values.email, values.password1, values.name));
          resetForm();
        }}
      >
        {({ errors, touched, handleReset }) => (
          <Form>
            <div className="">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Type your email"
              />
              {errors.email && touched.email ? (
                <div className="error">{errors.email}</div>
              ) : null}
            </div>
            <div className="">
              <label htmlFor="name">name</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Type your name"
              />
              {errors.name && touched.name ? (
                <div className="error">{errors.name}</div>
              ) : null}
            </div>
            <div className="">
              <label htmlFor="password1">Password</label>
              <Field
                id="password1"
                name="password1"
                type="password"
                placeholder="Type your password"
              />
              {errors.password1 && touched.password1 ? (
                <div className="error">{errors.password1}</div>
              ) : null}
            </div>
            <div className="">
              <label htmlFor="password2">Same password</label>
              <Field
                id="password2"
                name="password2"
                type="password"
                placeholder="Type your password"
              />
              {errors.password2 && touched.password2 ? (
                <div className="error">{errors.password2}</div>
              ) : null}
            </div>
            <button className="login mt-4" type="submit">
              SignUp
            </button>
            <button
              type="button"
              className="login-facebook text-white"
              onClick={handleReset}
            >
              <i className="fas fa-trash"></i>
            </button>
            <Link to="/login">¿Tienes una cuenta?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
