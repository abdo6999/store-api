"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("./../models/orders");
const middleware_1 = require("../helpers/middleware");
const order = (app) => {
    app.get("/get-orders", getOrders);
    app.get("/show-order/:id", showOrders);
    app.post("/create-order", middleware_1.authenticateToken, createOrders);
    app.patch("/update-order/:id", middleware_1.authenticateToken, updateOrders);
    app.delete("/delete-order/:id", middleware_1.authenticateToken, deleteOrders);
};
let orderTable = new orders_1.OrderTable();
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderTable.index();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).send(`cannot get orders ${error}`);
    }
});
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const orders = yield orderTable.create(data);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).send(`bad request create orders ${error}`);
    }
});
const showOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderTable.show(parseInt(req.params.id));
        if (orders == undefined) {
            res.status(404).send(`the id not exist in order `);
        }
        res.json(orders);
    }
    catch (error) {
        res.status(404).send(`the id not exist in order ${error}`);
    }
});
const updateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({}, req.body);
        const orders = yield orderTable.update(data, parseInt(req.params.id));
        res.json(orders);
    }
    catch (error) {
        res.status(404).send(`cannot update order ${error}`);
    }
});
const deleteOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderTable.delete(parseInt(req.params.id));
        res.json(orders);
    }
    catch (error) {
        res.status(404).send(`the id not exist in order ${error}`);
    }
});
exports.default = order;
