import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { joinClasses } from "./helpers";
import { useWallet } from "./context/WalletContext";
import { getProvider } from "./provider";
import Homepage from "./pages/HomePage";

function App() {
  const { setWalletAddress } = useWallet();
  React.useEffect(() => {
    async function init() {
      try {
        const _provider = await getProvider();

        if (setWalletAddress) {
          const signer = _provider.getSigner();
          setWalletAddress(await signer.getAddress());
        }
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [setWalletAddress]);
  return (
    <Router>
      <div className={joinClasses("grid", "grid-rows-3m", "min-h-screen")}>
        <Navbar />

        <div className="h-full ">
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
