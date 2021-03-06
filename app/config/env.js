const config = {
  host: 'spender-api.pereborstudio.develop',
  port: 8090,
  scheme: 'https',
};

if (process.env.NODE_ENV === 'prod') {
  config.host = 'spender-api.pereborstudio.com';
}

module.exports = config;
