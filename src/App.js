import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import Vamps from "./contracts/Vamps.json";
import s1 from "./img/S1.png";
import s3 from "./img/S3.png";
import s4 from "./img/S4.png";
import s5 from "./img/S5.png";
import s61 from "./img/S61.png";
import s62 from "./img/S62.png";
import image from "./img/vamps.gif";

function App() {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [vamps, setVamps] = useState();
  const [pXenToken, setPXenToken] = useState();
  const [mintedAmount, setMintedAmout] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [tokenId, setTokenid] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [drawnImage, setDrawnImage] = useState("");
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      if (provider && vamps) {
        const minted = (await vamps.getCounter()).toNumber();

        const mintedAmount = await vamps.getMintedAmoutByMinter(
          provider.getSigner().getAddress()
        );
        const limitReached = mintedAmount >= 3;
        setMintedAmout(minted);
        setLimitReached(limitReached);
      }
    };
    updateData();
  }, [provider]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const vampsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with your actual contract address
        const vamps = new ethers.Contract(
          vampsAddress,
          Vamps.abi,
          provider.getSigner()
        );
        const pXenTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your actual contract address

        const pXenToken = new ethers.Contract(
          pXenTokenAddress,
          Vamps.abi,
          provider.getSigner()
        );

        setProvider(provider);
        setVamps(vamps);
        setPXenToken(pXenToken);
        setConnected(true);
      } else {
        console.error("Metamask is not installed");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setDrawnImage("");
    setTokenid(0);
    setBonus(0);
    setPopupVisible(false);
  };

  const getBonus = (counter) => {
    let bonus = 0;
    if (counter < 50) {
      bonus = 0.19;
    } else if (counter >= 50 && counter < 106) {
      bonus = 0.18;
    } else if (counter >= 106 && counter < 168) {
      bonus = 0.17;
    } else if (counter >= 168 && counter < 237) {
      bonus = 0.16;
    } else if (counter >= 237 && counter < 314) {
      bonus = 0.15;
    } else if (counter >= 314 && counter < 400) {
      bonus = 0.14;
    } else if (counter >= 400 && counter < 496) {
      bonus = 0.13;
    } else if (counter >= 496 && counter < 603) {
      bonus = 0.12;
    } else if (counter >= 603 && counter < 722) {
      bonus = 0.11;
    } else if (counter >= 722 && counter < 854) {
      bonus = 0.1;
    } else {
      bonus = 0.09;
    }

    return bonus;
  };

  const getMetadata = async (id) => {
    const response = await fetch(
      "https://ipfs.io/ipfs/QmWMnyAMSsVhWmsBP1jkamm39RMQmbTaBCp4q24nUAdcui/2",
      {
        method: "GET",
      }
    );
    const metadata = await response.json();
    const imageCID = metadata.image.substring(7);
    const imageUrl = `https://ipfs.io/ipfs/${imageCID}`;

    setDrawnImage(imageUrl);
  };

  const mint = async () => {
    try {
      const price = await vamps.getPrice();
      const toBurn = await vamps.getPxenToBurnAmount();
      console.log(price.toString());
      console.log(toBurn.toString());
      console.log(vamps.address);
      const approveTx = await pXenToken.approve(vamps.address, toBurn);

      setDrawing(true);
      openPopup();
      await approveTx.wait(1);

      const mintTx = await vamps.mint({ value: price });

      await mintTx.wait(1);

      const minted = (await vamps.getCounter()).toNumber();
      const mintedAmount = await vamps.getMintedAmoutByMinter(
        provider.getSigner().getAddress()
      );
      const limitReached = mintedAmount >= 3;
      setLimitReached(limitReached);
      setMintedAmout(minted);

      vamps.once("Transfer", (from, to, id) => {
        getMetadata(id);
        setTokenid(id.toNumber());
        setBonus(getBonus(id.toNumber()));
        setDrawing(false);
      });
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="App">
      <div className="section">
        <header className="App-header">
          <img src={s1} className="App-logo" alt="logo" />
        </header>
      </div>
      <div className="section section-2">
        <div className="App-content">
          <p className="App-header-text">{mintedAmount}/1000 MINTED</p>
          <div className="App-img-center">
            <img src={image} className="App-mouth-img" alt="logo" />
          </div>
          {!connected ? (
            <button
              className="App-gradient-button mobile-button"
              onClick={connectWallet}
            >
              Connect
            </button>
          ) : (
            <button
              className={`App-gradient-button mobile-button ${
                limitReached ? "disabled" : ""
              }`}
              onClick={mint}
              disabled={limitReached}
            >
              {limitReached ? "Limit reached " : "Mint"}
            </button>
          )}
          <div className="App-title">
            CONTRACT:
            <p></p>
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
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            {drawing ? (
              <div>Wait</div>
            ) : (
              <>
                <h2>#{tokenId}</h2>
                <img height={"200px"} src={drawnImage} alt="A Blue Circle" />
                <p>Yield Bonus: {bonus}</p>
                <button
                  className="App-gradient-button App-gradient-button-smaller"
                  onClick={closePopup}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
