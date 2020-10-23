import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import classes from './StatusMessage.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusMessage = (props) => {

    let colorClass = null;
    switch (props.msg.status) {
        case "ERROR":
            colorClass = classes.error
            break;
        case "SUCCESS":
            colorClass = classes.success
            break;
        default:
            colorClass = classes.update
    }
    
    useEffect(() => {

        let contentCancelTransition = setTimeout(function(){ 
            props.removeStatusMessage(props.msg)
         }, 4000);

        return () => {
            clearInterval(contentCancelTransition);
        }
    }, [])

    function removeMessage() {
        props.removeStatusMessage(props.msg)
    }



    return (
        <div onClick={removeMessage} className={`${classes.StatusMessage} ${colorClass}`}>
            <FontAwesomeIcon icon={props.msg.icon}/>
            <div>
                <p>{props.msg.title}</p>
                <p>{props.msg.desc}</p>
            </div>
        </div>
    )
}

const mapDispachToProps = (dispatch) => {
    return {
        removeStatusMessage: (msg) => dispatch({ type: "REMOVE_STATE_MESSAGE", statusMessage: msg}),
        
    };
};

export default connect(null, mapDispachToProps)(StatusMessage);