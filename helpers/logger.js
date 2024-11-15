const { createLogger, format, transports } = require('winston')
const fs = require('fs')

class Logger {
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`
        })
      ),
      transports: [new transports.Console(), new transports.File({ filename: 'winston.log' })]
    })
  }

  clearLogFile() {
    try {
      fs.writeFileSync('winston.log', '', 'utf8')
      this.logger.info('Arquivo de log Winston foi apagado e restaurado com sucesso')
    } catch (error) {
      this.logger.error(`Falha ao apagar e restaurar o arquivo de log Winston: ${error.message}`)
    }
  }

  info(message) {
    this.logger.info(message)
  }

  error(message) {
    this.logger.error(message)
  }
}

module.exports = new Logger()