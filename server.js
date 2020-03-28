const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

// get all items
app.get('/api/v1/items', (req, res) => {
  res.json({ hello: "world "});
});

// Post an item
app.get('/api/v1/items', (req, res) => {
  res.json({ hello: "world "});
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`listening on ${port}`);
