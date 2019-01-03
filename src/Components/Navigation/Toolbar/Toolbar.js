import React from "react";
import classes from "./Toolbar.css";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggler clicked={props.drawerTogglerClicked}/>
    <div className={classes.Logo}><Logo /></div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
