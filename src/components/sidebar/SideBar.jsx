import React from "react";
import css from "./SideBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase/firebase";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GroupIcon from '@mui/icons-material/Group';

const links = [
  {
    path: "/",
    title: "Clothes",
    Icon: CheckroomIcon,
  },
  {
    path: '/users',
    title: "Users",
    Icon: GroupIcon
  }
];

function SideBar() {
  const location = useLocation();
  const onLogout = () => {
    logout()
  }
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>Alog Store</div>
      <List>
        {links.map(({ path, title, Icon }) => (
          <ListItem
            key={path}
            selected={path === location.pathname}
            classes={{ selected: css.selected }}
            disablePadding
            component={Link}
            to={path}
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon style={path === location.pathname ? { color: '#fff' } : {}} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
        <br />
        <br />
        <ListItem disablePadding onClick={onLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Выйти"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
