import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { favoritesReducer } from "../reducers/favoritesReducer";
import { loginReducer } from "../reducers/loginReducer";
import { registerReducer } from "../reducers/registerReducer";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducersSend = combineReducers({
  login: loginReducer,
  register: registerReducer,
  favorites: favoritesReducer,
});

export const store = createStore(
  reducersSend,
  compose(applyMiddleware(thunk))
);
