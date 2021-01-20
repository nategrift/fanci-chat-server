import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducer from './store/reducer'
import { Provider } from 'react-redux'

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHome,
    faComments,
    faUserCog,
    faMoon,
    faUsers,
    faLock,
    faShieldAlt,
    faIcons,
    faGamepad,
    faBook,
    faSignOutAlt,
    faGlobeAmericas,
    faUserCircle,
    faUserSecret,
    faUserAstronaut,
    faUserGraduate,
    faUserNinja,
    faAngry,
    faUserTie,
    faMeh,
    faFrown,
    faPoo,
    faSync,
    faDoorOpen,
    faCheck,
    faBell,
    faTimes,
    faKey,
    faCoffee,
    faCouch,
    faCode,
    faChessRook,
    faStar,
    faBiohazard,
    faDoorClosed,
    faSearch,
    faCopy,
    faBars
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

library.add(
    faHome,
    faComments,
    faUserCog,
    faMoon,
    faUsers,
    faLock,
    faShieldAlt,
    faIcons,
    faGamepad,
    faBook,
    faSignOutAlt,
    faGithub,
    faInstagram,
    faGlobeAmericas,
    faUserCircle,
    faUserSecret,
    faUserAstronaut,
    faUserGraduate,
    faUserNinja,
    faAngry,
    faUserTie,
    faMeh,
    faPoo,
    faFrown,
    faSync,
    faDoorOpen,
    faCheck,
    faBell,
    faTimes,
    faKey,
    faCoffee,
    faCouch,
    faCode,
    faChessRook,
    faStar,
    faBiohazard,
    faDoorClosed,
    faSearch,
    faCopy,
    faBars
);

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
