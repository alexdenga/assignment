const dotenv = require('dotenv').config();
const logger = require('../utils/logger');
module.exports = (req, res, next) => {
  if (req.headers['key'] == process.env.KEY && req.headers['secret'] == process.env.SECRET) {
    next();
  } else {
    logger.error(`401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(401).json({msg: 'You need to be Authorized to use the API', status: 401});
  }
};
