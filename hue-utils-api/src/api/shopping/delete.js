const { deletes } = require("../../controllers");

const init = (router, config, models) => {
  const { shopping_lists } = models;
  const { delete_one } = deletes.init(shopping_lists);
  router.delete("/delete", async (req, res) => {
    return delete_one(req, res, "shopping");
  });
};

module.exports = { init };
