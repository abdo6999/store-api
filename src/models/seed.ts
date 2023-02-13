import data from '../DummyData';
import Client from '../database';
import { Product } from './models';
create(data);
async function create(p: Product[]) {
  try {
    const sql =
      'INSERT INTO products (id, title, price, rating, stock, brand, description, category, thumbnail, images) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    // @ts-ignore
    const conn = await Client.connect();
    let result;
    for (let i = 0; i < p.length; i++) {
      let pIndex = p[i];
      result = await conn.query(sql, [
        pIndex.id,
        pIndex.title,
        pIndex.price,
        pIndex.rating,
        pIndex.stock,
        pIndex.brand,
        pIndex.description,
        pIndex.category,
        pIndex.thumbnail,
        pIndex.images
      ]);
    }
    conn.release();
  } catch (err) {
    throw new Error(`Could not add new Products . Error: ${err}`);
  }
}
