const { updates } = require("../../controllers");

const init = (router, config, models) => {
  const { meals } = models;
  const { upsertOne } = updates.init(meals);
  router.post("/update", async (req, res) => {
    return upsertOne(req, res, "meals");
  });
};

module.exports = { init };
