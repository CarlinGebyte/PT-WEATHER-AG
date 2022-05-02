import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAsync, listAsync } from "../redux/actions/actionFavorites";
import EditFavorites from "./EditFavorites";

function Favorites() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const navigate = useNavigate();

  const { favorites } = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch(listAsync());
  }, [dispatch]);

  useEffect(() => {
    if (favorites.filter(favorite => favorite.uid === getAuth().currentUser.uid).length === 0) {
      document.getElementById("favoritesCont").classList.add("h-[57.3vh]");
    } else {
      document.getElementById("favoritesCont").classList.remove("h-[57.3vh]");
    }
  }, [favorites]);

  const { currentUser } = getAuth();

  const sendFavorite = (favorite) => {
    navigate("/detail/" + favorite.location.lat + "," + favorite.location.long);
  };

  const edit = (favorite) => {
    setModal(true);
    setDataModal(favorite);
  };
  return (
    <div className="flex justify-evenly mt-4 flex-wrap px-4" id="favoritesCont">
      {favorites.map((favorite) => {
        if (favorite.uid === currentUser.uid) {
          return (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg w-[45%] md:w-full my-3"
              key={favorite.id}
            >
              <img
                className="w-full"
                src="https://img.freepik.com/foto-gratis/vista-aerea-paisaje-cascada_23-2148922183.jpg?t=st=1651379259~exp=1651379859~hmac=867569631f7b4fda229ad72f696ddea83d705f0bd1a176c42183baeeabffa1e4&w=740"
                alt="Favorite"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{favorite.name}</div>
                <p className="text-gray-700 text-base">
                  {favorite.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {favorite.place}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #place
                </span>
              </div>
              <div className="flex justify-evenly py-3">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => edit(favorite)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  onClick={() => dispatch(deleteAsync(favorite.id))}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => sendFavorite(favorite)}
                >
                  Details
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {modal === true ? (
        <EditFavorites modal={dataModal} close={setModal} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Favorites;
