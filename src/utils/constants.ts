export const PORT = process.env.PORT || process.env.npm_package_config_port || 3005;
export const VERSION = process.env.npm_package_version;
export const APP_NAME = process.env.npm_package_name;
export const LOG_LEVEL: string | undefined = process.env.LOG_LEVEL;
export const NODE_ENV: string = process.env.NODE_ENV as string || "development";