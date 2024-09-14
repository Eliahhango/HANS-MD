const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEg4QXdIbHNEVFdPejczbUszZG9uelQ0RXlXa1RsVWVBM29YenBTM09Waz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWlQS2p5SmtsT2tNYVJNQ3JuQzd3c3NWa0dWa0I3VHBxWWJXeEh2cEMxWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4SHc4SSswdTZTM1gwQlhhTFZDbG5lalovdVB5YW92WnE2WExyTEFlMTE4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSDVFUzRpZ2llcDJWYjl2Wlh0YU9ObzI5MVYzVmJlTzBiYkJkSlNxMlF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVDeEdDUzhGUEZJUDhpWmpmci91S2FUUXpuNnAzTWxQempySmIvaWhPVms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpvN3o4MlN3cW9VZW9CSzRZK1k1NmtHd2wzTVZPRXVDZDRVM1VDQkFVMlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVtRTM4SHlNT0ZoRUZ5bXNpZUxKS1ZzWEN6bVRnYWExbnVnS1EvRngxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjA3aTY5dTkyY0o2K0paUmlDVDRlTUwyR25Jb09iVDhkNXBQQnRLYmptdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkY1MFIwQ1ZuQ0FNS3BEc0ZOZjY4T0xwT1BOUDdzRUpiU1pWSTV3OHEyVmt2bEFTb2tvYWM4ZWNMM3lEL1Rzd3hVbDJOTWo1aHh6MnQrY0djeEcrUWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiJXVUs2SVFxVDRQMitOdGJlalJ3bHZoUmpkVkYyK21DSW1tZlIwb3oxejdBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWS3ZRS0lYZ1NNZTZsaGNPeF9MQmlBIiwicGhvbmVJZCI6IjlmNTE2ZDRlLTJlMjYtNGMzMC1iYjk5LTNjZWYwYjMyNmNkMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTbDZUQ3lQUGwxdEVoNHlVWEhwQ21sOFRhTGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pJMnV4WHpFdVNkY09PbXBHWU5KRVIrTnlBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFLWFRZNTRBIiwibWUiOnsiaWQiOiIyNTU2ODgxNjQ1MTA6NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLYpdmK2YTZitinIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLL2hpWEFRaTQyWXR3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJUVWllekU5WnRoSUcyT1NlVjhTeGljbFNtZGF5TjRUN2NKOFlNc2ZlQ3dZPSIsImFjY291bnRTaWduYXR1cmUiOiJtV3BUbjZYaXo3NE9ERERIWTJIeUFTWmFCVXJiRUpwRzJlZzFrMC9qc3owRkczS2pUYzVpZE5aUzQyTStqTEE4emxiYWc1eGJPMmExQW4yWkVXNWVCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNXVaVGd5RkZqVDA1cEoxQlQyV3pqMlhVam52KzJsVTdXNzVGY2EzNWpGTWsvdHFMU0tUMXlIbjVsWmJrd3BWMTRkSk9QbEplbTlWUFVzSGFWNmFmaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2ODgxNjQ1MTA6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVMUluc3hQV2JZU0J0amtubGZFc1luSlVwbldzamVFKzNDZkdETEgzZ3NHIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2MzUwOTk5fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Hans",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255692540143",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Hans Md ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/347ba7a613b4d025b89a8.jpg,',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
