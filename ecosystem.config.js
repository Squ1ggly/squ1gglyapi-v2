module.exports = {
  apps: [{
    name: "squ1ggly-api",
    script: "npm run start",
    out_file: "$HOME/.pm2/logs/squ1ggly-api.log",
    error_file: "$HOME/.pm2/logs/squ1ggly-apilog",
    time: true,
    env: {
      "NODE_ENV": "production",
    }
  }]
}
