const { deletes } = require("../../controllers");

const init = (router, config, models) => {
  const { shopping_lists } = models;
  const { deleteOne } = deletes.init(shopping_lists);
  router.delete("/delete", async (req, res) => {
    return deleteOne(req, res, "shopping");
  });
};

module.exports = { init };
