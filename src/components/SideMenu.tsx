import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Item, items } from "../sideMenuItems";
import { useAuth } from "../context/auth";

const drawerWidth = 240;

const SideMenuItem = ({ to, label, requiredRole }: Item) => {
  const { isAuthorized } = useAuth();
  return (
    <>
      {isAuthorized(requiredRole) && (
        <NavLink to={to}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      )}
    </>
  );
};

const SideMenu = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <nav aria-label="side-menu">
        <List>
          {items.map((item) => (
            <SideMenuItem
              key={item.to}
              to={item.to}
              label={item.label}
              requiredRole={item.requiredRole}
            />
          ))}
        </List>
      </nav>
    </Drawer>
  );
};

export default SideMenu;
