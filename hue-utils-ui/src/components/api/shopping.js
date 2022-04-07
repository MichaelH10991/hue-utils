import axios from "axios";

const AUTOMATION_API = "http://localhost:8080/shopping/";

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

const get_list_for_week = async (weekday) => {
  const url = `${AUTOMATION_API}/list?weekday=${weekday}`;
  handle_axios(async () => await axios.get(url));
};

const post_single_item = async (item) => {
  console.log(item);
  const url = `${AUTOMATION_API}/update`;
  handle_axios(async () => await axios.post(url, item));
};

export { get_list_for_week, post_single_item };
