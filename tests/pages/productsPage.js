const { test } = require("@playwright/test");
const { ai } = require("@zerostep/playwright");
const logger = require("../../helpers/logger");

class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async selectProduct(product) {
    const aiArgs = { page: this.page, test };

    try {
      await ai(`Clique no produto ${product} exibido na página`, aiArgs);
      await ai("Clique no botão Add to cart", aiArgs);
      await ai("Clique em Back to products", aiArgs);
      logger.info(`O produto ${product} foi incluido no carrinho com sucesso`);
    } catch (error) {
      logger.error(
        `Erro ao incluir o produto ${product} no carrinho:`,
        error.message
      );
    }
  }
}

module.exports = ProductsPage;
