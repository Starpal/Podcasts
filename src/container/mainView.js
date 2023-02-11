import React, { useState, useEffect } from "react";
import { getPodcasts } from "../utils/api";
import PodcastCard from "../components/podcastCard";
import "./mainView.scss";

const MainView = () => {

	const [podcastList, setPodcastList] = useState([]);

	useEffect(() => {
		getPodcasts()
			.then((res) => setPodcastList(res.data.feed.entry))
	}, [])
	
	console.log('podcastList', podcastList)
	return(
		<div>

			{podcastList.length} {/* Filter dei podcast */}
			
			<div className="podcastList_container">
				{podcastList.map((podcast, index) => {
					return (
						<div className="podcastCard" key={index}>
							<PodcastCard
								image={podcast["im:image"][1].label}
								name={podcast["im:name"].label}
								author={podcast["im:artist"].label} />
						</div>
					)
				})}
			</div>

		</div>
	)
};

export default MainView;

