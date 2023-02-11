import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import MainView from "./container/mainView";

const App = () => {
	return (
		<BrowserRouter>
			{/* Indicador de Loading que sparisce una volta caricati i risultati */}
			{/* Divider */}
			<NavLink to="/" >
				Podcaster
			</NavLink>
			<Routes>
				<Route path="/" element={<MainView />} />
				{/* <Route path="/podcast/:id" component={PodcastDetail} /> */}
			</Routes>
		</BrowserRouter>
	)
};

export default App;