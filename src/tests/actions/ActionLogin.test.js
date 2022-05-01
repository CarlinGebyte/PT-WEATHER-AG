import "@testing-library/jest-dom";
import { loginSync } from "../../redux/actions/actionLogin";
import { typesLogin } from "../../redux/types/types";

describe("LoginAction", () => {
  test("Expected Login", () => {
    const email = "email";
    const password = "password";
    const loginAction = loginSync(email, password);
    expect(loginAction).toEqual({
      type: typesLogin.login,
      payload: {
        email: "email",
        password: "password",
      },
    });
  });
  test("UnExpected Login", () => {
    const email = "email";
    const password = "password";
    const loginAction = loginSync(email, password);
    expect(loginAction).not.toEqual({
      type: typesLogin.expected,
      payload: {
        eml: "",
        passwd: "pasword",
      },
    });
  });
});
