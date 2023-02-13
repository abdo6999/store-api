import {Response,Request} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as env from "dotenv";
env.config();
const app: express.Application = express();
const address: string = process.env.POSTGRES_HOST || "0.0.0.0:3000";
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
