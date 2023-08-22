import s1 from "./img/S1.png";
import s2 from "./img/S2.png";
import s3 from "./img/S3.png";
import s4 from "./img/S4.png";
import s5 from "./img/S5.png";
import s6 from "./img/S6.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="section">
        <header className="App-header">
          <img src={s1} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="section">
        <header className="App-header">
          <img src={s2} className="App-logo" alt="logo" />
        </header>
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
      <div className="section">
        <header className="App-header">
          <img src={s6} className="App-logo" alt="logo" />
        </header>
      </div>
    </div>
  );
}

export default App;
