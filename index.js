const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
  // Return them as json
  res.send('API placeholder');
});

app.post('/api/events', async (req, res) => {
  console.log(req.body);
  let { categories, number } = req.body;
  try {
    let categoriesQuery = '(categories.href!="/public/.bedework/categories/_Ongoing")'
    if(categories && categories.length) {
      categoriesQuery = categories.map((category) => `(vpath="/public/Aliases/Event Category/${category}")`);
      categoriesQuery = `(${categoriesQuery.join(' or ')})`;
    }

    let response = await axios.get(`http://calendar.yale.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(${categoriesQuery})&skinName=list-json&count=${number}`);
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
