import MMButton from "../components/MMButton";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import CampaignField from "../components/CampaignField";

const CreateACampaign = () => {
  const [agree, setAgree] = useState(false);
  const [account, setAccount] = useState();

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="h-screen content-center justify-center grid"
    >
      <div className="text-black grid justify-center place-items-center space-y-6">
        <div className="text-center space-y-3">
          <h1 className="md:text-3xl sm:text-2xl xs:text-xl">
            Create A Campaign
          </h1>
        </div>
        <div className="grid justify-center pt-5 space-y-4">
          {!agree ? (
            <div className="grid justify-center space-y-2">
              <p className="text-center">
                Start by agreeing to our terms and conditions:
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  onChange={checkboxHandler}
                  value=""
                  className="w-4 h-4 text-blue-600 rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                />
                <label
                  for="link-checkbox"
                  className="ml-2 text-sm font-medium text-gray-400"
                >
                  I agree with the{" "}
                  <span className="text-blue-600 dark:text-blue-500 hover:underline">
                    terms and conditions
                  </span>
                  .
                </label>
              </div>
            </div>
          ) : (
            <>
              {account ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CampaignField account={account} />
                </motion.div>
              ) : (
                <div className="grid justify-center space-y-2">
                  <p className="text-center">Now, connect your wallet:</p>
                  <MMButton agree={agree} connectWallet={connectWallet} />
                  <div className="grid justify-center">
                    <p>Don't have a wallet?</p>
                    <a
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                      href="https://support.metamask.io/hc/en-us/articles/360015489531"
                    >
                      Create one here!
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CreateACampaign;
