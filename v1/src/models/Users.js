const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Users');

const UserSchema = new Mongoose.Schema({
    full_name: String,
    password: String,
    email: String,
    profile_image: String,
}, { timestamps: true, versionKey: false });

// UserSchema.pre("save", (next, doc) => {
//     console.log(`\x1b[34m Öncesi ${doc} \x1b[0m`);
//     next();
// }); 

UserSchema.post("save", (doc) => {
    // console.log(`\x1b[33m Sonrasi ${doc} \x1b[0m`);
    logger.log({
        level: "info",
        message: doc,//"Kayıt başarılı"
    })
    // Kayıt edilmiştir... Loglama...
})

module.exports = Mongoose.model("user", UserSchema);