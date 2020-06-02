const drumPads = [
  {
    keyCode: [81, 113],
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: [87, 119],
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: [69, 101],
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: [65, 97],
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: [83, 115],
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: [68, 100],
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: [90, 122],
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: [88, 120],
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: [67, 99],
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const themeLight = {
  backgroundColor: "#ffffff",
  color: "#000000",
  transition: "all 0.4s"
};

const themeDark = {
  backgroundColor: "#545353",
  color: "#ffffff",
  transition: "all 0.4s"
};

class Display extends React.Component {
  render() {
    return (
      <div id="title">
      <h2 id="display">{this.props.display}</h2>
      <hr style={{width: '90%'}}/>
    </div>
  );
  }
}

class Interface extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
      <div id="interface">
      <h2 style={styles}>Interface</h2>
      <hr />

      {/* Dark Mode */}
      <div id="darkmode">
      <p>Dark Mode</p>
    <label className="switch">
      <input onClick={this.props.onSwitch} type="checkbox" />
      <span className="slider round"></span>
      </label>
      </div>

    {/* Volume Slider */}
  <hr />

    <div id="volume-slider">
      <p>Volume Slider</p>
    <input
    onChange={this.props.onVolume}
    type="range"
    min="0"
    max="100"
    defaultValue="100"
    className="sliderVolume"
    id="volume"
      />
      </div>
      </div>
  );
  }
}

class Pads extends React.Component {
  render() {
    return (
      <div id="pads">
      {this.props.drumPads.map(d => {
          const key = d.keyTrigger;
          const keyLower = key.toLowerCase();
          return (
            <div
          onClick={() => this.props.onHit(key)}
          key={key}
          className="drum-pad"
          id={"audio-" + keyLower}
            >
            <audio className="clip" id={key} src={d.url}></audio>
            <p>{key}</p>
            </div>
        );
        })}
      </div>
  );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumPads: drumPads,
      styles: themeLight,
      display: "Drum Machine"
    };
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = key => {
    const keyPad = this.state.drumPads.filter(pad =>
      pad.keyCode.includes(key.charCode)
    )[0];
    this.setState({
      display: keyPad.id
    })
    console.log(keyPad);
    if (keyPad !== undefined) {
      const button = document.getElementById(keyPad.keyTrigger);
      button.currentTime = 0;
      button.play();
    }
  };

  handleSwitch = () => {
    if (this.state.styles === themeLight) {
      this.setState({
        styles: themeDark
      });
      document.getElementById("root").style.background =
        "radial-gradient(#4a4848, #969291)";
      document.getElementById("copyright").style.color = "white";
      this.setState({
        display: "Dark Mode: ON"
      });
    } else {
      this.setState({
        styles: themeLight
      });
      document.getElementById("root").style.background =
        "radial-gradient(white, lightblue)";
      this.setState({
        display: "Dark Mode: OFF"
      });
      document.getElementById("copyright").style.color = "black";
    }
  };

  handleHit = key => {
    const button = document.getElementById(key);
    button.currentTime = 0;
    button.play();
    const desc = this.state.drumPads.filter(pad => pad.keyTrigger === key)[0]
      .id;
    this.setState({
      display: desc
    });
  };

  handleVolume = () => {
    const newVolume = document.getElementById("volume").value;
    document
      .querySelectorAll("audio")
      .forEach(elem => (elem.volume = newVolume / 100));
    this.setState({
      display: "Volume: " + newVolume
    });
  };

  render() {
    return (
      <React.Fragment>
      <div id="drum-machine" style={this.state.styles}>
      <Display display={this.state.display} />
    <Pads drumPads={this.state.drumPads} onHit={this.handleHit} />
    <Interface
    styles={this.state.styles}
    onSwitch={this.handleSwitch}
    onVolume={this.handleVolume}
    />
    </div>
    <br />
    <div id="copyright">
      <p>Created by Hal S.</p>
    </div>
    </React.Fragment>
  );
  }
}

ReactDOM.render(
<App />,
  document.getElementById("root")
);