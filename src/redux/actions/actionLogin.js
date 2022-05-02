import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { facebook, google } from "../../firebase/firebaseConfig";
import { typesLogin } from "../types/types";

// =========> Logout <==========

export const logoutAsync = () => {
  return (dispatch) => {
    const auth = getAuth();
    signOut(auth)
      .then(({ user }) => {
        dispatch(logoutSync());
        console.log("Adios " + user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logoutSync = () => {
  return {
    type: typesLogin.logout,
  };
};

// =========> Login <==========

export const loginGoogle = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, google)
      .then(({ user }) => {
        console.log(user, " Usuario autorizado");
      })
      .catch((error) => {
        console.warn(error, " No autorizado");
      });
  };
};
export const loginFacebook = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, facebook)
      .then(({ user }) => {
        console.log(user, " Usuario autorizado");
      })
      .catch((error) => {
        console.warn(error, " No autorizado");
      });
  };
};

export const loginEmailPassAsync = (email, password) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSync(user.email, user.password));
        console.log("Bienvenido " + user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loginSync = (email, password) => {
  return {
    type: typesLogin.login,
    payload: {
      email,
      password,
    },
  };
};


