import "@testing-library/jest-dom";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { typesLogin } from "../../redux/types/types";

describe("LogOutReducer", () => {
  test("Logout test", () => {
    const initialState = {};
    const action = {
      type: typesLogin.logout,
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual({});
  });
  test("Logout test with error", () => {
    const initialState = {};
    const action = {
      type: typesLogin.signIn,
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
