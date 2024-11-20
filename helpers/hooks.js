const { beforeAll, beforeEach, afterEach } = require("@playwright/test");
const dataYaml = require("./dataYaml");
const fs = require("fs/promises");
const path = require("path");
const logger = require("./logger");

class Hooks {
  constructor() {
    this.allureResultsDir = path.join(__dirname, "..", "allure-results");
  }

  async cleanAllureResults() {
    const isDocker = process.env.DOCKER === "true";

    if (isDocker) {
      try {
        const containerDir = "/usr/src/app/allure-results";
        const files = await fs.readdir(containerDir);
        files.forEach(async (file) => {
          const filePath = path.join(containerDir, file);
          await fs.rm(filePath, { recursive: true, force: true });
        });
        logger.info(
          "-----------------------------------------------------------------------"
        );
        logger.info(
          "DIRETORIO: allure-results foi apagado e restaurado com sucesso no Docker"
        );
      } catch (err) {
        logger.error(
          `DIRETORIO: erro ao apagar e restaurar o diretório allure-results no Docker: ${err.message}`
        );
      }
    }

    if (!isDocker) {
      try {
        await fs.rm(this.allureResultsDir, { recursive: true, force: true });
        logger.info(
          "-----------------------------------------------------------------------"
        );
        logger.info(
          "DIRETORIO: allure-results foi apagado e restaurado com sucesso localmente"
        );
      } catch (err) {
        logger.error(
          `DIRETORIO: erro ao apagar e restaurar o diretório allure-results localmente: ${err.message}`
        );
      }
    }
  }

  async beforeAllTests() {
    logger.info(
      "----------------------Variaveis de ambiente---------------------------"
    );
    logger.info(`ENV: ${process.env.ENV}`);
    logger.info(`DEVICE: ${process.env.DEVICE}`);
    logger.info(`BROWSER: ${process.env.BROWSER}`);
    await this.cleanAllureResults();
    logger.clearLogFile();
  }

  async beforeEachTest(page) {
    logger.info(
      "--------------------------------Start---------------------------------"
    );
    const baseUrl = dataYaml.readUrl(process.env.ENV);
    await page.goto(baseUrl);
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
