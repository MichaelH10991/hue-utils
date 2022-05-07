import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import UpdateDialog from "./update-dialog";

function ActionAreaCard({ meal, meals, setMeals, removeItem }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: 300,
        height: 150,
        position: "relative",
        marginRight: "10px",
      }}
    >
      <IconButton
        onClick={removeItem}
        aria-label="delete"
        size="medium"
        style={{ position: "absolute", right: "0px", zIndex: 1 }}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>

      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        {meal.meal}
        <Typography gutterBottom variant="h5" component="div">
          {meal.name}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {meal.description || "no description"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <UpdateDialog
        title={"update"}
        prev_meal={meal}
        meals={meals}
        setMeals={setMeals}
      />
    </Card>
  );
}

export default function Meals({ weekday, api }) {
  const [meals, setMeals] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.get_meal_list_for_weekday(weekday);
      if (result) {
        setMeals(result[weekday]);
      } else {
        setMeals([]);
      }
    };

    fetchData();
  }, []);

  const removeItem = (id) => async () => {
    const newMeals = meals.filter((meal) => meal.id !== id);
    setMeals(newMeals);
    await api.delete_single_meal_item(id);
  };
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1}>
        {meals.map((meal, index) => (
          <ActionAreaCard
            key={index}
            meal={meal}
            meals={meals}
            setMeals={setMeals}
            removeItem={removeItem(meal.id)}
          />
        ))}
      </Stack>
      <div style={{ padding: "1em" }}>
        <UpdateDialog title={"add new"} weekday={weekday} setMeals={setMeals} />
      </div>
    </div>
  );
}
