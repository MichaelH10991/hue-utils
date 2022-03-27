import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Dialog from "./dialog";

import data from "./test-data.json";

export default function NestedList() {
  const [open, setOpen] = React.useState([]);

  const handleClick = (value) => () => {
    const currentIndex = open.indexOf(value);
    const newChecked = [...open];

    if (currentIndex === -1) {
      // if not in list add it
      newChecked.push(value);
    } else {
      // if in list, remove it
      newChecked.splice(currentIndex, 1);
    }
    setOpen(newChecked);
  };

  const devices = (devices) => {
    return devices.map((device) => {
      return (
        <ListItemButton sx={{ pl: 4 }}>
          {/* <ListItemIcon><StarBorder /></ListItemIcon> */}
          <ListItemText>
            <Dialog device={device} />
          </ListItemText>
        </ListItemButton>
      );
    });
  };

  const roomList = data.rooms.map((room) => {
    const roomName = Object.keys(room)[0];
    const isInList = open.indexOf(roomName) !== -1;
    return (
      <>
        <ListItemButton onClick={handleClick(roomName)} key={roomName}>
          {/* <ListItemIcon><InboxIcon /></ListItemIcon> */}
          <ListItemText primary={roomName} />
          {isInList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isInList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {devices(room[roomName].devices)}
          </List>
        </Collapse>
      </>
    );
  });

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Rooms with smart devices.
        </ListSubheader>
      }
    >
      {roomList}
    </List>
  );
}
