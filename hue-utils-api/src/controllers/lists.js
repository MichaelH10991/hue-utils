const { send_response, send_error } = require("../utils");

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

const init = (model) => {
  const list_all = async (req, res, type) => {
    const { weekday } = req.query;
    try {
      if (!weekday) {
        const result = await model.find();
        return send_response(res, { message: result.toObject() });
      }

      const result = await model.aggregate(list_by_weekday(weekday));
      if (result.length) {
        console.log(`${type}: returning`, result[0]);
        return send_response(res, { message: result[0] });
      } else {
        console.log(`${type}: nothing returned for ${weekday}`);
      }
    } catch (error) {
      return send_error(res, { message: error.message });
    }
  };
  return { list_all };
};

module.exports = { init };
