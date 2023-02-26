import { AuthPage } from "../../helpers/auth.page";

describe("Тесты авторизации", () => {
  const pageAuth = new AuthPage();

  beforeEach(() => {
    cy.intercept("POST", "trainers/auth").as("postAuth");
    cy.visit("/");
  });

  it("Авторизация с корректными логином/паролем", () => {
    pageAuth.typeInField(0, Cypress.env().login);
    pageAuth.typeInField(1, Cypress.env().password);
    pageAuth.clickButton("buttonEnter");
    cy.wait("@postAuth").its("response.statusCode").should("eq", 200);
  });

  [
    [
      "Авторизация с пустыми логином/паролем",
      "{backspace}",
      "{backspace}",
      [
        [0, "Введите почту"],
        [1, "Введите пароль"],
      ],
    ],
    [
      "Авторизация с неккорректной почтой",
      "Autotest",
      Cypress.env().password,
      [[0, "Введите почту"]],
    ],
    [
      "Авторизация с неккоректным паролем",
      Cypress.env().login,
      "Autotest",
      [[2, "Неверные логин или пароль"]],
    ],
  ].forEach((type) => {
    it(type[0], () => {
      pageAuth.typeInField(0, type[1]);
      pageAuth.typeInField(1, type[2]);
      pageAuth.clickButton("buttonEnter");

      if (type[0].includes('Авторизация с неккоректным паролем"'))
        cy.wait("@postAuth").its("response.statusCode").should("eq", 400);

      type[3].forEach((error) => {
        pageAuth.checkElemText("errorText", error[1], error[0]);
        pageAuth.checkCssForValue(
          "errorText",
          "color",
          pageAuth.base.error_color,
          error[0]
        );
      });
    });
  });
});
