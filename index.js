const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
  // Return them as json
  res.send('API placeholder');
});

app.get('/api/events', async (req, res) => {
  try {
    let response = await axios.get('http://calendar.yale.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(((vpath=%22/public/Aliases/Event%20Format/Classes,%20Demonstrations%20and%20Workshops%22)))%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&count=200');
    res.json(response.data);
  } catch (e) {
    res.send(e);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}`);
