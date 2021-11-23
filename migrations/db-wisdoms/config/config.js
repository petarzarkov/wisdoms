const baseConfig = require("../../../config/default.js").db.wisdoms;

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

const env = process.env.NODE_ENV || "development";
const dbName = process.env.DB_CONFIG_NAME || baseConfig.name;
const dbHost = process.env.DB_CONFIG_HOST || baseConfig.host;
const dbPort = process.env.DB_CONFIG_PORT || baseConfig.port;
const dbUser = encodeURIComponent(process.env.DB_CONFIG_USER || baseConfig.username);
const dbPass = encodeURIComponent(process.env.DB_CONFIG_PASS || baseConfig.password);

console.log("DB Info", JSON.stringify({
  env,
  dbName,
  dbHost,
  dbPort,
  dbUser
}));

module.exports = {
  [env]: {
    url: `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, //app.get('db_url'),
    dialect: "postgres", //app.get('db_dialect'),
    migrationStorageTableName: "_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "_seeders"
  }
};
