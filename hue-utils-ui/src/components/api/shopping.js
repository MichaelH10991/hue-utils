import axios from "axios";

const SHOPPING_API = "http://localhost:8082/shopping";
const MEALS_API = "http://localhost:8082/meals";

const handle_axios = async (callback) => {
  try {
    const response = await callback();
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.request) {
      console.log("There was an error sending request:", error.message);
    } else if (error.response) {
      console.log("There was an error getting response:", error.message);
    } else {
      console.log("Error setting up request:", error.message);
    }
  }
};

const get_shopping_list_for_weekday = async (weekday) => {
  return handle_axios(
    async () => await axios.get(`${SHOPPING_API}/list?weekday=${weekday}`)
  );
};

const post_single_shopping_item = async (item) => {
  return handle_axios(
    async () => await axios.post(`${SHOPPING_API}/update`, item)
  );
};

const get_meal_list_for_weekday = async (weekday) => {
  return handle_axios(
    async () => await axios.get(`${MEALS_API}/list?weekday=${weekday}`)
  );
};

const post_single_meal_item = async (item) => {
  return handle_axios(
    async () => await axios.post(`${MEALS_API}/update`, item)
  );
};

const delete_single_meal_item = async (id) => {
  return handle_axios(
    async () => await axios.delete(`${MEALS_API}/delete?id=${id}`)
  );
};

const delete_single_shopping_item = async (id) => {
  return handle_axios(
    async () => await axios.delete(`${SHOPPING_API}/delete?id=${id}`)
  );
};

export {
  get_shopping_list_for_weekday,
  post_single_shopping_item,
  get_meal_list_for_weekday,
  post_single_meal_item,
  delete_single_meal_item,
  delete_single_shopping_item,
};
