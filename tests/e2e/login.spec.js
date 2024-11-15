const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');

test('Validar login com credenciais válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.doLogin('standard_user', 'secret_sauce');
  await homePage.loginSuccess()
});

test('Validar login com usuario bloqueado', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.doLogin('locked_out_user', 'secret_sauce');
  await loginPage.errorLogin()
});