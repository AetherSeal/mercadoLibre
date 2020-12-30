import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";
import { development } from "./config.js";

const app = express();

app.use("/", cors(), routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(development.port, () => {
  console.log("app running on port.", server.address().port);
  console.log("express started press ctrl+c to terminate");
});
