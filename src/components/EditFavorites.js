import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { editAsync } from "../redux/actions/actionFavorites";

const editSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Mínimo 5 caracteres")
    .max(20, "Máximo 20 caracteres")
    .required("El nombre es obligatorio"),
  place: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .required("El lugar es obligatorio"),
  description: Yup.string()
    .min(10, "Mínimo 10 caracteres")
    .max(200, "Máximo 200 caracteres")
    .required("La descripción es obligatoria"),
});

function EditFavorites({ modal, close }) {
  const dispatch = useDispatch();

  const handleClose = (handleReset) => {
    close(false);
    handleReset();
  };
  return (
    <div className="absolute bg-[#00000073] w-full h-full flex p-8">
      <div className="bg-white h-fit p-8 w-full text-center">
        <Formik
          initialValues={{
            name: modal.name,
            place: modal.place,
            description: modal.description,
          }}
          validationSchema={editSchema}
          onSubmit={(values, { resetForm }) => {
            modal.name = values.name;
            modal.place = values.place;
            modal.description = values.description;
            dispatch(editAsync(modal.id, modal));
            handleClose(resetForm);
          }}
        >
          {({ errors, touched, handleReset }) => (
            <Form className="flex flex-col justify-between">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Type favorite name"
                  className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
                />
                {errors.name && touched.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="place">Place</label>
                <Field
                  id="place"
                  name="place"
                  type="text"
                  placeholder="Type favorite place"
                  className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
                  disabled
                />
                {errors.place && touched.place ? (
                  <div className="error">{errors.place}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Type favorite description"
                  className="border-2 rounded-md border-black p-2 w-2/3 m-auto sm:w-full"
                />
                {errors.description && touched.description ? (
                  <div className="error">{errors.description}</div>
                ) : null}
              </div>
              <div className="pt-4 flex justify-evenly sm:w-full" >
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  onClick={() => handleClose(handleReset)}
                >
                  close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditFavorites;
