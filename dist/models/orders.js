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
exports.OrderTable = void 0;
const database_1 = require("../database");
class OrderTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders;";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get orders ${error}`);
            }
        });
    }
    show(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id=($1);";
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find products ${user_id}. ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                let data = Object.values(o);
                const sql = createOrder(o);
                const result = yield conn.query(sql, data);
                const Order = result.rows[0];
                conn.release();
                return Order;
            }
            catch (err) {
                throw new Error(`Could not add new book ${o.orderDate}. ${err}`);
            }
        });
    }
    update(o, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                let data = Object.values(o);
                const sql = updateOrderByID(o, id);
                const resualt = yield conn.query(sql, data);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with products ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM  products WHERE id =($1) RETURNING *;";
                const resualt = yield conn.query(sql, [id]);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with products ${error}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE * FROM  products;";
                const resualt = yield conn.query(sql);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with products ${error}`);
            }
        });
    }
} // end of class
exports.OrderTable = OrderTable;
function updateOrderByID(cols, id) {
    var query = ["UPDATE orders"];
    query.push("SET");
    var set = [];
    Object.keys(cols).forEach(function (key, i) {
        set.push(key + " = ($" + (i + 1) + ")");
    });
    query.push(set.join(", "));
    let reg = /^([\w\-]+)/;
    let updatValus = set.map(a => a.match(reg)[0]);
    let element = "";
    for (let i = 0; i < updatValus.length; i++) {
        element += updatValus[i];
        if (i < updatValus.length - 1) {
            element += ",";
        }
    }
    query.push("WHERE id = " + id + "RETURNING " + element);
    return query.join(" ");
}
function createOrder(cols) {
    let len = Object.keys(cols).length;
    var query = ["INSERT INTO orders("];
    var set = [];
    Object.keys(cols).forEach(function (key, i) {
        if (i < len - 1) {
            set.push(key + ",");
        }
        else {
            set.push(key);
        }
    });
    set.push(") VALUES(");
    Object.keys(cols).forEach(function (key, i) {
        if (i < len - 1) {
            set.push(`$${i + 1},`);
        }
        else {
            set.push(`$${i + 1}`);
        }
    });
    set.push(") RETURNING *;");
    query.push(set.join(" "));
    return query.join(" ");
}
