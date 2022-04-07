const create_models = require("../models");

const connection = {
  Schema: jest.fn().mockImplementation(() => ({ method: jest.fn() })),
  model: jest.fn().mockImplementation((model) => model),
};

const schema = {
  foo: {
    name: String,
  },
};

describe("models tests", () => {
  test("models with default options", () => {
    const models = create_models(connection, schema);
    expect(models).toEqual({ foo: "foo" });
  });

  test("models with no schema", () => {
    const expected_error = new Error("Must provide schema configuration");
    expect(() => create_models(connection, undefined)).toThrow(expected_error);
  });

  test("models with no incorrect connection", () => {
    const expected_error = new Error(
      "Connection object not in expected format"
    );
    expect(() => create_models(undefined, schema)).toThrow(expected_error);
  });
});
