module.exports = {
  apps: [
    {
      name: `telegram-boilerplate`,
      script: './dist/app.js',
      watch: false,
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
