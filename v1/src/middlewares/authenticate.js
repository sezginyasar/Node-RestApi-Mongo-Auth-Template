const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    //req.headers.authorization
    const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[1];
    const token = req.headers?.authorization?.split(" ")[1] || null;
    if (token === null) return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için Giriş yapmalısınız!" });

    JWT.verify(token, process.env.ACCESS_TOKE_SECRET_KEY, (err, user) => {
        if (err) return res.status(httpStatus.UNAUTHORIZED).send({ error: "Token süresi geçmiş..." });
        req.user = user?._doc;
        return next();
    })
};

module.exports = authenticateToken;