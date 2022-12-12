const Mongoose = require('mongoose');
const db = Mongoose.connection;

db.once("open", () => {
    console.log(`\x1b[31m\x1b[42m DB BAĞLANTISI BAŞARILI \x1b[0m`);
});

const connectDB = async () => {
    await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = {
    connectDB,
}