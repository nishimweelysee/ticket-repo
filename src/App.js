import React, { Component } from "react";
import Routers from './Routes/Routers'
import { BrowserRouter as Router } from 'react-router-dom'

import { createBrowserHistory } from "history";

const history = createBrowserHistory();
import store from './redux/store';
import { Provider } from "react-redux";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Routers />
                </Router>
            </Provider>
        )
    }
}
export default App;
