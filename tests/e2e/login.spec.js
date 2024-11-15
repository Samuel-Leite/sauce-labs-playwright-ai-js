const { test } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");
const dataHelper = require("../../helpers/dataHelper");
require("../../helpers/hooks");

test("Validar login com credenciais válidas", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const credencial = dataHelper.readYamlFile("usuario_valido");

  await loginPage.doLogin(credencial.username, credencial.password);
  await homePage.validateLogin(true);
});

test("Validar login com usuario bloqueado", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const credencial = dataHelper.readYamlFile("usuario_bloqueado");

  await loginPage.doLogin(credencial.username, credencial.password);
  await homePage.validateLogin(false);
});
