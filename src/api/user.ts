import jwtToken from "../helpers/jwt";
import { UserTable } from "./../models/users";
import { Request, Response, NextFunction } from "express";
import * as express from "express";
import { User } from "src/models/models";
import { authenticateToken } from "../helpers/middleware";
const user = (app: express.Application) => {
  app.get("/get-users", authenticateToken, getUsers);
  app.get("/show-user/:id", authenticateToken, showUsers);
  app.post("/create-user", createUsers);
  app.post("/refresh-token", refreshToken);
  app.patch("/update-user/:id", authenticateToken, updateUsers);
  app.delete("/delete-user/:id", authenticateToken, deleteUsers);
  app.post("/authenticate-user", authenticateUser);
};
let userTable = new UserTable();
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userTable.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`cannot get users ${error}`);
  }
};
const createUsers = async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    const users = await userTable.create(data);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`cannot create users ${error}`);
  }
};
const showUsers = async (req: Request, res: Response) => {
  try {
    const users = await userTable.show(parseInt(req.params.id));
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot show users ${error}`);
  }
};
const updateUsers = async (req: Request, res: Response) => {
  try {
    const data: Partial<User> = { ...req.body };
    const users = await userTable.update(data, parseInt(req.params.id));
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot update users ${error}`);
  }
};
const deleteUsers = async (req: Request, res: Response) => {
  try {
    const users = await userTable.delete(req.body.id);
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot show users ${error}`);
  }
};
const authenticateUser = async (req: Request, res: Response) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password
    };
    const users = await userTable.authenticate(data.username, data.password);
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot update users ${error}`);
  }
};
const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const users = jwtToken.vreifyRefreshToken(refreshToken);
    const userToken = jwtToken.sign({username: users});
    const userRefreshToken = jwtToken.signRefresh({username: users});
    res.status(200).json({ accessToken: userToken , refreshToken: userRefreshToken });
  } catch (error) {
    res.status(500).send(`cannot get users ${error}`);
  }
};
export default user;
