import * as supertest from "supertest";
import app from "../server";

const request = supertest(app);
describe("Test order responses", () => {
  it("get get-orders endpoint to be 200", async () => {
    const response = await request.get("/get-orders");
    expect(response.status).toBe(200);
  });
  it("get show-order with invalid query endpoint to be 404", async () => {
    const response = await request.get("/show-order/555");
    expect(response.status).toBe(404);
  });
  it("get show-order with valid query endpoint to be 200", async () => {
    const response = await request.get("/show-order/5");
    expect(response.status).toBe(200);
  });
  it("post create-order with Unauthorized and valid body endpoint to be 401", async () => {
    const response = await request.post("/create-order").send({
      products_id: [8, 15],
      user_id: 5,
      stutas: false,
      orderDate: "23/06/2013"
    });
    expect(response.status).toBe(401);
  });
  it("post create-order with authorized and  valid body  endpoint to be 200", async () => {
    const response = await request
      .post("/create-order")
      .send({
        user_id: 5,
        stutas: false,
        orderDate: "23/06/2013"
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
  it("post create-order with authorized and unvalid body  endpoint to be 400", async () => {
    const response = await request
      .post("/create-order")
      .send({
        products_id: [8, 15],
        user_id: 5
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(400);
  });
  it("patch update-order with Unauthorized  and  valid body endpoint to be 401", async () => {
    const response = await request.patch("/update-order/4").send({
      user_id: 3,
      orderDate: "23/05/2013"
    });
    expect(response.status).toBe(401);
  });
  it("patch update-order with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .patch("/update-order/4")
      .send({
        user_id: 3,
        orderDate: "23/05/2013"
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
  it("delete delete-order with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .delete("/delete-order/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
});
