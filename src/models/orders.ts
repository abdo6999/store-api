import Client from "../database";
import { Order } from "../helpers/models";

export class OrderTable {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get orders ${error}`);
    }
  }
  async show(user_id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1);";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find products ${user_id}. ${err}`);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      let data = Object.values(o);
      const sql = createOrder(o);
      const result = await conn.query(sql, data);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not add new book ${o.orderDate}. ${err}`);
    }
  }
  async update(o: Partial<Order>, id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      let data = Object.values(o);
      const sql = updateOrderByID(o, id);
      const resualt = await conn.query(sql, data);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with products ${error}`);
    }
  }
  async delete(id: number): Promise<Order> {
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
  async deleteAll(): Promise<Order> {
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

function updateOrderByID(cols: Partial<Order>, id: number) {
  var query = ["UPDATE orders"];
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
  query.push("WHERE id = " + id + "RETURNING " + element);
  return query.join(" ");
}

function createOrder(cols: Order) {
  let len = Object.keys(cols).length;
  var query = ["INSERT INTO orders("];
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
