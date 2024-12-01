const { percySnapshot } = require("@percy/playwright");
const { test } = require("@playwright/test");
const { ai } = require("@zerostep/playwright");
const logger = require("../../helpers/logger");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async doLogin(user, password) {
    const aiArgs = { page: this.page, test };

    try {
      await percySnapshot(this.page, "Captura da pagina de login");
      await ai(`Preencha ${user} no campo username`, aiArgs);
      await ai(`Preencha ${password} no campo password`, aiArgs);
      await ai("Clique no botão Login", aiArgs);
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
