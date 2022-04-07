const { send_response, send_error } = require("../../utils");

const init = (router, config, models) => {
  router.post("/update/list", async (req, res) => {
    const { shopping_lists } = models;
    try {
      if (!req.body) {
        send_response(res, { message: "no data received" });
        throw new Error("no data");
      }
      const weekday = Object.keys(req.body)[0];
      const weekday_items = req.body[weekday];

      // const docs = await shopping_lists.aggregate([
      //   { $project: { [weekday]: 1 } },
      // ]);

      let saved_items = [];
      for (let i = 0; i < weekday_items.length; i++) {
        const item = weekday_items[i];
        console.log("saving", { ...item, weekday });
        const update = { ...item, weekday };

        const upd = await shopping_lists.findOneAndUpdate(
          { id: item.id },
          update,
          {
            new: true,
            upsert: true, // Make this update into an upsert
          }
        );
        saved_items.push(upd.toObject());
      }

      // const shopping = new shopping_lists(req.body);
      // const response = await shopping.save(shopping);
      if (saved_items.length) {
        console.log("saved:", saved_items);
        send_response(res, { message: saved_items });
      }
    } catch (e) {
      console.log(e.message);
      send_error(res, { message: e.message });
    }
  });
};

module.exports = { init };
