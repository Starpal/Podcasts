import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./episodeDetails.scss";
import parse from 'html-react-parser';

const episodeDetails = () => {

	const location = useLocation();
	const { image, name, author, podcastDescription, title, description, audio } = location.state;

	const renderDescription = (desc) => {
		let episodeDescription;
		if (/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(desc)) {
			console.log('containsHTML')
			const parsedDesc = parse(description[0]);

			if (parsedDesc.includes(" >")) {
				parsedDesc.splice(-1, 1);
			}
			episodeDescription = parsedDesc;
		} else {
			console.log('no')
			episodeDescription = description
		}
		return episodeDescription;
	}

	return (
		<>
			<div className="episode_container">
				<div className="podcast_sidebar">
					<Link to={".."} style={{textDecoration: 'none'}}>
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
							<p className="podcastDescription"><i>{podcastDescription}</i></p>
						</div>
					</div>
				</div>

				<div className="episode_detail">
					<h2>{title}</h2>
					<div className="episodeDescription"><i>{renderDescription(description)}</i></div>

					<audio
						controls
						src={audio}>
					</audio>
				</div>
			</div>
		</>
	);
};

export default episodeDetails;