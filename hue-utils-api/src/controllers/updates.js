const { uuid } = require("uuidv4");
const { send_response, send_error } = require("../utils");

const init = (model) => {
  const upsertOne = async (req, res, type) => {
    try {
      if (!req.body || !Object.keys(req.body).length) {
        return send_response(res, { message: "no body received", status: 400 });
      }
      const item = req.body;

      item.weekday = item.weekday.toLowerCase();

      if (!item.id) {
        item.id = uuid();
      }

      const upd = await model.findOneAndUpdate({ id: item.id }, item, {
        new: true,
        upsert: true, // Make this update into an upsert
      });

      if (upd) {
        const upd_json = upd.toObject();
        console.log(`${type} item saved:`, upd_json.id);
        return send_response(res, { message: upd.toObject() });
      }
    } catch (e) {
      console.log(e.message);
      return send_error(res, { message: e.message });
    }
  };

  return { upsertOne };
};

module.exports = { init };
