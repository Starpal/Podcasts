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
	const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}`)}`
	try {
		const response = await axios.get(url, { 'Access-Control-Allow-Origin': 'http://localhost:8080' });
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
	try {
		const response = await axios.get(url)
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