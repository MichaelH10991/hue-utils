import * as React from "react";
import WeekdayTabs from "./tabs";
import { WEEKDAYS } from "./constants";
import Table from "./table";
import Grid from "./grid";
import Meals from "./meals";

import {
  get_shopping_list_for_weekday,
  post_single_shopping_item,
  get_meal_list_for_weekday,
  post_single_meal_item,
} from "./api/shopping";

import * as api from "./api/shopping";

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "brand", headerName: "Brand", width: 180, editable: true },
  {
    field: "ammount",
    headerName: "Ammount/Qty",
    width: 180,
    editable: true,
  },
];

const day_map = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const getWeekday = (tab_number) => day_map[tab_number];

const getRows = async (tab_number) => {
  const weekday = getWeekday(tab_number);
  const shopping_list = await get_shopping_list_for_weekday(weekday);
  return shopping_list[weekday];
};

const updateServer = async (data) => {
  await post_single_shopping_item(data);
};

const get_meals = async (weekday) => {
  const meals = await get_meal_list_for_weekday(weekday);
  return meals[weekday];
};

const get_day_of_week = () => {
  const d = new Date();
  return d.getDay();
};

export default function ShoppingList() {
  const default_tab = get_day_of_week();
  const [tabValue, setTabValue] = React.useState(default_tab - 1);
  // const [rows, setRows] = React.useState([]);

  return (
    <WeekdayTabs tabs={WEEKDAYS} value={tabValue} setValue={setTabValue}>
      <Meals get_meals={get_meals} weekday={getWeekday(tabValue)} api={api} />
      <Grid
        weekday={getWeekday(tabValue)}
        columns={columns}
        update={updateServer}
        api={api}
      />
    </WeekdayTabs>
  );
}
