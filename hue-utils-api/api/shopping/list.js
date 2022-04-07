const { send_response, send_error } = require("../../utils");

const list_by_weekday = (weekday) => {
  return [
    {
      $match: { weekday: weekday },
    },
    {
      $group: { _id: "$weekday", [weekday]: { $push: "$$ROOT" } },
    },
  ];
};

const init = (router, config, models) => {
  router.get("/list", async (req, res) => {
    const { shopping_lists } = models;
    const { weekday } = req.query;

    try {
      if (!weekday) {
        const result = await shopping_lists.find();
        const to_object = result.map((model) => model.toObject());
        send_response(res, { message: to_object });
      } else {
        const result = await shopping_lists.aggregate(list_by_weekday(weekday));
        send_response(res, { message: result[0] });
      }
    } catch (e) {
      console.log(e.message);
      send_error(res, { message: e.message });
    }
  });
};

module.exports = { init };
