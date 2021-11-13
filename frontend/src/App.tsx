import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { joinClasses } from "./helpers";
import { useWallet } from "./context/WalletContext";
import { getProvider } from "./provider";
import Greeter from "./components/Greeter";
import { GreeterProvider } from "./context/GreeterContext";

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
      <div
        className={joinClasses(
          "grid",
          "grid-rows-3m",
          "min-h-screen",
          "max-w-4xl",
          "mx-auto",
          "text-center",
          "text-gray-600",
          "font-mono"
        )}
      >
        <Navbar />

        <div className="h-full text-center">
          <Switch>
            <Route exact path="/">
              <h1 className="mt-10 text-xl font-bold">
                A Hardhat, React, Typescript, Tailwindcss boilerplate for DAAP
                development.
              </h1>
              <GreeterProvider>
                <Greeter />
              </GreeterProvider>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
