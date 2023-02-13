import Client from "../database";
import { Product } from "./models";
export class Products {
   async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM proudct";
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get proudct ${error}`);
    }
  }
   async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM books WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }
   async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO product (id, title, price, rating, stock, brand, description, category, thumbnail, images) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        p.id,
        p.title,
        p.price,
        p.rating,
        p.stock,
        p.brand,
        p.description,
        p.category,
        p.thumbnail,
        p.images,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new book ${p.title}. Error: ${err}`);
    }
  }

}
