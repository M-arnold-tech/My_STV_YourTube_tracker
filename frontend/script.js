async function searchCourses() {
  const query = document.getElementById('searchInput').value;

  try {
    const res = await fetch(`http://localhost:8080/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.forEach(video => {
      const videoDiv = document.createElement('div');
      videoDiv.innerHTML = `
        <h3>${video.title}</h3>
        <img src="${video.thumbnail}" alt="Thumbnail">
        <p>${video.description}</p>
        <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">Watch</a>
      `;
      resultsDiv.appendChild(videoDiv);
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    document.getElementById('results').innerText = "Failed to fetch results: " + err.message;
  }
}