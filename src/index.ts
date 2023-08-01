import express from "express";
import connection from "./Database/database";
import routes from "./Routes/routes";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "./../.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port: any = process.env.RUNNING_PORT || 8080;

connection();

app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
