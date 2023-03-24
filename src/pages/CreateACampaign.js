import MMButton from "../components/MMButton";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { launchCampaign, provider, contract } from "../utils/configs";
import DonateToDev from "../components/DonateToDev";
import ShareToTwitter from "../components/ShareToTwitter";

const CreateACampaign = () => {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [txHash, setTxHash] = useState();
  const [errMsg, setErrMsg] = useState();
  const [showModal, setShowModal] = useState(false);
  const [networkId, setNetworkId] = useState();

  // Web3 connection
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
      setTimeout(() => setShowModal(true), 1000);
      // setIsLoading(true);
    } catch (err) {
      console.log(err);
      setErrMsg(`Uh oh, an error occured while creating the campaign.`);
    }
  }
  //Handle modal
  function handleModalClose() {
    setShowModal(false);
  }

  useEffect(() => {
    // add event listener to close modal when user clicks outside of it
    window.addEventListener("click", handleModalClose);

    return () => {
      // remove event listener when component unmounts
      window.removeEventListener("click", handleModalClose);
    };
  }, []);

  const [numOfCampaigns, setNumOfCampaigns] = useState("");
  // Get total campaigns
  useEffect(() => {
    async function getTotalCampaigns() {
      const campaigns = await contract.totalCampaigns();
      setNumOfCampaigns(campaigns);
    }
    getTotalCampaigns();
  }, []);

  //GOERLI ONLY
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="h-screen content-center justify-center grid"
    >
      {networkId ? (
        <div className="text-black grid justify-center place-items-center space-y-6 xs:px-4">
          <div className="text-center space-y-3">
            <h1 className="md:text-3xl sm:text-2xl xs:text-xl">
              Create A Campaign
            </h1>
          </div>
          <div className="grid justify-center pt-5 space-y-4">
            {account ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-center">
                  Please fill out the form to create your campaign.
                </p>
                <div className="md:px-6">
                  <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
                </div>
                <form className="space-y-8">
                  <div>
                    <label
                      htmlFor="default-input"
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
                      htmlFor="default-input"
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
                    <p className="text-xs font-thin">Max 50 characters.</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-5">
                      <div className="">
                        <label
                          htmlFor="default-input"
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
                      <div className="relative">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          Start At{" "}
                          <span className="text-xs font-thin">
                            [30 days max]
                          </span>
                        </label>
                        <input
                          type="text"
                          id="startAt"
                          maxLength="10"
                          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="00-00-0000"
                        />
                      </div>
                      <span className="mx-4 text-gray-500">to</span>
                      <div className="relative">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          End At
                        </label>
                        <input
                          type="text"
                          id="endAt"
                          maxLength="10"
                          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="00-00-0000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-3/4">
                    <label
                      htmlFor="message"
                      className="block  text-sm font-medium text-black"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="block p-2.5 min-w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500   dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Please give a detail description of your campaign."
                      maxLength="4000"
                    ></textarea>
                    <p className="text-xs font-thin">Max 2000 characters.</p>
                  </div>
                  <div className="w-1/3">
                    {showModal && txHash ? (
                      <div className="fixed top-0 left-0 backdrop-blur-sm w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white p-24 rounded-xl space-y-6"
                        >
                          <div>
                            <h2 className="font-black text-xl text-teal-600 text-center">
                              Success!
                            </h2>
                            <p className="text-md font-bold text-black pt-2 grid justify-center">
                              Creating your campaign...
                              <a
                                href={`https://goerli.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="font-thin text-teal-900 hover:underline "
                              >
                                <span className="font-bold">TX:</span>{" "}
                                {txHash.substring(0, 6)}...{" "}
                                {txHash.substring(txHash.length - 6)}
                              </a>
                            </p>
                            <div className="pt-5">
                              <ShareToTwitter
                                id={numOfCampaigns}
                                title={
                                  "Just created a campaign on CrowdGaming! Please donate to it. #CrowdGaming"
                                }
                              />
                            </div>
                          </div>
                          <div className="md:px-6">
                            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
                          </div>
                          <div className="">
                            <DonateToDev />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            newContract();
                          }}
                          className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
                        >
                          Create Your Campaign
                        </button>
                        {errMsg ? (
                          <p className="text-red-600">{errMsg}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                    <p className="text-xs font-thin pt-2">
                      * Creating a campaign incurs gas fees to deploy and set
                      the smart contract. Please have enough ETH in your wallet
                      before submitting your campaign to cover these gas fees.
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="grid justify-center space-y-2">
                <p className="text-center">
                  Connect Your Wallet To Begin A Campaign
                </p>
                <MMButton connectWallet={connectWallet} owner={account} />
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
          </div>
        </div>
      ) : (
        <p>Please Switch To Goerli!</p>
      )}
    </motion.div>
  );
};

export default CreateACampaign;
