const { updates } = require("../../controllers");

const init = (router, config, models) => {
  const { shopping_lists } = models;
  const { upsertOne } = updates.init(shopping_lists);
  router.post("/update", async (req, res) => {
    return upsertOne(req, res, "shopping");
  });
};

module.exports = { init };
