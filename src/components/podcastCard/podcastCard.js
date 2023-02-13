import React from "react";
import "./podcastCard.scss";


const PodcastCard = ({ image, name, author }) => {
	
	const podcastName = name.toUpperCase();

	return (
		<div className="podcastCard_container">
			<div className="imageCard_container">
				<img className="imageCard" src={image} alt="podcast_image"/>
			</div>
				<h4>{podcastName}</h4>
				<p className="authorCard">Author: {author}</p>
			</div>

	);
};

export default PodcastCard;

