import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/main.css";
import "./styles/develop.css";
import 'react-slideshow-image/dist/styles.css'


import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';


import axiosConfig from './config/axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

import loadAuthStatus from './middleware/loadAuthStatus';

library.add(fas)
library.add(fab);
library.add(far)

axiosConfig();
loadAuthStatus().then(() => {
  ReactDOM.render(<App />, document.querySelector("#root"));
});