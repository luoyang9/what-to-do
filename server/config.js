const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/what-to-do',
  port: process.env.PORT || 8000,
};

module.exports = config;