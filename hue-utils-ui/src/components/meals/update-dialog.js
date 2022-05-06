import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { post_single_meal_item } from "../api/shopping";

const fields = [
  { name: "meal" },
  { name: "name" },
  {
    name: "weekday",
    type: "select",
    contents: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
];

const createFields = (formData, setFormData) => {
  return fields.map((field, index) => (
    <TextField
      onChange={(e) => {
        formData[field.name] = e.target.value;
        setFormData(formData);
      }}
      key={index}
      autoFocus
      select={field.type === "select"}
      margin="dense"
      id={field}
      label={field.name}
      type={field.type || "name"}
      fullWidth
      variant="standard"
    >
      {field.contents &&
        field.contents.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
    </TextField>
  ));
};

export default function FormDialog({ title, prev_meal, meals, setMeals }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (prev_meal) {
      const meal_item = { ...prev_meal, ...formData };
      setMeals((prevMeals) => {
        return prevMeals.map((prevMeal) => {
          if (prevMeal.id === meal_item.id) {
            return { ...prevMeal, ...meal_item };
          }
          return prevMeal;
        });
      });
      await post_single_meal_item(meal_item);
    } else {
      meals.push(formData);
      setMeals(meals);
      await post_single_meal_item(formData);
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new meal here if you feel like it, go on wooooop break my
            website!
          </DialogContentText>
          {createFields(formData, setFormData)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
