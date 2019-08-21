const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api';

app.use(express.static('public'));

app.get('/weather/seattle', (req, res) => {
  getWeather(`/location/2490383/`)
    .then(json => {

      // simulate latency
      // setTimeout(() => {
      //   res.send(json);
      // }, 3000);

      res.send(json);
    });
});

app.get('/weather/sanfran', (req, res) => {
  getWeather('/location/2487956/')
    .then(json => {
      res.send(json);
    });
});

function getWeather(path) {
  return fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log('response status: ', response.status);
    return response.json();
  })
  .catch(err => {
    console.error(err);
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
