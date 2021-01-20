import React from "react";
import { Link } from "react-router-dom";

import classes from "./HomeInfo.module.css";
import "../../../assets/styles/subButton.css";

import homeGraphic from "../../../assets/images/home-graphic.png";

function Home() {
    return (
        <div className={classes.HomeInfo}>
            <h3>Welcome to</h3>
            <h1>Fanci Chat</h1>
            <img src={homeGraphic} alt="Send" draggable={false} />
            <p>
                A messaging platform that doesn’t store any messages. Securely
                chat with your friends
            </p>
            <Link to={"/rooms"}>Start Messaging</Link>

            <Link to={"home/about"} className="subButton">About Us</Link>
        </div>
    );
}

export default Home;
