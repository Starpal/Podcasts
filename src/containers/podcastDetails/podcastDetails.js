import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getPodcast, fetchStatusUrl } from "../../utils/api";
import "./podcastDetails.scss";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { useLoading } from "../../LoadingContext";
import LoadingComponent from "../../components/loading/loading";

const podcastDetails = () => {
	const [episodes, setEpisodes] = useState();
	const { loading, setLoading } = useLoading();

	const { id } = useParams();
	const location = useLocation();
	const { podcastId, image, name, author, description } = location.state;

	useEffect(() => {
		getPodcast(id)
			.then((res) => {
				const val = JSON.parse(res.data.contents);
				const valRes = val.results;
				return valRes;
			})
			.then((data) => {
				const response = axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(data[0].feedUrl)}`,
					{ "Access-Control-Allow-Origin": '*' })
				return response;
			})
			.then((response) => {
				const data = response.data;
				if (!response.data.contents.includes("base64")) {
					const xml = new XMLParser().parseFromString(data.contents);
					const xmlChildrenArray = xml.children[0].children;
					const podcastEpisodes = xmlChildrenArray.filter((child) => child.name === "item");
					setEpisodes(podcastEpisodes);
					setLoading(false);
				} else {
					fetchStatusUrl(data.status.url).then((response) => {
						let xml = new XMLParser().parseFromString(response.data);
						const xmlChildrenArray = xml.children;
						const podcastEpisodes = xmlChildrenArray.filter((child) => child.name === "item");
						setEpisodes(podcastEpisodes);
						setLoading(false);
					})
				}
			})
	}, []);

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
						<h2>Episodes: {episodes && episodes.length}</h2>
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
							{episodes && episodes.map((episode, index) => {
								const audio = [];
								const episodeDescription = [];
								return (
									<div className="episodesTable_row" >
										{episode.children.map((episodeChild, id) => {
											episodeChild.name === "media:content" && audio.push(episodeChild.attributes.url)
											episodeChild.name === "content:encoded" && episodeDescription.push(episodeChild.value)
											return (
												episodeChild.name === "title" ?
													<Link
														to={`/podcast/${podcastId}/episode/${id}`}
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
														<div key={id}>
															<p className="episodeTitle">{episodeChild.value}</p>
														</div>
													</Link>
													: episodeChild.name === "pubDate" ?
														<div>
															<p className="episodeDate">{new Date(episodeChild.value).toLocaleDateString()}</p>
														</div>
														: episodeChild.name === "itunes:duration" ?
															<div>
																<p>{convertTime(episodeChild.value)}</p>
															</div>
															: null
											)
										})}
									</div>)
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default podcastDetails;