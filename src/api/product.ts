import { ProductTable } from './../models/products';
import { Request, Response } from 'express';
import * as express from 'express';
import { Product } from 'src/models/models';
const product = (app: express.Application) => {
  app.get('/get-products', getProducts);
  app.get('/show-product/:id', showProducts);
  app.post('/create-product', createProducts)
  app.patch('/update-product/:id', updateProducts)
  app.delete('/delete-product/:id', deleteProducts);
};
let productTable = new ProductTable();
const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productTable.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(`cannot get products ${error}`);
  }
};
const createProducts = async (req: Request, res: Response) => {
  const data: Product = req.body;
  try {
    const products = await productTable.create(data);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(`cannot create products ${error}`);
  }
};
const showProducts = async (req: Request, res: Response) => {
  try {
    const products = await productTable.show(parseInt(req.params.id) );
    res.json(products);
  } catch (error) {
    res.status(500).send(`cannot show products ${error}`);
  }
};
const updateProducts = async (req: Request, res: Response) => {
  try {
    const data: Partial<Product> = { ...req.body };
    const products = await productTable.update(data, parseInt(req.params.id) );
    res.json(products);
  } catch (error) {
    res.status(500).send(`cannot update products ${error}`);
  }
};
const deleteProducts = async (req: Request, res: Response) => {
  try {
    const products = await productTable.delete(parseInt(req.params.id) );
    res.json(products);
  } catch (error) {
    res.status(500).send(`cannot show products ${error}`);
  }
};
export default product;
