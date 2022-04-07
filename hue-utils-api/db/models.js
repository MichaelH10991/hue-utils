const NO_SCHEMA = "Must provide schema configuration";
const NO_CONNECTION = "Connection object not in expected format";

const toJSON = () => {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};

const create_models = (connection, schema_defs) => {
  return Object.keys(schema_defs).reduce((acc, schema_name) => {
    const schema = connection.Schema(schema_defs[schema_name], {
      timestamps: true,
    });
    schema.method("toJSON", toJSON);
    return { ...acc, [schema_name]: connection.model(schema_name, schema) };
  }, {});
};

const init = (connection, schema_defs) => {
  if (!schema_defs) {
    throw new Error(NO_SCHEMA);
  }
  if (!connection || !connection.Schema || !connection.model) {
    throw new Error(NO_CONNECTION);
  }
  return create_models(connection, schema_defs);
};

module.exports = init;
