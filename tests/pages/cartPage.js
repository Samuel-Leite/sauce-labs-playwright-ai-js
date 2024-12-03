const { test } = require("@playwright/test");
const { ai } = require("@zerostep/playwright");
const logger = require("../../helpers/logger");

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async doPayment() {
    const aiArgs = { page: this.page, test };

    try {
      await ai("Clique no botão Checkout", aiArgs);
      await ai("Preencha Duck no campo First Name", aiArgs);
      await ai("Preencha Tales no campo Last Name", aiArgs);
      await ai("Preencha 12345 no campo Zip", aiArgs);
      await ai("Clique no botão Continue", aiArgs);
      await ai("Clique no botão Finish", aiArgs);
      await ai(
        'Validar a apresentação do texto "Thank you for your order!"',
        aiArgs
      );
      logger.info("O produto foi comprado com sucesso");
    } catch (error) {
      logger.error("Erro ao comprar o produto:", error.message);
    }
  }
}

module.exports = CartPage;
