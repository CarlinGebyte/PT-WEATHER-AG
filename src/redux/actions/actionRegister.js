import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { typesRegister } from "../types/types";

export const registerAsync = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user);
        await updateProfile(auth.currentUser, { displayName: name });
        dispatch(registerSync(user.email, user.password));
        console.log("Bienvenido nuevo usuario: " + user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const registerSync = (email, password, name) => {
  return {
    type: typesRegister.register,
    payload: {
      email,
      password,
      name,
    },
  };
};
