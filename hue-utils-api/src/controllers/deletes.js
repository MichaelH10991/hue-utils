const { send_response, send_error } = require("../utils");

const init = (model) => {
  const deleteOne = async (req, res, type) => {
    try {
      const { id } = req.query;

      const upd = await model.deleteOne({ id });

      if (upd.acknowledged) {
        const message = `${type} ${upd.deletedCount} items deleted`;
        console.log(message);
        return send_response(res, { message });
      }
    } catch (e) {
      console.log(e.message);
      return send_error(res, { message: e.message });
    }
  };

  return { deleteOne };
};

module.exports = { init };
