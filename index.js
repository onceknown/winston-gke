'use strict';

var winston = require('winston');

module.exports = function(logger, level) {
  logger.setLevels({
    debug: 5,
    info: 4,
    warning: 3,
    error: 2,
    critical: 1
  });

  logger.add(winston.transports.Console, {
    level: level || 'debug',
    formatter: (options) => {
      return JSON.stringify(
        Object.assign(
          options.meta && Object.keys(options.meta).length ? {meta: options.meta} : {},
          {
            severity: options.level.toUpperCase(),
            message: options.message
          }
        )
      ).trim();
    }
  });

  return logger;
}
