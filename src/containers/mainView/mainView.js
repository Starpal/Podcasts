import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PodcastCard from "../../components/podcastCard";
import "./mainView.scss";

const MainView = () => {

	const localData = localStorage.getItem("Podcasts");
	const timestamp = localStorage.getItem("timestamp");

	const [podcastList, setPodcastList] = useState(() => {
		if (localData !== null) return JSON.parse(localData);
		return [];
	});

	useEffect(() => {
		if (localData && timestamp) {
			const elapsedTime = Date.now() - timestamp;

			if (elapsedTime < 24 * 60 * 60 * 1000) {
				setPodcastList(JSON.parse(localData));
				return;
			} else {
				localStorage.removeItem("data");
				localStorage.removeItem("timestamp");
			}
		}
	}, [])

	//console.log('podcastList', podcastList)
	return (
		<div>
			{podcastList.length} {/* Filter dei podcast */}
			<div className="podcastList_container">
				{podcastList.map((podcast, index) => {
					return (
						<div key={index}>
							<Link
								to={`/podcast/${podcast.id.attributes["im:id"]}`}
								className="podcast_link"
								state={{
									image: podcast["im:image"][2].label,
									name: podcast["im:name"].label,
									author: podcast["im:artist"].label,
									description: podcast.summary.label
								}}>
								<PodcastCard
									image={podcast["im:image"][2].label}
									name={podcast["im:name"].label}
									author={podcast["im:artist"].label} />
							</Link>
						</div>
					)
				})}
			</div>

		</div>
	)
};

export default MainView;