const { lists } = require("../../controllers");

const init = (router, config, models) => {
  const { meals } = models;
  const { list_all } = lists.init(meals);
  router.get("/list", async (req, res) => {
    return list_all(req, res, "meals");
  });
};

module.exports = { init };
