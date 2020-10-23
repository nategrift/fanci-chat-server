import React, { useState } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';

import classes from './JoiningRoom.module.css'

import '../../assets/styles/button.css'

const JoiningRoom = (props) => {

    const [password, setPassword] = useState("");

    function setPasswordHandler(event) {
        let newPassword = event.currentTarget.value
        setPassword(newPassword.substr(0, 18))
    }

    return (
        <Backdrop click={props.joinRoomHandler}>
            <form className={classes.JoiningRoom}>
                <div>
                    <h2>Joining Private Room</h2>
                    <h3>De Boss Room</h3>
                </div>
                <div>
                    <label>Room Password:</label>
                    <input type="text" placeholder="Type password here..." value={password} onChange={setPasswordHandler}></input>
                </div>
                <div>
                    <button className='button cancelButton' onClick={props.joinRoomHandler}>Cancel</button>
                    <button className='button' onClick={(event) => props.click(event, password)} type="submit">Join</button>
                </div>
            </form>
        </Backdrop>
    )


};


export default JoiningRoom;