const { updates } = require("../../controllers");

const init = (router, config, models) => {
  const { meals } = models;
  const { upsert_one } = updates.init(meals);
  router.post("/update", async (req, res) => {
    return upsert_one(req, res, "meals");
  });
};

module.exports = { init };
