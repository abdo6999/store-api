import * as supertest from "supertest";
import app from "../server";

const request = supertest(app);
describe("Test product responses", () => {
  it("get get-products endpoint to be 200", async () => {
    const response = await request.get("/get-products");
    expect(response.status).toBe(200);
  });
  it("get show-product with invalid query endpoint to be 404", async () => {
    const response = await request.get("/show-product/555");
    expect(response.status).toBe(404);
  });
  it("get show-product with valid query endpoint to be 200", async () => {
    const response = await request.get("/show-product/5");
    expect(response.status).toBe(200);
  });
  it("post create-product with Unauthorized and valid body endpoint to be 401", async () => {
    const response = await request.post("/create-product").send({
      title: "- Daal Masoor 500 grams",
      description: "Fine quality Branded Product Keep in a cool and dry place",
      price: 20,
      rating: 4.44,
      stock: 133,
      brand: "Saaf & Khaas",
      category: "groceries",
      thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
      images: [
        "https://i.dummyjson.com/data/products/21/1.png",
        "https://i.dummyjson.com/data/products/21/2.jpg",
        "https://i.dummyjson.com/data/products/21/3.jpg"
      ]
    });
    expect(response.status).toBe(401);
  });
  it("post create-product with authorized and  valid body  endpoint to be 200", async () => {
    const response = await request
      .post("/create-product")
      .send({
        title: "- Daal Masoor 500 grams",
        description:
          "Fine quality Branded Product Keep in a cool and dry place",
        price: 20,
        rating: 4.44,
        stock: 133,
        brand: "Saaf & Khaas",
        category: "groceries",
        thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
        images: [
          "https://i.dummyjson.com/data/products/21/1.png",
          "https://i.dummyjson.com/data/products/21/2.jpg",
          "https://i.dummyjson.com/data/products/21/3.jpg"
        ]
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
  it("post create-product with authorized and unvalid body  endpoint to be 400", async () => {
    const response = await request
      .post("/create-product")
      .send({
        price: 20,
        rating: 4.44,
        stock: 133,
        brand: "Saaf & Khaas",
        category: "groceries",
        thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
        images: [
          "https://i.dummyjson.com/data/products/21/1.png",
          "https://i.dummyjson.com/data/products/21/2.jpg",
          "https://i.dummyjson.com/data/products/21/3.jpg"
        ]
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(400);
  });
  it("patch update-product with Unauthorized  and  valid body endpoint to be 401", async () => {
    const response = await request.patch("/update-product/4").send({
      brand: "Saaf & Khaas",
      category: "groceries",
      thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
      images: [
        "https://i.dummyjson.com/data/products/21/1.png",
        "https://i.dummyjson.com/data/products/21/2.jpg",
        "https://i.dummyjson.com/data/products/21/3.jpg"
      ]
    });
    expect(response.status).toBe(401);
  });
  it("patch update-product with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .patch("/update-product/4")
      .send({
        brand: "Saaf & Khaas",
        category: "groceries",
        thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
        images: [
          "https://i.dummyjson.com/data/products/21/1.png",
          "https://i.dummyjson.com/data/products/21/2.jpg",
          "https://i.dummyjson.com/data/products/21/3.jpg"
        ]
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
  it("delete delete-product with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .delete("/delete-product/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M"
      );
    expect(response.status).toBe(200);
  });
});
