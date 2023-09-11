export const initialEnvs = {
  APP_NAME: 'GUNPUN-SERVER-GAME',
  ENV: 'develop',
  PORT: '4001',
  CLIENT_GAME_URL: `http://localhost:3100`,
  CLIENT_PUBLIC_URL: `http://localhost:3000`,
  PUBLIC_URL: `http://localhost:4001`,
  // MAIN_SERVER_PORTAL_URL: `http://localhost:4000`,
  MAIN_SERVER_PORTAL_URL: `https://api-staging.gunpun.io`,
  REDIS_URL: 'redis://:@34.124.197.66:6000',
  DATABASE_URL: 'mongodb+srv://admin:ZrRXrjGWVScGy2Zx@simba.6ysnu.mongodb.net/GunPunGameStaging?retryWrites=true&w=majority',
  // DATABASE_URL: 'mongodb://localhost:27017/GameDevelop?retryWrites=true&w=majority',
  AMQP_URL: 'amqp://admin:bNUS7KVqbGCyqN2@35.221.131.146:5672',
  DATABASE_MAX_QUERY_LIMIT: '40',
}

export const getEnv = (key: keyof typeof initialEnvs) => process.env[key] || initialEnvs[key];
export const ENV = getEnv('ENV');
export const PORT = +getEnv('PORT');
export const APP_KEY = `${getEnv('APP_NAME')}-${getEnv('ENV')}`.toUpperCase();
export const rootAddress = "0x0000000000000000000000000000000000000000";