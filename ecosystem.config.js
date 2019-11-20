module.exports = {
  apps: [{
    name: 'server',
    script: 'app.js',
    autorestart: true,
    watch: false,
    env_development: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
};