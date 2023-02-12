import axios from "axios";

export const getPodcasts = async () => {
	try {
		const response = await axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
		return response;

	} catch (error) {
		if (error.response) {
			console.log("response.data", error.response.data);
			console.log("response.status", error.response.status);
			console.log("response.headers", error.response.headers);
		} else if (error.request) {
			console.log("e.request", error.request);
		} else {
			console.log('There has been a problem wile getting podcasts list: ' + error.message);
		}
		throw error;
	}
}

export const getPodcast = async (id) => {
	try {
		const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}`)}`);
		return response;

	} catch (error) {
		if (error.response) {
			console.log("response.data", error.response.data);
			console.log("response.status", error.response.status);
			console.log("response.headers", error.response.headers);
		} else if (error.request) {
			console.log("e.request", error.request);
		} else {
			console.log('There has been a problem wile getting podcasts list: ' + error.message);
		}
		throw error;
	}
}

export const fetchStatusUrl = async (url) => {
	//console.log('entra', url)
	try {
		const response = await axios.get(url)
		//console.log('response', response)
		return response;

	} catch (error) {
		if (error.response) {
			console.log("response.data", error.response.data);
			console.log("response.status", error.response.status);
			console.log("response.headers", error.response.headers);
		} else if (error.request) {
			console.log("e.request", error.request);
		} else {
			console.log('There has been a problem wile getting podcast episode: ' + error.message);
		}
		throw error;
	}
}