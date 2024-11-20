const { createLogger, format, transports } = require("winston");
const fs = require("fs");

class Logger {
  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: "winston.log" }),
      ],
    });
  }

  clearLogFile() {
    try {
      fs.writeFileSync("winston.log", "", "utf8");
      this.logger.info(
        "WINSTON: arquivo do log foi apagado e restaurado com sucesso"
      );
    } catch (error) {
      this.logger.error(
        `WINSTON: falha ao apagar e restaurar o arquivo do log: ${error.message}`
      );
    }
  }

  info(message) {
    this.logger.info(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

module.exports = new Logger();
