import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { BD } from "../../firebase/firebaseConfig";
import { typesFavorites } from "../types/types";

// ===========> ADD <=============

export const addAsync = (favorite) => {
  return (dispatch) =>
    addDoc(collection(BD, "FavoriteLocations"), favorite)
      .then(() => {
        console.log("hola");
        dispatch(addSync(favorite));
      })
      .catch((error) => {
        console.log(error);
      });
};

export const addSync = (favorite) => ({
  type: typesFavorites.add,
  payload: favorite,
});

// ===========> Edit <=============

export const editAsync = (code, favorite) => {
  return async (dispatch) => {
    try {
      const getCollections = collection(BD, "FavoriteLocations");
      const q = query(getCollections, where("id", "==", code));
      const getData = await getDocs(q);
      let id;
      getData.forEach((doc) => {
        id = doc.id;
      });
      const documentRef = doc(BD, "FavoriteLocations", id);
      await updateDoc(documentRef, favorite).then(() => {
        dispatch(editSync(favorite));
        dispatch(listAsync());
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editSync = (favorite) => ({
  type: typesFavorites.edit,
  payload: favorite,
});

// ===========> Delete <=============

export const deleteAsync = (id) => {
  return async (dispatch) => {
    try {
      const getCollections = collection(BD, "FavoriteLocations");
      const q = query(getCollections, where("id", "==", id));
      const getData = await getDocs(q);
      getData.forEach((docu) => {
        deleteDoc(doc(BD, "FavoriteLocations", docu.id));
      });

      dispatch(deleteSync(id));
      dispatch(listAsync());
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSync = (id) => ({
  type: typesFavorites.delete,
  payload: id,
});

// ===========> List <=============

export const listAsync = () => {
  return async (dispatch) => {
    const getCollections = await getDocs(collection(BD, "FavoriteLocations"));
    let favorites = [];
    getCollections.forEach((doc) => {
      favorites.push({
        ...doc.data(),
      });
    });
    dispatch(listSync(favorites));
  };
};

export const listSync = (favorites) => ({
  type: typesFavorites.list,
  payload: favorites,
});
