require('./style.css');

const ReactDom = require('react-dom');
const React = require('react');
const Component = React.Component;
// getting the app div that houses html elements created in js

const app = document.getElementById('app');

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


class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      object: props.object
    }
  }

  render() {
    return (
      <ul>
        {Object.keys(this.state.object).map((prop, i) => {
          return (
            <li key={i}>{prop}: {this.state.object[prop]}</li>
          );
        })}
      </ul>
    )
  }
}

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      path: props.path,
      location: '',
      isLoading: true
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    Fetch.get(this.state.path)
      .then(results => {
        console.log(results);
        this.setState({
          weather: results.consolidated_weather[results.consolidated_weather.length - 1],
          location: results.title,
          isLoading: false
        });
      });
  }
  render() {
    let style = {
      border: '1px solid #000'
    };
    return (
      <div>
        {this.state.isLoading ? '' :
          <div style={style}>
            <h1>{this.state.location}</h1>

            <PropertyList
              object={this.state.weather}
            />
          </div>
        }
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1>
          HI
        </h1>
        <Location path={'/weather/seattle'} />
        <Location path={'/weather/sanfran'} />
      </div>
    );
  }
}

ReactDom.render(<App/>, app)
