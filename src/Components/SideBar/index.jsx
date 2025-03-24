import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Box,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Description,
  Group,
  Storefront,
  People,
  Settings,
  AccountCircle,
  Brightness4,
  Add,
} from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import CreateModal from "../Modal/index";
import { useData } from "../GlobalProvider/GlobalProvider";
import { Modal, Button, Typography } from "@mui/material";
const Sidebar = () => {
  const [selected, setSelected] = useState("Homepage");

  const { darkMode, setDarkMode, setShow, show } = useData();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Box
        sx={{
          width: 250,
          height: "100vh",
          bgcolor: darkMode ? "grey.900" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          padding: 2,
          transition: "background 0.3s ease",
        }}
      >
        <List>
          {[
            { name: "Homepage", icon: <Home /> },
            { name: "Pages", icon: <Description /> },
            { name: "Groups", icon: <Group /> },
            { name: "Marketplace", icon: <Storefront /> },
            { name: "Friends", icon: <People /> },
            { name: "Settings", icon: <Settings /> },
            { name: "Profile", icon: <AccountCircle /> },
          ].map((item) => (
            <ListItemButton
              key={item.name}
              selected={selected === item.name}
              onClick={() => setSelected(item.name)}
              sx={{
                bgcolor: selected === item.name ? "primary.light" : "inherit",
                "&:hover": { bgcolor: "primary.main", color: "#fff" },
                borderRadius: 2,
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={() => setDarkMode(!darkMode)}>
            <ListItemIcon>
              <Brightness4 />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch checked={darkMode} />
          </ListItemButton>
        </List>

        <Tooltip title="Create">
          <Fab
            color="primary"
            aria-label="create"
            onClick={handleShow}
            sx={{
              position: "fixed",
              bottom: 20,
              left: 20,
              zIndex: 1000,
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
      </Box>
      {show && <CreateModal handleClose={handleClose}/>}
    </>
  );
};

export default Sidebar;
