import "@testing-library/jest-dom";
import { registerReducer } from "../../redux/reducers/registerReducer";
import { typesRegister } from "../../redux/types/types";

describe("RegisterReducer", () => {
  test("Expected Register", () => {
    const initialState = {};
    const action = {
      type: typesRegister.register,
      payload: {
        name: "name",
        email: "email",
        password: "password",
      },
    };
    const newState = registerReducer(initialState, action);
    expect(newState).toEqual({
      name: "name",
      email: "email",
      pass: "password",
    });
  });
  test("UnExpected Register", () => {
    const initialState = {};
    const action = {
      type: typesRegister.hola,
      payload: {
        name: "name",
        email: "email",
        password: "password",
      },
    };
    const newState = registerReducer(initialState, action);
    expect(newState).not.toEqual("");
  });
});
