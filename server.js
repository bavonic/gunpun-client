const express = require('express');
const path = require('path');
const app = express();
const ENV = process.env.ENV || 'develop';
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Send env to client
app.use(function (req, res, next) {
  res.cookie('gunpun_env', ENV);
  next();
})

// Handles any requests that don't match the ones above
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(+port, () => console.log(`Server started port: ${port}`));