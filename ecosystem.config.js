module.exports = {
  apps: [{
    name: 'server',
    script: 'app.js',
    autorestart: true,
    watch: false,
    // exec_mode: 'cluster',
    // instances: 'max',
    env_development: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
};