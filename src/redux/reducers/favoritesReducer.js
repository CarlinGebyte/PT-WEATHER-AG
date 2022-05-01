import { typesFavorites } from "../types/types";

const initialState = {
  favorites: [],
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case typesFavorites.add:
      return {
        favorites: [action.payload],
      };
    case typesFavorites.edit:
      return {
        ...state,
      };
    case typesFavorites.delete:
      return {
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload.id
        ),
      };
    case typesFavorites.list:
      return {
        favorites: [...action.payload],
      };
    default:
      return state;
  }
};
