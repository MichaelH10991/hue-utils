const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config");
const schemas = require("./schemas");
const db = require("./db");
const api = require("./api");

const app = express();
const router = express.Router();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const foo = async () => {
  const connection = await db.connect(config.db);
  const models = db.create_models(connection, schemas);
  api.init(config, models, router);
};

foo();

app.use(bodyParser.json());
app.use("/", router);

const startupMessage = `server listening on http://localhost:${config.app_port}`;

app.listen(config.app_port, () => console.log(startupMessage));
