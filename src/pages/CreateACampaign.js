import MMButton from "../components/MMButton";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { launchCampaign } from "../utils/configs";

const CreateACampaign = () => {
  const [agree, setAgree] = useState(false);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [txHash, setTxHash] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  //Agree to ToS button
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  // Web3 connection
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
  }

  // Create new Campaign
  async function newContract() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const goal = ethers.utils.parseEther(
      document.getElementById("goal").value,
      "ether"
    );
    const startAtInput = document.getElementById("startAt").value;
    const endAtInput = document.getElementById("endAt").value;

    // Parse startAt and endAt inputs into milliseconds since epoch
    const startAtDate = new Date(startAtInput);
    const endAtDate = new Date(endAtInput);
    const startAt = startAtDate.getTime() / 1000;
    const endAt = endAtDate.getTime() / 1000;
    try {
      const tx = await launchCampaign(
        signer,
        title,
        description,
        goal,
        startAt,
        endAt
      );
      setTxHash(tx.hash);
      // setIsLoading(true);
    } catch (err) {
      console.log(`Error when creating a contract: ${err}`);
    }
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
                  className="w-4 h-4 text-blue-600 rounded focus:bg-gray-800  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-white border-gray-600"
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
                  <p>Please fill out the form to create your campaign.</p>
                  <form className="space-y-8">
                    <div>
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Creator
                      </label>
                      <input
                        type="text"
                        placeholder={account}
                        id="owner"
                        disabled
                        className="bg-gray-50 border cursor-not-allowed border-gray-600 text-teal-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-1/2 p-2.5  dark:placeholder-teal-500  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="My Campaign"
                        id="title"
                        maxLength="50"
                        className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-1/2 p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                      />
                      <p className="text-xs font-thin">
                        Max 50 characters. The transaction will fail if you go
                        over 50.
                      </p>
                    </div>
                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Goal
                      </label>
                      <input
                        type="text"
                        placeholder="In ETH"
                        id="goal"
                        className="bg-gray-50 w-20 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <div class="flex items-center">
                        <div class="relative">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-black"
                          >
                            Start At
                          </label>
                          <input
                            type="text"
                            id="startAt"
                            class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="00-00-0000"
                          />
                        </div>
                        <span class="mx-4 text-gray-500">to</span>
                        <div class="relative">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-black"
                          >
                            End At
                          </label>
                          <input
                            type="text"
                            id="endAt"
                            class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="00-00-0000"
                          />
                        </div>
                      </div>
                      <p className="text-xs font-thin">
                        Max length is 30 days. The transaction will fail if you
                        go over 30.
                      </p>
                    </div>
                    <div className="w-3/4">
                      <label
                        for="message"
                        className="block  text-sm font-medium text-black"
                      >
                        Description{" "}
                        <span className="text-xs font-thin">**</span>
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 min-w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500   dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Please give a detail description of your campaign."
                        maxLength="4000"
                      ></textarea>
                      <p className="text-xs font-thin">
                        Max 2000 characters. The transaction will fail if you go
                        over 2000.
                      </p>
                    </div>
                    <div className="w-1/3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          newContract();
                        }}
                        className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
                      >
                        Create Your Campaign
                      </button>
                      {txHash ? (
                        <div className="pt-2">
                          <p className="text-sm font-bold">
                            Creating Your Campaign...
                          </p>
                          {txHash}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <p className="text-xs font-thin pt-2">
                        * Creating a campaign incurs gas fees to deploy and set
                        the smart contract. Please have enough ETH in your
                        wallet before submitting your campaign to cover these
                        gas fees.
                      </p>
                      <p className="text-xs font-thin pt-2">
                        ** The longer the description the higher the likelihood
                        of a larger gas fees for deploying the contract will
                        occur. Please keep that in mind when creating a
                        description
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <div className="grid justify-center space-y-2">
                  <p className="text-center">Now, connect your wallet:</p>
                  <MMButton
                    agree={agree}
                    connectWallet={connectWallet}
                    owner={account}
                  />
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
