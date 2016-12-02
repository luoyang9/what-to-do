import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from "./store";
import routes from "./routes";

const app = document.getElementById('app');
injectTapEventPlugin(); //needed for material ui touch events http://stackoverflow.com/a/34015469/988941

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
			<Router history={hashHistory}>
				{routes}
			</Router>
		</Provider>
	</MuiThemeProvider>,
app);
