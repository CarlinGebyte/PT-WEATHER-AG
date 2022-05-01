import "@testing-library/jest-dom";
import { typesLogin, typesRegister } from "../redux/types/types";

describe("Types", () => {
  test("Types", () => {
    expect(typesLogin.login).toBe("login");
    expect(typesLogin.logout).toBe("logout");
    expect(typesRegister.register).toBe("register");
  });
  test("Unexpercted Types", () => {
    expect(typesLogin.login).not.toBe("ingreso");
    expect(typesLogin.logout).not.toBe("chau");
    expect(typesRegister.register).not.toBe("crear");
  });
});
