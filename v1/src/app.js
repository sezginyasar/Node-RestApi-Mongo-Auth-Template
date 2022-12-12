const express = require("express");
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const config = require("./config"); //* index.js dosyalarini ayrıca belirtmeye gerek yok. Ön tanımlı olarak klasörün içinde index.js dosyası varsa onu çağırır.
const loaders = require("./loaders"); //* index.js dosyalarini ayrıca belirtmeye gerek yok. Ön tanımlı olarak klasörün içinde index.js dosyası varsa onu çağırır.
const events = require('./scripts/events');
const { ProjectRoutes, UserRoutes } = require("./api-routes");
const path = require('path');

config();//* config dosyası öncelikli olduğu için üst sırada durması gerekiyor.
loaders();//* database şüreçlerinin yürütüldüğü işlemler
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

//* process.env.APP_PORT config işlemleri ile process lere "env" dosyamızdaki konfigurasyon bilgilerine ulaşabiliyoruz
app.listen(process.env.APP_PORT, () => {
    console.log(`\x1b[30m\x1b[41m SUNUCU AYAĞA KALKTI... \x1b[0m`);
    app.use("/projects", ProjectRoutes);
    app.use("/users", UserRoutes);
});
