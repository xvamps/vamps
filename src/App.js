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
import references from "./img/references.json";
import image from "./img/vamps.gif";
const State = {
  None: 0,
  Approving: 1,
  Approved: 2,
  Drawing: 3,
  Drawn: 4,
};

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
  const [state, setState] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      const rpcProvider = new ethers.providers.JsonRpcProvider(
        "https://rpc.pulsechain.com"
      );
      const vampsAddress = "0x946d8EDd46CB8B4D704D111143AbE1fa40B4e1B2"; // Replace with your actual contract address
      const vamps = new ethers.Contract(vampsAddress, Vamps.abi, rpcProvider);

      const minted = (await vamps.getCounter()).toNumber();
      setMintedAmout(minted);
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

        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (currentChainId !== "0x171") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x171" }],
          });
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const vampsAddress = "0x946d8EDd46CB8B4D704D111143AbE1fa40B4e1B2"; // Replace with your actual contract address
        const vamps = new ethers.Contract(
          vampsAddress,
          Vamps.abi,
          provider.getSigner()
        );

        const pXenTokenAddress = "0x8a7FDcA264e87b6da72D000f22186B4403081A2a"; // Replace with your actual contract address

        const pXenToken = new ethers.Contract(
          pXenTokenAddress,
          Vamps.abi,
          provider.getSigner()
        );

        const started = await vamps.isStarted();

        setProvider(provider);
        setVamps(vamps);
        setPXenToken(pXenToken);
        setStarted(started);
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
    // const response = await fetch(
    //   `https://ipfs.io/ipfs/QmNPkjMWg1R2g4W4GZtPp4cwRgkiXt2BsMZoFffqLv8WAf/${id}`,
    //   {
    //     method: "GET",
    //   }
    // );
    // const metadata = await response.json();
    // const imageCID = metadata.image.substring(7);
    // const imageUrl = `https://ipfs.io/ipfs/${imageCID}`;
    const imageUrl = references[id];

    setDrawnImage(imageUrl);
  };

  const mint = async () => {
    try {
      const signerAddress = await await provider.getSigner().getAddress();
      const filter = {
        address: pXenToken.address,
        topics: [
          ethers.utils.id("Transfer(address,address,uint256)"),
          ethers.utils.hexZeroPad(ethers.constants.AddressZero, 32),
          ethers.utils.hexZeroPad(signerAddress, 32),
        ],
      };
      vamps.once(filter, (from, to, id) => {
        if (from === ethers.constants.AddressZero && to === signerAddress) {
          getMetadata(id);
          setTokenid(id.toNumber());
          setBonus(getBonus(id.toNumber()));
          setState(4);
        }
      });

      const price = await vamps.getPrice();

      const toBurn = await vamps.getPxenToBurnAmount();

      const approveTx = await pXenToken.approve(vamps.address, toBurn);
      setState(1);

      openPopup();
      await approveTx.wait(1);
      setState(2);
      const mintTx = await vamps.mint({ value: price });
      setState(3);
      await mintTx.wait(1);

      const minted = (await vamps.getCounter()).toNumber();
      const mintedAmount = await vamps.getMintedAmoutByMinter(
        provider.getSigner().getAddress()
      );
      const limitReached = mintedAmount >= 3;
      setLimitReached(limitReached);
      setMintedAmout(minted);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const popupContent = () => {
    if (state === State.Approving)
      return (
        <div>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <p>Approval in progress...</p>
        </div>
      );
    else if (state === State.Approved)
      return (
        <div>
          <div className="check"></div>
          <p>Tokens approved. Please mint.</p>
        </div>
      );
    else if (state === State.Drawing)
      return (
        <div>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <p>Minting in progress...</p>
        </div>
      );
    else if (state === State.Drawn)
      return (
        <div>
          <h2>#{tokenId}</h2>
          <img height={"200px"} src={drawnImage} alt="A Blue Circle" />
          <p>Yield Bonus: {bonus}</p>
          <button
            className="App-gradient-button App-gradient-button-smaller"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      );
    else return <div></div>;
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
          ) : started && mintedAmount < 1000 ? (
            <button
              className={`App-gradient-button mobile-button ${
                limitReached ? "disabled" : ""
              }`}
              onClick={mint}
              disabled={limitReached}
            >
              {limitReached ? "Limit reached " : "Mint"}
            </button>
          ) : mintedAmount >= 1000 ? (
            <button
              className={`App-gradient-button mobile-button disabled`}
              disabled
            >
              Minting finished
            </button>
          ) : (
            <button className={`App-gradient-button mobile-button`}>
              Blooding soon...
            </button>
          )}
          <div className="App-title">
            CONTRACT:
            <p>0x946d8EDd46CB8B4D704D111143AbE1fa40B4e1B2</p>
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
          <div className="popup">{popupContent()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
