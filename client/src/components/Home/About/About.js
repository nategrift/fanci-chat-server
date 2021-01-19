import React from 'react';
import { Link } from 'react-router-dom'

import classes from './About.module.css'
import nateProfile from "../../../assets/images/nate-profile.png";

import "../../../assets/styles/subButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function About() {

    return (
        <div className={classes.About}>
            <div className={classes.section}>
                <div className={classes.info}>
                    <h2>Our Platform</h2>
                    <p>A messaging platform that doesn’t store any messages.  Securely chat with your friends using our platform. </p>
                    <p>Join Public rooms where you can meet new people or talk privately with a few friends in our private rooms.  Private rooms are created with a key and an ID. To join a private room you will need to get the key from someone in a private message.</p>
                    <p>Our site uses cookies to store you name so when you come back your name will be the same as you left it.  Your name will be temporally stored on the Server until you disconnect.  We store your name to allow other users to view who is currently online.   </p>
                </div>
                <div className={classes.info}>
                    <h2>How it was Created</h2>
                    <p>Fanci chat a live chat application. This app is a chat platform that does not store any messages or personal data. Fanci chat is a single page chat application created with React, Node.js, Express, and Socket.io. This project was created as a passion project to grow my interest in web applications and single page applications.</p>
                    <p>More information regarding the tools used are as follows. React is used for the front-end framework. I also used Redux to handle my state within React. React Routing was also added to provide a more multi-page feel with the benefits of a single page application. I created a server using node.js that is connected to the front-end using socket.io.  In addition to this I used Redux to increase flexibility and easier use of my state across my application.</p>
                    <p>Majority of icons came from Font Awesome. Thank you to them for the amazing icons.  <a href="https://fontawesome.com/" target="_blank">Font Awesome Website</a></p>
                </div>

            </div>
            <div className={classes.section}>
                <img src ={nateProfile} alt="Send" draggable={false}/>
                <h1>Nate Grift</h1>
                <div className={classes.links}>
                    <a href='https://github.com/nategrift/'><FontAwesomeIcon icon={["fab", "github"]} /></a>
                    <a href='https://www.instagram.com/nategrift/'><FontAwesomeIcon icon={["fab", "instagram"]} /></a>
                    <a href='https://www.nategrift.com/'><FontAwesomeIcon icon={["fa", "globe-americas"]} /></a>
                </div>
                <p>Hello, I created Fanci Chat to test my skills with web development.  The entire website was designed, coded, and created by me.  I created this website as a messaging application that wouldn’t save any messages to any databases.  Everything you send is passed through server but we don’t collect any information about your messages.  We only keep track of accounts for displaying users.  Thank you so much for checking out this chat program. </p>

            </div>
            
            <Link to={"/home"} className="subButton">Home</Link>
        </div>
    );
}

export default About;
