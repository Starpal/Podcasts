import React from "react";
import "./podcastCard.scss";

const PodcastCard = ({image, name, author}) => {
	return (
		<div>
			<div className="image_container">
				<img className="image" src={image} alt="podcast_image"/>
				<h4>{name}</h4>
				<p className="author">Author: {author}</p>
			</div>
		</div>
	);
};

export default PodcastCard;

