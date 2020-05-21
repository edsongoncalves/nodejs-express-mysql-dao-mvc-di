const { winston, createLogger, transports, format } = require('winston');
const path = require('path');

const logger =
        createLogger({
            level: 'debug',
            format: format.combine(
                format.label({ label: path.basename(process.mainModule.filename) }),
                format.colorize(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(
                  info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                )
              ),
            transports: [
              new transports.File({ filename: 'combined.log' }) 
            ],
            exceptionHandlers: [
              new transports.File({ filename: 'exceptions.log' })
            ]
          });
    




module.exports = logger;