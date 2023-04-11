import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import "./podcastDetails.scss";
import { getPodcast } from "../../utils/api";
import { findEpisodeItem } from '../../utils/util';
import axios from "axios";
import XMLParser from "react-xml-parser";
import { Buffer } from "buffer";
import { useLoading } from "../../LoadingContext";
import LoadingComponent from "../../components/loading/loading";

const podcastDetails = () => {
	const { id } = useParams();
	const location = useLocation();
	const { image, name, author, description } = location.state;
	const { loading, setLoading } = useLoading();

	let localData = localStorage.getItem(`${name}`);
	const timestamp = localStorage.getItem(`timestamp-${name}`);


	const [podcastEpisodes, setPodcastEpisodes] = useState(() => {
		if (localData !== null && timestamp !== null) return JSON.parse(localData);
		return [];
	});

	useEffect(() => {
		getPodcast(id)
			.then((res) => {
				const val = JSON.parse(res.data.contents);
				const valRes = val.results;
				return valRes;
			})
			.then( (data) => {
				const response = axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(data[0].feedUrl)}`)
				return response;
			})
			.then((response) => {
				const contents = response.data.contents;
				let episodes;

				if (!contents.includes("base64")) {
					const xml = new XMLParser().parseFromString(contents);
					episodes = xml.children[0].children.filter((child) => child.name === "item");
				} else {
					const rssResponse = contents.replace("data:application/rss+xml; charset=utf-8;base64,", "");
					const jsonString = Buffer.from(rssResponse, 'base64').toString();
					let xml = new XMLParser().parseFromString(jsonString);
					let arr = [];
					xml && findEpisodeItem(xml, arr);
					episodes = arr && arr;
				}
				setLoading(false);
				localStorage.setItem(`${name}`, JSON.stringify(episodes));
				localStorage.setItem(`timestamp-${name}`, Date.now());
			})
	}), [];

	useEffect(() => {
		if (localData && timestamp) {
			const elapsedTime = Date.now() - timestamp;

			if (elapsedTime < 24 * 60 * 60 * 1000) {
				setPodcastEpisodes(JSON.parse(localData));
				setLoading(true);
				return;
			} else {
				localStorage.removeItem(`${name}`);
				localStorage.removeItem(`timestamp-${name}`);
			}
		}
	}, [localData]);

	const convertTime = (totalSeconds) => {
		const totalMinutes = Math.floor(totalSeconds / 60);

		const seconds = totalSeconds % 60;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		if (!totalSeconds.includes(":")) {
			return `${hours}:${minutes}:${seconds}`;
		} else {
			return totalSeconds;
		}
	}

	return (
		<>
			<div className="podcast_container">
				{loading && <LoadingComponent />}
				<div className="podcast_sidebar">
					<Link to={".."} style={{ textDecoration: 'none' }}>
						<div className="image_container">
							<img className="image" src={image} alt="podcast_image" />
						</div>
						<div className="podcast_info">
							<p className="podcastName bold">{name}</p>
							<p className="podcastby"><i>by {author}</i></p>
						</div>
					</Link>
					<div className="podcast_info">
						<div>
							<p className="podcastDescription bold">Description</p>
							<p className="podcastDescription"><i>{description}</i></p>
						</div>
					</div>
				</div>
				<div className="podcast_episodes">
					<div className="episodes_number">
						<h2>Episodes: {podcastEpisodes && podcastEpisodes.length}</h2>
					</div>
					<br />
					<div className="episodes_table">
						<div style={{ display: 'flex' }}>
							<p className="episodeTitle thead"> Title </p>
							<p className="episodeDate thead"> Date </p>
							<p className="thead"> Duration </p>
						</div>
						<div className="divider" />
						<div className="episodesRows">
							{podcastEpisodes && podcastEpisodes.map((episode) => {
								const audio = [];
								const episodeDescription = [];
								return (
									<div className="episodesTable_row" >
										{episode.children.map((episodeChild, index) => {
											episodeChild.name === "enclosure" && audio.push(episodeChild.attributes.url)
											episodeChild.name === "content:encoded" && episodeDescription.push(episodeChild.value)
											return (
												<div key={`${id}-${index}`}>
													{episodeChild.name === "title" ?
														(<Link
															to={`/podcast/${id}/episode/${index}`}
															className="episode_link"
															state={{
																image: image,
																name: name,
																author: author,
																podcastDescription: description,
																title: episodeChild.value,
																description: episodeDescription,
																audio: audio
															}}>
															<div>
																<p className="episodeTitle">{episodeChild.value}</p>
															</div>
														</Link>)
														: episodeChild.name === "pubDate" ?
															(<div>
																<p className="episodeDate">{new Date(episodeChild.value).toLocaleDateString()}</p>
															</div>)
															: episodeChild.name === "itunes:duration" ?
																(<div>
																	<p>{convertTime(episodeChild.value)}</p>
																</div>)
																: null
													}
											</div>)
										})}
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default podcastDetails;