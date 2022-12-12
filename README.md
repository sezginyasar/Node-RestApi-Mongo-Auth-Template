# Node-RestApi-Mongo-Auth-Template

Node.js ile Rest-api ile backend template proje yapımı. 

## Kullanılan kütüphane veya fremawork 
* "crypto-js": "^4.1.1",
* "dotenv": "^16.0.3",
* "express": "^4.18.2",
* "express-fileupload": "^1.4.0",
* "helmet": "^6.0.1",
* "http-status": "^1.5.3",
* "joi": "^17.7.0",
* "jsonwebtoken": "^8.5.1",
* "mongoose": "^6.8.0",
* "nodemailer": "^6.8.0",
* "uuid": "^9.0.0",
* "winston": "^3.8.2"

# .env dosya içeriği

```
DB_HOST=localhost
DB_PORT=27017
DB_NAME=izmircode
APP_PORT=3000
PASSWORD_HASH="izmir$code!Deneme#Bilmemene!?"
ACCESS_TOKE_SECRET_KEY=fd8730aaf78ca75f40e2dbb62f122c9c05eb7b2662842c28ceb7752e01b20ac1
REFRESH_TOKE_SECRET_KEY=izmirfd8730aaf78ca75f40e2dbb62f122c9c05eb7b2662842c28ceb7752e01b20ac1code
EMAIL_HOST=email-host
EMAIL_PORT=587
EMAIL_USER=email
EMAIL_PASSWORD=parola
EMAIL_FROM=email
VERSION_FOLDER=v1
```
