const { test } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");
const ProductsPage = require("../pages/productsPage");
const CartPage = require("../pages/cartPage");
const dataYaml = require("../../helpers/dataYaml");
require("../../helpers/hooks");

test("@wip Validar a compra do produto com sucesso", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const credencial = dataYaml.readYamlFile("usuario_valido");

  await loginPage.doLogin(credencial.username, credencial.password);
  await homePage.validateLogin(true);
  await productsPage.selectProduct("Sauce Labs Onesie");
  await homePage.accessCart();
  await cartPage.doPayment();
  await homePage.doLogout();
});
