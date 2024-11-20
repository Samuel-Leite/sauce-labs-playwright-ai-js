const { percySnapshot } = require("@percy/playwright");
const logger = require("../../helpers/logger");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.txtUsername = page.getByPlaceholder("Username");
    this.txtPassword = page.getByPlaceholder("Password");
    this.btnLogin = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async doLogin(user, password) {
    try {
      const snapshotName = `Captura da pagina de login - ${Date.now()}`;
      await percySnapshot(this.page, snapshotName);

      await this.txtUsername.fill(user);
      await this.txtPassword.fill(password);
      await this.btnLogin.click();
      logger.info("As credenciais do usuario foram submetidas com sucesso");
    } catch (error) {
      logger.error(
        "Erro ao preencher as credenciais do usuario:",
        error.message
      );
    }
  }
}

module.exports = LoginPage;
