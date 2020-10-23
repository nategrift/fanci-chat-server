import React, { Component } from 'react';

import MainNav from './MainNav/MainNav'



class Layout extends Component {

    render() {
        return (
            <React.Fragment>
                <MainNav click={this.props.click} toggleTheme={this.props.toggleTheme}/>
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    };
};

export default Layout;