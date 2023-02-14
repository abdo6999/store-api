import { UserTable } from "./../models/users";
import { Request, Response } from "express";
import * as express from "express";
import { User } from "src/models/models";
const user = (app: express.Application) => {
  app.get("/get-users", getUsers);
  app.get("/show-user/:id", showUsers);
  app.post("/create-user", createUsers);
  app.patch("/update-user/:id", updateUsers);
  app.delete("/delete-user/:id", deleteUsers);
};
let productTable = new UserTable();
const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await productTable.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`cannot get users ${error}`);
  }
};
const createUsers = async (req: Request, res: Response) => {
  const data: User =  req.body;
  try {
    const users = await productTable.create(data);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`cannot create users ${error}`);
  }
};
const showUsers = async (req: Request, res: Response) => {
  try {
    const users = await productTable.show(parseInt(req.params.id) );
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot show users ${error}`);
  }
};
const updateUsers = async (req: Request, res: Response) => {
  try {
    const data: Partial<User> = { ...req.body };
    const users = await productTable.update(data, parseInt(req.params.id));
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot update users ${error}`);
  }
};
const deleteUsers = async (req: Request, res: Response) => {
  try {
    const users = await productTable.delete(req.body.id);
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot show users ${error}`);
  }
};
export default user;
