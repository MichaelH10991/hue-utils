const mongoose = require("mongoose");
const {
  NO_CONFIG,
  SUCCESS_PREFIX,
  DB_CONNECT_ERROR_PREFIX,
} = require("./constants");

const mongo_options = (config) => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: config.database_name,
    user: config.username,
    pass: config.password,
    dbName: config.database_name,
  };
};

module.exports = connect = async (db_config) => {
  mongoose.Promise = global.Promise;
  if (!db_config) {
    throw new Error(NO_CONFIG);
  }
  try {
    const options = mongo_options(db_config);
    const db_instance = await mongoose.connect(db_config.mongo_url, options);
    console.log(`${SUCCESS_PREFIX} ${db_config.mongo_url}`);
    return db_instance;
  } catch (e) {
    console.log({ DB_CONNECT_ERROR_PREFIX }, e);
    throw e;
  }
};
