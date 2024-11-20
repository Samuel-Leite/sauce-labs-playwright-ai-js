const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const logger = require("./logger");

class DataYaml {
  readUrl(environment) {
    const filePath = path.resolve(
      __dirname,
      `../resources/conf/url-${environment}.yml`
    );

    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { url } = yaml.load(fileContents);
      logger.info(
        `A URL do ambiente '${environment}' foi acessado com sucesso do arquivo YAML`
      );
      return url;
    } catch (error) {
      logger.error(
        `Erro ao obter a URL do ambiente '${environment}' do arquivo YAML: ${error.message}`
      );
      throw error;
    }
  }

  readYamlFile(attribute) {
    const filePath = path.resolve(
      __dirname,
      `../resources/data/${process.env.ENV}/credencial.yml`
    );

    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = yaml.load(fileContents);
      logger.info(
        "As credenciais do usuario do arquivo YAML foram obtidas com sucesso"
      );
      return data[attribute];
    } catch (error) {
      logger.error(
        `Erro ao obter as credenciais do usuario do arquivo YAML: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new DataYaml();
