import { Route, IndexRoute } from "react-router";
import React from "react";
import Layout from "./pages/Layout";
import TodosContainer from "./pages/TodosContainer";
import Settings from "./pages/Settings";

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={TodosContainer}></IndexRoute>
		<Route path="/settings" component={Settings}></Route>
	</Route>
);

 export default routes;