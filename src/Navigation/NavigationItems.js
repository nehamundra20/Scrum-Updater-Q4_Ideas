import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import "primeflex/primeflex.css";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuth ? (
        <NavigationItem link="/login" setIsAuth={props.setIsAuth}>
          Logout
        </NavigationItem>
      ) : (
        <NavigationItem link="/scrum">Scrum Updates</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
