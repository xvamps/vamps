import "./App.css";
import s1 from "./img/S1.png";
import s3 from "./img/S3.png";
import s4 from "./img/S4.png";
import s5 from "./img/S5.png";
import s61 from "./img/S61.png";
import s62 from "./img/S62.png";
import image from "./img/vamps.gif";

function App() {
  return (
    <div className="App">
      <div className="section">
        <header className="App-header">
          <img src={s1} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="section section-2">
        <div className="App-content">
          <p className="App-header-text">0/1000 MINTED</p>
          <div className="App-img-center">
            <img src={image} className="App-mouth-img" alt="logo" />
          </div>
          <button className="App-gradient-button mobile-button">
            Blooding soon...
          </button>
          <div className="App-title">
            CONTRACT:
            <p>hdjbnhjbdvhjsdbvhjbfewbui3hy7823fh8712ydyhhdfuiefh</p>
          </div>
        </div>
      </div>
      <div className="section">
        <header className="App-header">
          <img src={s3} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="section">
        <header className="App-header">
          <img src={s4} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="section">
        <header className="App-header">
          <img src={s5} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="section-last">
        <div>
          <div>
            <img src={s61} className="App-max-width-smaller" alt="logo" />
          </div>
          <div className="App-padding">
            <a
              href="https://t.me/vampspulsechain"
              target="_blank"
              rel="noreferrer"
            >
              <button className="App-gradient-button App-gradient-button-smaller">
                Telegram
              </button>
            </a>
            <a
              href="https://twitter.com/XENstaker"
              target="_blank"
              rel="noreferrer"
            >
              <button className="App-gradient-button App-gradient-button-smaller">
                Twitter
              </button>
            </a>
          </div>
          <div>
            <img src={s62} className="App-max-width" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
