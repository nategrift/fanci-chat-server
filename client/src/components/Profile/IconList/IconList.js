import React from 'react';

import classes from './IconList.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconList(props) {

    const iconNames = ['user-circle', 'user-secret', 'user-astronaut', 'user-graduate', 'user-ninja', 'user-tie', 'angry', 'frown', 'meh','poo']

    const icons = iconNames.map((iconName) => {
        return (
            <button onClick={props.click} key={iconName} id={iconName} className={`${props.icon === iconName ? classes.active : null} ${classes.Icon} button`}><FontAwesomeIcon icon={iconName} /></button>
        )
    })


    return (
        <React.Fragment>
            {icons}
        </React.Fragment>
    );
}

export default IconList;
