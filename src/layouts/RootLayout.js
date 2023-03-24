import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { provider } from "../utils/configs";

const RootLayout = () => {
  const [networkId, setNetworkId] = useState();
  useEffect(() => {
    async function getNetworkID() {
      const network = await provider.getNetwork();
      const chainId = network.chainId;
      if (chainId === 5) {
        setNetworkId(chainId);
        console.log(chainId);
      }
    }
    getNetworkID();
  }, []);

  return (
    <div className="bg-[#EFF1F3] min-h-screen">
      {networkId ? (
        <>
          <header>
            <Navbar />
          </header>
          <main>
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </>
      ) : (
        <div className=" px-24 pt-48 text-black text-center">
          <h1 className="text-2xl font-black">Uh Oh!</h1>
          <p>We're currently not on the mainnet.</p>
          <p>
            Please switch to <span className="text-[#F6851B]"> Goerli </span>and
            refresh the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
