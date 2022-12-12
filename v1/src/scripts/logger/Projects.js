const winston = require('winston');

//TODO: VERSİYON KLASÖRÜ DEĞİŞTİĞİNDE DEĞİŞTİRİLMELİ
const folder = "v1"; //! bu kısım version değişiminde klasör yapısı değişirse değiştirilmeli
// console.log("folder", folder);

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "project-service" },
    transports: [
        new winston.transports.File({ filename: `${folder}/src/logs/projects/error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${folder}/src/logs/projects/info.log`, level: 'info' }),
        new winston.transports.File({ filename: `${folder}/src/logs/projects/combined.log`, level: 'combined' }),
        // new winston.transports.Console()
    ]
});

module.exports = logger;