var jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    const header = req.headers.authorization;
    console.log("middlewares", req.headers);

    if (!header) {
        return res.status(401).json({ message: "Token is not present or token is not provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        // Uncomment and modify the following lines if you are using a blacklist token check
        // const blacklistToken = await BlacklistToken.findOne({ token });
        // if (blacklistToken) {
        //     return res.status(400).json({ message: "This token is blacklisted, try to get a new token" });
        // }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "This is not a valid token" });
    }
};

module.exports = auth;
