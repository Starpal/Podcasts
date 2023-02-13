import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PodcastCard from "../../components/podcastCard/podcastCard";
import "./mainView.scss";
import { useLoading } from "../../LoadingContext";
import LoadingComponent from "../../components/loading/loading";

const MainView = () => {

	const localData = localStorage.getItem("Podcasts");
	const timestamp = localStorage.getItem("timestamp");

	const [podcastList, setPodcastList] = useState(() => {
		if (localData !== null) return JSON.parse(localData);
		return [];
	});
	const [search, setSearch] = useState("");
	const { loading, setLoading } = useLoading();

	useEffect(() => {
		if (localData && timestamp) {
			const elapsedTime = Date.now() - timestamp;

			if (elapsedTime < 24 * 60 * 60 * 1000) {
				setPodcastList(JSON.parse(localData));
				setLoading(true);
				return;
			} else {
				localStorage.removeItem("Podcasts");
				localStorage.removeItem("timestamp");
			}
		}
	}, [])

	const handleSearch = (event) => {
		const value = event.target.value;
		setSearch(value);
	};

	const searchValue = search.toLowerCase();

	return (
		<div>
			{!loading && <LoadingComponent />}
			<div className="search_section">
				<span className="podcast_length">{podcastList.length}</span>
				<input type="text" onChange={handleSearch} value={search} placeholder="Filter podcasts..." />
			</div>
			<div className="podcastList_container">
				{podcastList.map((podcast, index) => {
					const image = podcast["im:image"][2].label
					const name = podcast["im:name"].label;
					const author = podcast["im:artist"].label
					return (
						<div key={index}>
							<Link
								to={`/podcast/${podcast.id.attributes["im:id"]}`}
								className="podcast_link"
								state={{
									image: image,
									name: name,
									author: author,
									description: podcast.summary.label,
								}}>
								{(name.toLowerCase().includes(searchValue) || author.toLowerCase().includes(searchValue)) &&
									<PodcastCard
										image={image}
										name={name}
										author={author} />
								}
							</Link>
						</div>
					)
				})}
			</div>

		</div>
	)
};

export default MainView;