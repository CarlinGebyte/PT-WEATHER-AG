import "@testing-library/jest-dom";
import { logoutSync } from "../../redux/actions/actionLogin";
import { typesLogin } from "../../redux/types/types";

describe("LogoutAction", () => {
  test("Expected logout", () => {
    const logoutAction = logoutSync();
    expect(logoutAction).toEqual({
      type: typesLogin.logout,
    });
  });
  test("UnExpected logout", () => {
    const logoutAction = logoutSync();
    expect(logoutAction).not.toEqual({
      type: typesLogin.chau,
    });
  });
});
