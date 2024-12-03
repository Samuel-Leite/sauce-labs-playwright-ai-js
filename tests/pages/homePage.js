const { percySnapshot } = require("@percy/playwright");
const { test } = require("@playwright/test");
const { ai } = require("@zerostep/playwright");
const logger = require("../../helpers/logger");

class HomePage {
  constructor(page) {
    this.page = page;
    this.successLogin = page.locator(".header_label .app_logo");
    this.errorLogin = page.locator('[data-test="error"]');
  }

  async validateLogin(isSuccessful) {
    try {
      let isVisible;

      if (isSuccessful) {
        isVisible = await this.successLogin.isVisible();
      } else {
        isVisible = await this.errorLogin.isVisible();
      }

      if (isVisible) {
        if (isSuccessful) {
          await percySnapshot(this.page, "Captura da pagina home");
          logger.info(
            "As credenciais do usuário foram autenticadas com sucesso"
          );
        } else {
          await percySnapshot(this.page, "Captura da pagina de login com erro");
          logger.info(
            "As credenciais do usuário são inválidas ou o usuário está bloqueado"
          );
        }
      } else {
        if (isSuccessful) {
          logger.error("Element successLogin não visível");
        } else {
          logger.error("Element errorLogin não visível");
        }
      }
    } catch (error) {
      logger.error(
        `Erro ao validar as credenciais no login: ${error.message}.`
      );
    }
  }

  async accessCart() {
    const aiArgs = { page: this.page, test };

    try {
      await ai("Clique no carrinho de compra", aiArgs);
      logger.info(
        "Redirecionamento ao carrinho de compra realizado com sucesso"
      );
    } catch (error) {
      logger.error(
        "Erro ao ser redirecionamento ao carrinho de compra",
        error.message
      );
    }
  }

  async doLogout() {
    const aiArgs = { page: this.page, test };

    try {
      await ai("Clique nos três pontinhos", aiArgs);
      await ai("Clique em Logout", aiArgs);
      await ai(
        'Validar a apresentação do texto "Accepted" após efetuar o logout',
        aiArgs
      );
      logger.info("Logout efetuado com sucesso");
    } catch (error) {
      logger.error("Erro ao realizar o logout", error.message);
    }
  }
}

module.exports = HomePage;
