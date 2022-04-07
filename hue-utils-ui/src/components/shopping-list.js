import * as React from "react";
import WeekdayTabs from "./tabs";
import { WEEKDAYS } from "./constants";
import Table from "./table";
import Grid from "./grid";

import { get_list_for_week, post_single_item } from "./api/shopping";

function createData(id, name, brand, ammount) {
  return { id, name, brand, ammount };
}

// will need to fetch data in the form [ [ { name: "foo"}, { name: "bar" } ] ]
const days = {
  monday: [
    createData(1, "Chicken", "dedescsecs", "Dewcwrcsr"),
    createData(2, "Pasta", "some brand", "ewded"),
    createData(3, "Chips", "Some brand", "a bag"),
    createData(4, "Potatoes", "bkhjfbs"),
    createData(5, "Wine", "abc", "16 bottles"),
  ],
  tuesday: [
    createData(1, "ABCD", "dedescsecs", "Dewcwrcsr"),
    createData(2, "Pasta", "some brand", "ewded"),
    createData(3, "uummmmm", "Some brand", "a bag"),
    createData(4, "Potatoes", "bkhjfbs"),
    createData(5, "Wine", "abc", "16 bottles"),
  ],
  wednesday: [],
  thusday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

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
  const shopping_list = await get_list_for_week(weekday);
  return shopping_list[weekday];
};

const updateServer = async (data) => {
  await post_single_item(data);
};

export default function ShoppingList() {
  const [tabValue, setTabValue] = React.useState(0);
  // const [rows, setRows] = React.useState([]);

  return (
    <WeekdayTabs tabs={WEEKDAYS} value={tabValue} setValue={setTabValue}>
      <Grid
        weekday={getWeekday(tabValue)}
        getRows={getRows}
        columns={columns}
        tab={tabValue}
        update={updateServer}
      />
    </WeekdayTabs>
  );
}
