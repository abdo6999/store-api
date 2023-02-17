"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwtToken = {
    sign(username) {
        return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: "48h" });
    },
    signRefresh(username) {
        return jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    },
    vreifyRefreshToken(refreshToken) {
        let username;
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err)
                throw err;
            username = payload.username || null;
        });
        return username;
    }
};
exports.default = jwtToken;
