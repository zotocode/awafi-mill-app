// logger.ts or logger.js

import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;

// Define a custom log format
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  format: combine(
    label({ label: 'AwafiMill' }),  // You can change the label to your app name
    timestamp(),
    colorize(),
    customFormat
  ),
  transports: [
    new transports.Console({
      level: 'info', // Log 'info' level and below to the console
    }),
    new transports.File({
      filename: 'src/logs/error.log',
      level: 'error', // Only log 'error' level and below to this file
    }),
    new transports.File({
      filename: 'src/logs/combined.log', // Log all levels to the combined log file
    })
  ],
});

// Export the logger instance to use in other files
export default logger;