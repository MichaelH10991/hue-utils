const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config");
const schemas = require("./schemas");
const { db, api } = require("./src");

const app = express();
const router = express.Router();

const corsOptions = {
  origin: function (origin, callback) {
    if (config.whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin: ${origin} Not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const init_api = async () => {
  const connection = await db.connect(config.db);
  const models = db.create_models(connection, schemas);
  api.init(config, models, router);
};

init_api();

app.use(bodyParser.json());
app.use("/", router);

const startupMessage = `server listening on http://localhost:${config.app_port}`;

app.listen(config.app_port, () => console.log(startupMessage));
