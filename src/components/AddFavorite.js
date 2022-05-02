import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addAsync } from "../redux/actions/actionFavorites";
import { getAuth } from "firebase/auth";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

import { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";

import "../styles/addFavorite.css";

function AddFavorite() {
  const dispatch = useDispatch();

  const initialStateL = {
    long: "",
    lat: "",
  };
  const [location, setLocation] = useState(initialStateL);
  const [place, setPlace] = useState("");

  // const navigate = useNavigate();

  const id = uuid();
  const { currentUser } = getAuth();
  const uid = currentUser.uid;
  const favorite = {
    id,
    name: "",
    place: "",
    description: "",
    location: [],
    uid,
  };
  useEffect(() => {
    favorite.location = location;
    favorite.place = place;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, place]);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FybGluZ2VieXRlIiwiYSI6ImNsMmd2aXp0dTA3dzIza21qdHI1bnc1dXYifQ.TSflnvOtXeHpaz7yvIZl_Q";
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });
    geocoder.addTo("#geocoderFavorite");

    // const results = document.getElementById("result");

    // Add geocoder result to container.
    geocoder.on("result", (e) => {
      // results.innerText = JSON.stringify(
      //   e.result.geometry.coordinates,
      //   null,
      //   2
      // );
      setLocation({
        long: e.result.geometry.coordinates[0],
        lat: e.result.geometry.coordinates[1],
      });
      setPlace(e.result.place_name);
    });
  }, []);

  const AddSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Mínimo 5 caracteres")
      .max(20, "Máximo 20 caracteres")
      .required("El nombre es obligatorio"),
    description: Yup.string()
      .min(10, "Mínimo 10 caracteres")
      .max(200, "Máximo 200 caracteres")
      .required("La descripción es obligatoria"),
  });

  return (
    <div className="h-3/5 px-6 mt-4">
      <h1 className="text-center text-3xl font-semibold mb-7">AddFavorite</h1>
      <div
        id="geocoderFavorite"
        className="py-2 px-6 w-full flex items-center justify-center"
      ></div>

      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={AddSchema}
        onSubmit={(values, { resetForm }) => {
          favorite.name = values.name;
          favorite.description = values.description;
          dispatch(addAsync(favorite));
          resetForm();
          // navigate("/");
        }}
      >
        {({ errors, touched }) => (
          <Form className="text-center mt-2">
            <div className="flex flex-col py-3">
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto"
              />
              {errors.name && touched.name ? (
                <div className="error text-red-500">{errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col py-3">
              <label htmlFor="description">Description</label>
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Descripción"
                className="border-2 rounded-md border-black p-2 w-2/3 m-auto"
              />
              {errors.description && touched.description ? (
                <div className="error text-red-500">{errors.description}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Agregar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddFavorite;
