const { send_response, send_error } = require("../../utils");

const init = (router, config, models) => {
  router.post("/update", async (req, res) => {
    const { shopping_lists } = models;
    try {
      if (!req.body) {
        send_response(res, { message: "no body received", status: 400 });
      }
      const weekday_item = req.body;

      const upd = await shopping_lists.findOneAndUpdate(
        { id: weekday_item.id },
        weekday_item,
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      );

      if (upd) {
        const upd_json = upd.toObject();
        console.log("item saved:", upd_json.id);
        send_response(res, { message: upd.toObject() });
      }
    } catch (e) {
      console.log(e.message);
      send_error(res, { message: e.message });
    }
  });
};

module.exports = { init };
