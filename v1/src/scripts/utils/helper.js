const CryptoJs = require('crypto-js');
const JWT = require('jsonwebtoken');

const passwordToHash = (password) => {
    return CryptoJs.HmacSHA256(password, CryptoJs.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
};

const generateAccessToken = (user) => {
    //TODO token expire süresi 1 hafta
    return JWT.sign({ name: user.email, ...user }, process.env.ACCESS_TOKE_SECRET_KEY, { expiresIn: "1w" }) //* token ın espires yani sone erme süresi bir 1 hafta olarak ayarlandı
}
function generateRefreshToken(user) {
    return JWT.sign({ name: user.email, ...user }, process.env.REFRESH_TOKE_SECRET_KEY)
}

module.exports = {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken,
};