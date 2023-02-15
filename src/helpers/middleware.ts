import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as env from "dotenv";
const { ACCESS_TOKEN_SECRET } = process.env;

env.config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autheHeader = req.get("authorization");
  const token = autheHeader?.split(" ")[1];
  if (token == null || token == undefined) return res.status(401).send("token rquiered");
    
  jwt.verify(token!, ACCESS_TOKEN_SECRET!, (err, users) => {
    if (err) return res.status(403).send("token unvalid");
    next();
  });
};
