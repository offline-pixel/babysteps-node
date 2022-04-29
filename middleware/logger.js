/*
  Usage:
  Open server.js file
  const logger = require('./middleware/logger')
  app.use(logger)

  However, morgan is in place and no need of this at this time
*/

// @desc    Logs request to console
const logger = (req, res, next) => {
    console.log(
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    );
    next();
};
  
module.exports = logger;