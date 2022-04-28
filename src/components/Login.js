import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import {
  loginEmailPassAsync,
  loginFacebook,
  loginGoogle,
} from "../redux/actions/actionLongin";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("debe ser de tipo email ana@gmail.com")
    .min(5, "email muy corto")
    .max(50, "excede el máximo")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(5, "Mínimo 5 caracteres")
    .max(20, "Máximo 20 caracteres")
    .required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();

  const handleGoogle = () => {
    dispatch(loginGoogle());
  };

  const handleFacebook = () => {
    dispatch(loginFacebook());
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          dispatch(loginEmailPassAsync(values.email, values.password));
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
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Type your password"
              />
              {errors.password && touched.password ? (
                <div className="error">{errors.password}</div>
              ) : null}
            </div>
            <button className="login mt-4" type="submit">
              Login
            </button>
            <button
              type="button"
              className="login-facebook text-white"
              onClick={handleReset}
            >
              <i className="fas fa-trash"></i>
            </button>
            <Link to="/signup">¿Eres nuevo?</Link>
          </Form>
        )}
      </Formik>
      <div className="flex justify-between mt-4">
        <button className="login-google " onClick={handleGoogle}>
          <i className="fab fa-google"></i>
        </button>
        <button className="login-facebook " onClick={handleFacebook}>
          <i className="fab fa-facebook-f"></i>
        </button>
      </div>
    </div>
  );
}

export default Login;
