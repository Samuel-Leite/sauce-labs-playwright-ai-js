const logger = require("../../helpers/logger");

class HomePage {
  constructor(page) {
    this.successLogin = page.locator(".header_label .app_logo");
    this.errorLogin = page.locator('[data-test="error"]');
  }

  async validateLogin(isSuccessful) {
    try {
      const isVisible = isSuccessful
        ? await this.successLogin.isVisible()
        : await this.errorLogin.isVisible();

      isVisible
        ? logger.info(
            isSuccessful
              ? "As credenciais do usuário foram autenticadas com sucesso"
              : "As credenciais do usuário são inválidas ou o usuário está bloqueado"
          )
        : logger.error(
            isSuccessful
              ? "Element successLogin não visível"
              : "Element errorLogin não visível"
          );
    } catch (error) {
      logger.error(
        `Erro ao validar as credenciais no login: ${error.message}.`
      );
    }
  }
}

module.exports = HomePage;
