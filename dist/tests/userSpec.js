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
describe("Test user values", () => {
    it("get get-products endpoint retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/get-users")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(Object.keys(response.body[0])).toEqual([
            "id",
            "firstname",
            "lastname",
            "password",
            "email",
            "gender",
            "username"
        ]);
    }));
    it("get show-product endpoint retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/show-user/5")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        let match = 0;
        let values = [
            5,
            "Mavis",
            "Schultz",
            ,
            "kmeus4@upenn.edu",
            "male",
            "kmeus4"
        ];
        let res = Object.values(response.body);
        for (let i = 0; i < res.length; i++) {
            if (values[i] === res[i]) {
                match += 1;
            }
        }
        expect(match).toBe(6);
    }));
    it("post create-order endpoint retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-user").send({
            firstName: "Mavis",
            lastName: "Schultz",
            gender: "male",
            email: "kmeus4@upenn.edu",
            username: "kmedsasseus4",
            password: "fghfdhdfgh"
        });
        expect(Object.keys(response.body)).toEqual(["accessToken", "refreshToken"]);
    }));
    it("patch update-order with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch("/update-user/4")
            .send({
            lastName: "Schulssstz",
            email: "kddddd4@upenn.edu"
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.body).toEqual({
            lastname: "Schulssstz",
            email: "kddddd4@upenn.edu"
        });
    }));
});
const request = supertest(server_1.default);
describe("Test user responses", () => {
    it("get get-users with Unauthorized endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/get-users");
        expect(response.status).toBe(401);
    }));
    it("get get-users with authorized endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/get-users")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
    it("get show-user with Unauthorized and  invalid query endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-user/555");
        expect(response.status).toBe(401);
    }));
    it("get show-user with authorized valid query endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/show-user/5")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
    it("post create-user with  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-user").send({
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female",
            email: "jtreleven5@nhs.uk",
            username: "jtregggffffleven5",
            password: "fghghfdh"
        });
        expect(response.status).toBe(200);
    }));
    it("post create-user with authorized and unvalid body  endpoint to be 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-user").send({
            lastName: "Reichert",
            gender: "female",
            username: "jtrdddeffffleven5",
            password: "fghghfdh"
        });
        expect(response.status).toBe(400);
    }));
    it("patch update-user with Unauthorized  and  valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.patch("/update-user/4").send({
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female"
        });
        expect(response.status).toBe(401);
    }));
    it("patch update-user with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch("/update-user/4")
            .send({
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female"
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
    it("delete delete-user with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/delete-user/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
});
