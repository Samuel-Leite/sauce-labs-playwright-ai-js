// Arquivo TestSetup.js

const { beforeAll, beforeEach, afterEach } = require("@playwright/test");
const data = require("../helpers/data");
const fs = require("fs/promises");
const path = require("path");
const logger = require("./logger");

class Hooks {
  constructor() {
    this.allureResultsDir = path.join(__dirname, "..", "allure-results");
  }

  async cleanAllureResults() {
    try {
      await fs.rm(this.allureResultsDir, { recursive: true, force: true });
      logger.info(
        "-----------------------------------------------------------------------"
      );
      logger.info(
        "Diretório do allure-results foi apagado e restaurado com sucesso"
      );
    } catch (err) {
      logger.error(
        `Erro ao apagar e restaurar o diretório allure-results: ${err.message}`
      );
    }
  }

  // Função chamada antes de todos os testes
  async beforeAllTests() {
    await this.cleanAllureResults();
    logger.clearLogFile();
  }

  async beforeEachTest(page) {
    logger.info(
      "--------------------------------Start----------------------------------"
    );
    const baseUrl = data.readUrl(process.env.ENV);
    await page.goto(baseUrl); // Agora utilizamos `page` diretamente aqui
  }

  async afterEachTest() {
    logger.info(
      "--------------------------------End----------------------------------"
    );
  }
}

const hooks = new Hooks();

beforeAll(async () => {
  await hooks.beforeAllTests();
});

beforeEach(async ({ page }) => {
  await hooks.beforeEachTest(page);
});

afterEach(async () => {
  await hooks.afterEachTest();
});

module.exports = Hooks;
