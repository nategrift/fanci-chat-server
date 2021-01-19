import React from 'react';
import { Route, Switch } from "react-router-dom";


import About from './About/About'
import HomeInfo from './HomeInfo/HomeInfo'

function Home(props) {

    return (
        <React.Fragment>
            <Switch>
                <Route path={props.match.url + "/about"} exact component={About} />
                <Route path="/" component={HomeInfo} />
            </Switch>
        </React.Fragment>
    );
}

export default Home;
