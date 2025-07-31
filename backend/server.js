// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
console.log("YOUTUBE_API_KEY:", process.env.YOUTUBE_API_KEY);
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// GET /api/search?query=python+course
app.get('/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
      }
    });

    const results = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.default.url,
      description: item.snippet.description,
      channel: item.snippet.channelTitle
    }));

    res.json(results);
  } catch (err) {
    console.error("YouTube API error:", err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch from YouTube API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});