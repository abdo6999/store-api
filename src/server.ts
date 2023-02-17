import { Response, Request } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import product from "./api/product";
import user from "./api/user";
import order from "./api/order";
import * as env from "dotenv";

env.config({override:true});
const { ENV } = process.env;
const app: express.Application = express();
const address: string = "4000";
app.use(bodyParser.json());

app.get("/", function(req: Request, res: Response) {
  res.send("Hello World!");
});
product(app);
user(app);
order(app);
app.listen(address, function() {
  console.log(`starting app on: ${address}`);
});

export default app