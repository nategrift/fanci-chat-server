import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNav.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainNav(props) {

    function themeToggleAnimation(event) {
        let icon = event.currentTarget;
        if (icon.classList.contains(classes.themeToggleAnimation)) {
            icon.classList.remove(classes.themeToggleAnimation);
        } else {
            icon.classList.add(classes.themeToggleAnimation);
        }
        
        props.toggleTheme();

    }
        return (
            <div className={classes.Nav}>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.selected} to="/home" id="home" className={classes.Link}>
                            <FontAwesomeIcon icon={["fa", "home"]} />
                        </NavLink> 
                    </li>
                    <li>
                        <NavLink
                        activeClassName={classes.selected}
                            to="/profile"
                            id="profile"
                            className={classes.Link}
                        >
                            <FontAwesomeIcon icon={["fa", "user-cog"]} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName={classes.selected}
                            to="/rooms"
                            id="rooms"
                            className={classes.Link}
                        >
                            <FontAwesomeIcon icon={["fa", "comments"]} />
                        </NavLink>
                    </li>
                </ul>
                <div className={classes.themeToggle} title="Toggles between Light and Dark mode" onClick={themeToggleAnimation}>   
                    <FontAwesomeIcon icon={["fa", "moon"]} />
                </div>
            </div>
        );
    }

export default MainNav;
