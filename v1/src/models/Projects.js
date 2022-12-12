const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Projects');

const ProjectSchema = new Mongoose.Schema({
    name: String,
    user_id: {
        type: Mongoose.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true, versionKey: false });

// ProjectSchema.pre("save", (next, doc) => {
//     console.log(`\x1b[34m Öncesi ${doc} \x1b[0m`);
//     next();
// });

ProjectSchema.post("save", (doc) => {
    // console.log(`\x1b[33m Sonrasi ${doc} \x1b[0m`);
    logger.log({
        level: "info",
        message: doc,//"Kayıt başarılı"
    })
    // Kayıt edilmiştir... Loglama...
})

module.exports = Mongoose.model("project", ProjectSchema);