import * as supertest from "supertest";
import app from "../server";

const request = supertest(app);
describe("Test user responses", () => {
  it("get get-users with Unauthorized endpoint to be 401", async () => {
    const response = await request.get("/get-users");
    expect(response.status).toBe(401);
  });
  it("get get-users with authorized endpoint to be 200", async () => {
    const response = await request.get("/get-users").set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
    );
    expect(response.status).toBe(200);
  });
  it("get show-user with Unauthorized and  invalid query endpoint to be 401", async () => {
    const response = await request.get("/show-user/555");
    expect(response.status).toBe(401);
  });
  it("get show-user with authorized valid query endpoint to be 200", async () => {
    const response = await request
      .get("/show-user/5")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
  it("post create-user with  valid body endpoint to be 200", async () => {
    const response = await request.post("/create-user").send({
      firstName: "Alison",
      lastName: "Reichert",
      gender: "female",
      email: "jtreleven5@nhs.uk",
      username: "jtregggffffleven5",
      password: "fghghfdh"
    });
    expect(response.status).toBe(200);
  });
  
  it("post create-user with authorized and unvalid body  endpoint to be 400", async () => {
    const response = await request
      .post("/create-user")
      .send({
        lastName: "Reichert",
        gender: "female",
        username: "jtrdddeffffleven5",
        password: "fghghfdh"
      })
    expect(response.status).toBe(400);
  });
  it("patch update-user with Unauthorized  and  valid body endpoint to be 401", async () => {
    const response = await request.patch("/update-user/4").send({
      firstName: "Alison",
      lastName: "Reichert",
      gender: "female",
    });
    expect(response.status).toBe(401);
  });
  it("patch update-user with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .patch("/update-user/4")
      .send({
        firstName: "Alison",
        lastName: "Reichert",
        gender: "female",
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
  it("delete delete-user with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .delete("/delete-user/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
});
