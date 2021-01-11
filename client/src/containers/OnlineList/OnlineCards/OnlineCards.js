import React from 'react';
import { connect } from 'react-redux'
import OnlineCard from './OnlineCard/OnlineCard'


function OnlineCards(props) {

    const otherUsers = props.users.map((user) => {
 
        let inSameRoom = false;
        if (user.room != null && props.room != null) {
            if (user.room.roomID === props.room.roomID) {
                inSameRoom = true
            }
        }
        
        return (
            <OnlineCard icon={user.icon || 'user-circle'} name={user.name || 'Guest'} inSameRoom={inSameRoom ? 'door-open' : null} key={Math.random()} />
        )
    })
    
    return (
        <React.Fragment>
            {otherUsers}
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        name: state.name,
        icon: state.icon,
        room: state.room,
        users: state.users
    };
}

export default connect(mapStateToProps)(OnlineCards);
