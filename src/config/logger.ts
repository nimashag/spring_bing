import { createLogger, format, transports } from 'winston'
import path from 'path'

const logFormat = format.printf(({ level, message, timestamp}) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`
})

const logger = createLogger({
    level: 'silly',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
      new transports.File({ filename: path.join('logs', 'combined.log') }),
    ],
  });
  
  export default logger;