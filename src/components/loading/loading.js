import React from 'react';
import "./loading.scss";

const loading = () => {

	const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo3krPYQSLkYB-xIawN2i2r0pMppJf-lveA&usqp=CAU";
	return (
		<span className="loading_image">
			<img src={url} alt="loading" width="35" height="35" />
		</span>
	);
};

export default loading;