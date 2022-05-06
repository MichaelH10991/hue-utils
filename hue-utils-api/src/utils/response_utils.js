const send_response = (res, { message, status }) => {
  res.status(status || 200).json(message);
};

const send_error = (res, { message, status }) => {
  res.status(status || 500).json(message);
};

module.exports = { send_response, send_error };
