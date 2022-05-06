const { lists } = require("../../controllers");

const init = (router, config, models) => {
  const { shopping_lists } = models;
  const { list_all } = lists.init(shopping_lists);
  router.get("/list", async (req, res) => {
    return list_all(req, res, "shopping");
  });
};

module.exports = { init };
