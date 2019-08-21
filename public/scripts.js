
// getting the app div that houses html elements created in js

const app = document.getElementById('app');

const weatherData = document.createElement('div');

weatherData.setAttribute('id', 'weather-data');

app.appendChild(weatherData);

function FetchHttp() {
}

FetchHttp.prototype.get = function(path) {

  return fetch(path)
    .then(response => {
      console.log(`status: ${response.status}`)
      return response.json();
    });
};

const Fetch = new FetchHttp();
const fetchWeatherPromises = [Fetch.get('/weather/seattle'), Fetch.get('/weather/sanfran')];
Promise.all(fetchWeatherPromises)
  .then(results => {
    results.forEach(weatherResult => {
      processWeather(weatherResult);
    });
  });

function processWeather(weather) {
  let latestWeather = weather.consolidated_weather[weather.consolidated_weather.length - 1];

  weatherData.appendChild(createTextEl('h1', weather.title));
  weatherData.appendChild(createWeatherList(latestWeather));
}

function createWeatherList(latestWeather) {
  let ul = document.createElement('ul');
  let props = ['the_temp','visibility', 'weather_state_name', 'wind_direction'];
  for (let i = 0; i < props.length; i++) {
    let textContent = `${props[i]}: ${latestWeather[props[i]]}` ;
    let li = createTextEl('li', textContent);
    ul.appendChild(li);
  }
  return ul;
}

function createTextEl(elName, text) {
  let el = document.createElement(elName);
  el.appendChild(document.createTextNode(text))
  return el;
}
