const { deletes } = require("../../controllers");

const init = (router, config, models) => {
  const { meals } = models;
  const { delete_one } = deletes.init(meals);
  router.delete("/delete", async (req, res) => {
    return delete_one(req, res, "meals");
  });
};

module.exports = { init };
