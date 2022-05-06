const { deletes } = require("../../controllers");

const init = (router, config, models) => {
  const { meals } = models;
  const { deleteOne } = deletes.init(meals);
  router.delete("/delete", async (req, res) => {
    return deleteOne(req, res, "meals");
  });
};

module.exports = { init };
