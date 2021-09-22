const path = require('path');
const ourConfigDir = path.join("../../../../", 'config');

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'
let config = require("config");

const baseConfig = config.util.loadFileConfigs(ourConfigDir) || {};
const ext_config = baseConfig.CasinoHubOperatordbConfig || {};

const env = process.env.NODE_ENV || "development";

const dbName = process.env.DB_CONFIG_NAME || ext_config["name"] || "db-wisdoms";
const dbHost = process.env.DB_CONFIG_HOST || ext_config.host || "localhost";
const dbPort = process.env.DB_CONFIG_PORT || ext_config.port || "5432";

let dbUser = process.env.DB_CONFIG_USER || ext_config.username || "postgres";
let dbPass = process.env.DB_CONFIG_PASS || ext_config.password || "postgres";

dbUser = encodeURIComponent(dbUser); // we use it as a part of url schema MUST be encoded
dbPass = encodeURIComponent(dbPass); // we use it as a part of url schema MUST be encoded

console.log({
  env,
  dbName,
  dbHost,
  dbPort,
  dbUser
});

module.exports = {
  [env]: {
    url: `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, //app.get('db_url'),
    dialect: "postgres", //app.get('db_dialect'),
    migrationStorageTableName: "_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "_seeders"
  }
};
