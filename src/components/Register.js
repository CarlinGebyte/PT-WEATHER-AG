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
    <div className="shadow-2xl w-2/4 m-auto translate-y-6 text-center p-8">
      <h2 className="uppercase font-semibold text-2xl">Register</h2>

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
            <div className="flex flex-col py-4">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Type your email"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
              />
              {errors.email && touched.email ? (
                <div className="error">{errors.email}</div>
              ) : null}
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Type your name"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
              />
              {errors.name && touched.name ? (
                <div className="error">{errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="password1">Password</label>
              <Field
                id="password1"
                name="password1"
                type="password"
                placeholder="Type your password"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
              />
              {errors.password1 && touched.password1 ? (
                <div className="error">{errors.password1}</div>
              ) : null}
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="password2">Same password</label>
              <Field
                id="password2"
                name="password2"
                type="password"
                placeholder="Type your password"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
              />
              {errors.password2 && touched.password2 ? (
                <div className="error">{errors.password2}</div>
              ) : null}
            </div>
            <div>
              <div>
                <button
                  className="w-1/3 mr-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                >
                  SignUp
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  type="button"
                  onClick={handleReset}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            <Link to="/login">Do you have an account?</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
