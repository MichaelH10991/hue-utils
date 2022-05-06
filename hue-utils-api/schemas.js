module.exports = {
  shopping_lists: [
    {
      weekday: String,
      id: String,
      name: String,
      brand: String,
      ammount: String,
    },
  ],
  meals: [
    {
      weekday: String,
      id: String,
      name: String,
      person: [{ name: String }],
      meal: String,
    },
  ],
};
