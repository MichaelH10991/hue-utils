import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { post_single_meal_item } from "../api/shopping";
import { v4 as uuidv4 } from "uuid";

const fields = [{ name: "meal" }, { name: "name" }];

const createFields = (formData, setFormData, weekday) => {
  return fields.map((field, index) => (
    <TextField
      onChange={(e) => {
        formData[field.name] = e.target.value;
        setFormData({ ...formData, weekday, id: uuidv4() });
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
    />
  ));
};

export default function FormDialog({ title, prev_meal, setMeals, weekday }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
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
      setMeals((prevMeals) => {
        return [...prevMeals, formData];
      });
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
          {createFields(formData, setFormData, weekday)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
