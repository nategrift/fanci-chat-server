import React, { useState } from "react";
import { connect } from "react-redux"

import OnlineList from "../../containers/OnlineList/OnlineList";
import IconList from "../../components/IconList/IconList"

import classes from "./Profile.module.css";
import "../../assets/styles/header.css";
import "../../assets/styles/button.css";

function Profile(props) {
    let isVisable;
    let isVisableValue = localStorage.getItem('visable') || true;

        if (isVisableValue === 'true' || isVisableValue === true) {
            isVisable = true
        } else {
            isVisable = false
        }

    const originalName = localStorage.getItem('name') || 'Guest';
    const originalIcon = localStorage.getItem('icon') || 'user-circle';
    const originalVisable = isVisable;


    const [name, setName] = useState(originalName);
    const [icon, setIcon] = useState(originalIcon);
    const [changing, setChanging] = useState(false);


    const [visable, setVisable] = useState(originalVisable);

    function updateName(event) {
        const nameValue = event.currentTarget.value;
        let newName = nameValue.substr(0, 18)
        setName(newName);
        onProfileChange(newName, icon, visable)
    }

    function updateIcon(event) {
        setIcon(event.currentTarget.id);
        onProfileChange(name, event.currentTarget.id, visable)
    }

    function updateVisable(event) {
        let isVisable;
        if (event.currentTarget.id === 'true') {
            isVisable = true
        } else {
            isVisable = false
        }
        setVisable(isVisable)
        onProfileChange(name, icon, isVisable)
    }

    function onProfileChange(newName, newIcon, newVisable) {
        if (newName === props.name && newIcon === props.icon && newVisable === props.visable) {
            setChanging(false)
        } else {
            setChanging(true)
        }
    }

    return (
        <div className={classes.Profile}>
            <div className={classes.editProfile}>
                <div className="header">
                    <h1>Edit Profile</h1>
                </div>
                <section>
                    <h2>Edit name:</h2>
                    <input onChange={updateName} value={name} type='text'/>
                    <p>Our site uses cookies to store you name so when you come back your name will be the same as you left it.  Your name will be temporally stored on the Server until you disconnect.  We store your name to allow other users to view who is currently online.   </p>
                </section>
                <section>
                    <h2>Profile visable to other users:</h2>
                    <div>
                        <button onClick={updateVisable} id='true' className={`${visable ? 'buttonActive' : null} button`}>Visable</button>
                        <button onClick={updateVisable} id='false' className={`${visable ? null : 'buttonActive'} button` }>Hidden</button>
                    </div>
                    <p>If this is turned to Hidden your account name will not be visible in side panel however in the bottom it will display the number of hidden active users.</p>
                </section>
                <section>
                    <h2>Update your Icon:</h2>
                    <div className={classes.Icons}>
                        <IconList click={updateIcon} icon={icon}/>
                    </div>
                </section>
                <section>   
                    {changing ? <button className={`button ${classes.buttonOpacity}`} onClick={() => {props.clicked(name, icon, visable); setChanging(false)}}>Save</button> : null}
                </section>
            </div>
            <OnlineList />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        name: state.name,
        icon: state.icon,
        visable: state.visable,
    };
};

export default connect(mapStateToProps)(Profile);
