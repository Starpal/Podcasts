import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { getPodcasts } from "./utils/api";
import MainView from "./containers/mainView/mainView";
import PodcastDetails from "./containers/podcastDetails/podcastDetails";
import { LoadingProvider } from "./LoadingContext";

const App = () => {

	useEffect(() => {
		getPodcasts()
			.then((response) => {
				localStorage.setItem("Podcasts", JSON.stringify(response.data.feed.entry));
				localStorage.setItem("timestamp", Date.now());
			})
	}, []);

	return (
		<BrowserRouter>
			<LoadingProvider>
				<NavLink to="/" className="nav-link">
					Podcaster
				</NavLink>
				<div className="divider" />
				<Routes>
					<Route path="/" element={<MainView />} />
					<Route path="/podcast/:id" element={<PodcastDetails />} />
				</Routes>
			</LoadingProvider>
		</BrowserRouter>
	)
};

export default App;