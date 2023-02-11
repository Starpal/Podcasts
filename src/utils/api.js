import axios from "axios";

export const getPodcasts = async () => {
    const response = await axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
    return response;
}