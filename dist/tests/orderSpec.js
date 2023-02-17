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
const supertest = require("supertest");
const server_1 = require("../server");
const request = supertest(server_1.default);
describe("Test order responses", () => {
    it("get get-orders endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/get-orders");
        expect(response.status).toBe(200);
    }));
    it("get show-order with invalid query endpoint to be 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-order/555");
        expect(response.status).toBe(404);
    }));
    it("get show-order with valid query endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-order/5");
        expect(response.status).toBe(200);
    }));
    it("post create-order with Unauthorized and valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-order").send({
            products_id: [8, 15],
            user_id: 5,
            stutas: false,
            orderDate: "23/06/2013"
        });
        expect(response.status).toBe(401);
    }));
    it("post create-order with authorized and  valid body  endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-order")
            .send({
            products_id: [8, 15],
            user_id: 5,
            stutas: false,
            orderDate: "23/06/2013"
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
    it("post create-order with authorized and unvalid body  endpoint to be 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-order")
            .send({
            products_id: [8, 15],
            user_id: 5,
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(400);
    }));
    it("patch update-order with Unauthorized  and  valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.patch("/update-order/4").send({
            user_id: 3,
            orderDate: "23/05/2013"
        });
        expect(response.status).toBe(401);
    }));
    it("patch update-order with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch("/update-order/4")
            .send({
            user_id: 3,
            orderDate: "23/05/2013"
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
    it("delete delete-order with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/delete-order/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
});
