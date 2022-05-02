import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import {
  loginEmailPassAsync,
  loginFacebook,
  loginGoogle,
} from "../redux/actions/actionLogin";
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
    <div className="shadow-2xl w-2/4 m-auto translate-y-1/4 text-center p-8 lg:w-3/4 md:w-5/6 ">
      <h2 className="uppercase font-semibold text-2xl">Login</h2>
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
                <div className="error text-red-500">{errors.email}</div>
              ) : null}
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Type your password"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
              />
              {errors.password && touched.password ? (
                <div className="error text-red-500">{errors.password}</div>
              ) : null}
            </div>
            <div className="flex flex-col items-center">
              <button
                className="w-1/3 sm:w-2/5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                type="submit"
              >
                Login
              </button>
              <Link className="mt-3" to="/signup">Don't have an account?</Link>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center mt-4">
        <button
          className="bg-[#db4437] hover:bg-[#fd6363] w-1/2 ml-4 text-white font-bold py-2 px-4 border-b-4 border-[#df1e0c] hover:border-[#db4437] rounded"
          onClick={handleGoogle}
        >
          <i className="fab fa-google"></i>
        </button>
        <button
          className="bg-[#5890FF] hover:bg-[#6b9cff] w-1/2 ml-4 text-white font-bold py-2 px-4 border-b-4 border-[#1b66fd] hover:border-[#4882f7] rounded"
          onClick={handleFacebook}
        >
          <i className="fab fa-facebook-f"></i>
        </button>
      </div>
    </div>
  );
}

export default Login;
