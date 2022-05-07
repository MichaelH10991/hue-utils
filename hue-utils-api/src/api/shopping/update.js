const { updates } = require("../../controllers");

const init = (router, config, models) => {
  const { shopping_lists } = models;
  const { upsert_one } = updates.init(shopping_lists);
  router.post("/update", async (req, res) => {
    return upsert_one(req, res, "shopping");
  });
};

module.exports = { init };
