import logo from "./img/logo.png";
import fire from "./img/fire.png";
import mouth from "./img/mouth.png";
import text from "./img/text2.png";
import schemat from "./img/schemat.png";
import image from "./img/image.png";
import kropla from "./img/kropla.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="section">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p class="App-header-text">0/1000 minted</p>
          <button className="App-gradient-button">Blooding soon...</button>
        </header>
        <div className="App-bottom-page">
          <div class="App-bottom-text">
            <p>Inspired by</p> XEN, SVMPX, JACK LEVIN
          </div>
          <div class="App-bottom-text">
            <p>Powered by</p> PULSECHAIN, RICHARD HEART:
          </div>
        </div>
      </div>
      <div className="section section-2">
        <div className="App-content">
          <div className="App-title">
            <p>FIRST NET COLLECTION FOR XENIANS & PULSICANS</p>
            <div className="App-text-with-icon">
              <span>B</span>
              <img src={fire} className="App-fire-img" alt="logo" />
              <span>RNING</span>
              <span className="App-span-second"> XEN</span>
            </div>
          </div>
          <div class="App-img-center">
            <img src={mouth} className="App-mouth-img" alt="logo" />
          </div>
          <div class="App-img-center-smaller">
            <img src={text} className="App-mouth-img" alt="logo" />
          </div>
        </div>
      </div>
      <div className="section App-page-3">
        <div className="App-content">
          <div class="App-img-center">
            <img src={schemat} className="App-mouth-img" alt="logo" />
          </div>
          <p className="App-title">
            First highlv limited NE Collection for <br /> XEN & PULSECHAIN
            Community <br /> Vamps help both using XEN and PLS <br />
            for mintino bloody unique Avatars
          </p>
        </div>
      </div>
      <div className="section App-page-4">
        <div className="App-content">
          <div class="App-img-center">
            <img src={image} className="App-mouth-img" alt="logo" />
          </div>
          <div>
            <ul>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                <span className="App-red-text">PXEN CRYPTO</span> + PULSECHAIN
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                NFT COLLECTION IN{" "}
                <span className="App-red-text">VAMPIRES'</span> UNIVERSE
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                VAMPIRES, WEREWOLVES, WITCHERS
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                MADE BY XEN OG AND RICHARD HEART SUPPORTER
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                <span className="App-red-text">PIXEL ART</span> WITH RARITY RANK
              </li>
              <li>
                <img src={fire} className="App-mouth-img" alt="kropla" />
                BURNING PXEN !!!
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                <span className="App-red-text">PLS + PXEN</span> FOR MINT
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                MINTERS GET <span className="App-red-text">XN</span> NATIVE
                TOKEN OF XI CHAIN
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                MINTERS MINT/<span className="App-red-text">
                  BUY & BURN
                </span>{" "}
                PXEN
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                BULLISH ASPECT: 3% ROYALTIES FOR MINTERS
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                FIRST PRINCIPLES: FATR MINT. NO TEAM ALLOCATION
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                FAIR DISTRIBUTION: MAX <span className="App-red-text">
                  3
                </span>{" "}
                MINTS PER WALLET
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                NO AI / ALGORYTMS: ALL{" "}
                <span className="App-red-text">1000 NFTS</span> MANUALLY CREATED
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                INCREASING BURNING RATES
              </li>
              <li>
                <img src={kropla} className="App-mouth-img" alt="kropla" />
                <span className="App-red-text">%</span> PROPERTY FOR FUTURE
                UTILITY...
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="section section-5">Section 5</div>
      <div className="section section-6">Section 6</div>
      <div className="section section-7">Section 7</div>
      <div className="section section-8">Section 8</div>
    </div>
  );
}

export default App;
