const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZHQVlVejVMV1VOanRmU3pCZ1drWGt1aElnOW00TWJSRjMwUFluQndXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienRpeUNNMUhxbXlYcFpxUzJUeGNzZ3JwZWxwVCswV3VKaG5MOUpSUi9Rcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQVFGNVhtZlphZ2J2dW9tOEFuMWZrNERFVHllNlpLeXpMcldtaTZCUkcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5YUtIam1ITVprTk1zOG01TlUvRlFCN1A2alNzaUtpY0MxRW5lNGRtdEV3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndKYks4d1FBNzNvZVpocGFJUHlUdm0xbXY1ODZFSEd6eUhzcmsxK3dta1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFtRFJWbFhvZFFSRVhGNGFIR1BRVHVXOXN2UnZsdUtRdDYxOWRXVGFmeWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0Vpd0RTSlAvWWVobVprbUhFSkFxRmtrOWZGUWkyM0hhRjBsRVdnZGxHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXRNRHhPNlB0QWtwR0duaEdCbEljb2RLUnN4YjNTK2hpdG9KQy92Z01GYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktUcXptT0dUMm5ITGRXeDVYL1pZWE0vOVcrZFA1SXkrMjVadEJIQjFRQUVXa0VRejUvTjRKcjBUN0szNlpSRXdyamFPellhYWJudWFVL0lyNnY5TkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiJMT0ZhV0lSblVTdi9uK0t5c0hIcUZ1R29xbkdpM3BLaHNuRDFkb0MrRlJrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxLU9TUV83VVNPcU8tY2dHR1VTY1NnIiwicGhvbmVJZCI6Ijk4MzlhOGI0LTBmZGItNGUyNC1iM2YwLTgxM2RlYzljODE4NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnY2VHWDNjMHR1d2FNcU5uTnFhZlVkRGU3aE09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSm1EVDc5bGZhUkRBQ1RaS1JsMzRPYlJRcnd3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1CUlpDUkdaIiwibWUiOnsiaWQiOiIyMzM1NTkyNzI4NjU6MzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5VnN1d0VFTGlZZ0xRR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZLTmwwalhzUHZqN2xmamxTZ1ZDZ1l3R0s1cERMSEk3U0twbk13MXBubVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNYQ3kwN3k0UzRxaEVSek1GUDJBS0ZYUVFyUXU1TndZUnV3clJYMjNVQUtZMzhmSEw5REl0UWNhWFlSQ0lBQzhxR08rREVhb1l3T2EwOVlKL2MxL0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJoR0R3YkFxQ3o4Qk5ZNE4zUUhuR1RTV1NXNC9ITnJ5UGJNK3VPdjZ0WVl4ZVYwUE8wMTNlTVE2NGVTMVRuaG5VdmZqREt0b09rS3A4QjdiRmsrWkpEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU1OTI3Mjg2NTozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYeWpaZEkxN0Q3NCs1WDQ1VW9GUW9HTUJpdWFReXh5TzBpcVp6TU5hWjVrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5NjY3NzgwfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "263785028126",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
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
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
