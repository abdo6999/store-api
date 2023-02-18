"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const product_1 = require("./api/product");
const user_1 = require("./api/user");
const order_1 = require("./api/order");
const app = express();
const address = "4000";
app.use(bodyParser.json());
app.get("/", function (req, res) {
    res.send(app._router.stack);
});
(0, product_1.default)(app);
(0, user_1.default)(app);
(0, order_1.default)(app);
app.listen(address, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
