import { typesFavorites } from "../types/types";

export const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case typesFavorites.add:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case typesFavorites.remove:
      return {
        ...state,
        [action.payload.id]: undefined,
      };
    default:
      return state;
  }
};
