import React from 'react';
import { connect } from 'react-redux'

import classes from './StatusMessages.module.css'

import StatusMessage from './StatusMessage/StatusMessage'

const StatusMessages = (props) => {
    
    return (
        <div className={classes.StatusMessages}>
            {props.statusMessages  ? <StatusMessage msg={props.statusMessages } key={Math.random()}/> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        statusMessages: state.statusMessages,
    };
};

export default connect(mapStateToProps)(StatusMessages);