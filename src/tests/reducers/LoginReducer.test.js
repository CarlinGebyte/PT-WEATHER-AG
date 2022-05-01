import "@testing-library/jest-dom";
import { loginReducer } from "../../redux/reducers/loginReducer";
import { typesLogin } from "../../redux/types/types";

describe("LoginReducer", () => {
  test("Expected Login", () => {
    const initialState = {};
    const action = {
      type: typesLogin.login,
      payload: {
        email: "email",
        password: "password",
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual({
      email: "email",
      password: "password",
    });
  });
});
describe("LoginReducer with type error", () => {
  test("Login test with type error", () => {
    const initialState = {};
    const action = {
      type: typesLogin.chau,
      payload: {
        email: "email",
        password: "password",
      },
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
