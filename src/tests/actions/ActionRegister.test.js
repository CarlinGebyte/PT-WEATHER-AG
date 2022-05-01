import "@testing-library/jest-dom";
import { registerSync } from "../../redux/actions/actionRegister";
import { typesRegister } from "../../redux/types/types";

describe("RegisterReducer", () => {
  test("Expected Register", () => {
    const email = "email";
    const password = "password";
    const name = "name";

    const newState = registerSync(email, password, name);
    expect(newState).toEqual({
      type: typesRegister.register,
      payload: {
        name,
        email,
        password,
      },
    });
  });
  test("UnExpected Register", () => {
    const email = "email";
    const password = "password";
    const name = "name";

    const newState = registerSync(email, password, name);
    expect(newState).not.toEqual({
      type: typesRegister.chau,
      payload: {
        hola: "hola",
        email,
        password,
      },
    });
  });
});
