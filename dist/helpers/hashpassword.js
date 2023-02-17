"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const env = require("dotenv");
env.config();
const { PEPPER, SALT_ROUNDS } = process.env;
const hashpass = {
    hash(password) {
        return bcrypt.hashSync(password + PEPPER, parseInt(SALT_ROUNDS));
    },
    compare(password, inputpassword) {
        password = password + PEPPER;
        return bcrypt.compareSync(password, inputpassword);
    }
};
exports.default = hashpass;
