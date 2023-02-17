import { OrderTable } from "./../models/orders";
import { Request, Response } from "express";
import * as express from "express";
import { Order } from "../helpers/models";
import { authenticateToken } from "../helpers/middleware";

const order = (app: express.Application) => {
  app.get("/get-orders", getOrders);
  app.get("/show-order/:id", showOrders);
  app.post("/create-order", authenticateToken, createOrders);
  app.patch("/update-order/:id",authenticateToken, updateOrders);
  app.delete("/delete-order/:id",authenticateToken, deleteOrders);
};
let orderTable = new OrderTable();
const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderTable.index();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(`cannot get orders ${error}`);
  }
};
const createOrders = async (req: Request, res: Response) => {
  const data: Order = req.body;
  try {
    const orders = await orderTable.create(data);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(`bad request create orders ${error}`);
  }
};
const showOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderTable.show(parseInt(req.params.id));
    if (orders == undefined){
      res.status(404).send(`the id not exist in order `);
    }
    res.json(orders);
  } catch (error) {
    res.status(404).send(`the id not exist in order ${error}`);
  }
};
const updateOrders = async (req: Request, res: Response) => {
  try {
    const data: Partial<Order> = { ...req.body };
    const orders = await orderTable.update(data, parseInt(req.params.id));
    res.json(orders);
  } catch (error) {
    res.status(404).send(`cannot update order ${error}`);
  }
};
const deleteOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderTable.delete(parseInt(req.params.id));
    res.json(orders);
  } catch (error) {
    res.status(404).send(`the id not exist in order ${error}`);
  }
};
export default order;
