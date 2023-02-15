import Client from "../database";
import { Product } from "./models";

export class ProductTable {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1);";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find products ${id}. Error: ${err}`);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      let data = Object.values(p);
      const sql = createProduct(p);
      const result = await conn.query(sql, data);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new book ${p.title}. Error: ${err}`);
    }
  }
  async update(p: Partial<Product>, id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      let data = Object.values(p);
      const sql = updateProductByID(p, id);
      const resualt = await conn.query(sql, data);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with products ${error}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM  products WHERE id =($1) RETURNING *;";
      const resualt = await conn.query(sql, [id]);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with products ${error}`);
    }
  }
  async deleteAll(): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE * FROM  products;";
      const resualt = await conn.query(sql);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with products ${error}`);
    }
  }
} // end of class

function updateProductByID(cols: Partial<Product>, id: number) {
  var query = ["UPDATE products"];
  query.push("SET");
  var set: string[] = [];
  Object.keys(cols).forEach(function(key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  let reg = /^([\w\-]+)/;
  let updatValus: string[] = set.map(a => a.match(reg)![0]);
  let element = "";
  for (let i = 0; i < updatValus.length; i++) {
    element += updatValus[i];
    if (i < updatValus.length - 1) {
      element += ",";
    }
  }
  console.log(element);
  query.push("WHERE id = " + id + "RETURNING " + element);
  return query.join(" ");
}

function createProduct(cols: Product) {
  let len = Object.keys(cols).length;
  var query = ["INSERT INTO products("];
  var set = [];
  Object.keys(cols).forEach(function(key, i) {
    if (i < len - 1) {
      set.push(key + ",");
    } else {
      set.push(key);
    }
  });
  set.push(") VALUES(");
  Object.keys(cols).forEach(function(key, i) {
    if (i < len - 1) {
      set.push(`$${i + 1},`);
    } else {
      set.push(`$${i + 1}`);
    }
  });
  set.push(") RETURNING *;");
  query.push(set.join(" "));
  return query.join(" ");
}
