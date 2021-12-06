import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { joinClasses } from "./helpers";
import { useWallet } from "./context/WalletContext";
import { getProvider } from "./provider";
import Homepage from "./pages/HomePage";
import NewCoursePage from "./pages/NewCoursePage";
import NewBootcampPage from "./pages/NewBootcampPage";
import BootcampDetailsPage from "./pages/BootcampDetailsPage";
import ReviewPage from "./pages/ReviewPage";

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

        <div className="h-full">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route
              path={"bootcamp/:bootcampAddress/review"}
              element={<ReviewPage />}
            />
            <Route
              path="/bootcamp/:bootcampAddress"
              element={<BootcampDetailsPage />}
            />
            <Route path="/newCourse" element={<NewCoursePage />} />
            <Route path="/newBootcamp" element={<NewBootcampPage />} />
            <Route
              path="/newBootcamp/:bootcampAddress"
              element={<NewBootcampPage />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
