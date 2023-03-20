import MMButton from "../components/MMButton";
import React, { useState } from "react";
// import { motion } from "framer-motion";
import { ethers } from "ethers";

import { pledgeTo, provider, contract, cancelCampaign } from "../utils/configs";
import ProgressBar from "../components/ProgressBar";

const AllCampaigns = () => {
  const [agree, setAgree] = useState(false);
  const [campaign, setCampaign] = useState();
  const [txHash, setTxHash] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const [errMsg, setErrMsg] = useState();
  const [owner, setOwner] = useState();
  const [cancelHash, setCancelHash] = useState();

  //Agree to ToS button
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  // Connect wallet
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
  }

  // Get campaign by ID
  async function getCampaigns(e) {
    e.preventDefault();
    const id = document.getElementById("id").value;
    // ethers contract METHODS
    const campaign = await contract.campaigns(id);
    setCampaign(campaign);
  }

  // Pledge to campaign
  async function pledgeToCampaign() {
    const id = document.getElementById("id").value;
    const amount = ethers.utils.parseEther(
      document.getElementById("eth").value,
      "ether"
    );

    try {
      const tx = await pledgeTo(signer, id, amount);
      setTxHash(tx.hash);
      console.log(tx.hash);
    } catch (err) {
      console.log(err);
      setErrMsg(`Uh oh, an error occured!`);
    }
  }

  // Cancel campaign
  async function cancelCampaigns() {
    const id = document.getElementById("id").value;
    if (account !== campaign.owner) {
      alert("you're not the owner");
    } else {
      try {
        const cancel = await cancelCampaign(signer, id);
        setCancelHash(cancel.hash);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="h-screen">
      <div className="grid  pt-10 justify-center align-middle place-items-center">
        <h1 className="md:text-3xl sm:text-2xl xs:text-xl pb-4">
          Find A Campaign
        </h1>
        <label>Search By ID</label>
        <form className="flex flex-row justify-between align-middle space-x-4 place-items-center pt-5">
          <input
            id="id"
            type="text"
            className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            className="border border-black px-4 h-10 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
            onClick={getCampaigns}
          >
            Search
          </button>
        </form>
      </div>
      <div className="md:px-6">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
      </div>
      {!campaign ? (
        <></>
      ) : (
        <div className="grid place-items-center w-full">
          <div className="space-y-10 text-left xs:px-4 w-1/2">
            <div className="flex flex-row justify-start space-x-32">
              <div>
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Name:
                </h2>
                <p>{campaign.title}</p>
              </div>
              <div>
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Owner:
                </h2>
                <p>
                  {campaign.owner.substring(0, 5)}...
                  {campaign.owner.substring(campaign.owner.length - 4)}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-start">
              <div className="w-full">
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Campaign Progress:
                </h2>
                <ProgressBar campaign={campaign} />
              </div>
            </div>
            <div className="flex flex-row justify-start space-x-32">
              <div>
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Starts On:
                </h2>
                <p>
                  {new Date(
                    campaign.startAt.toNumber() * 1000
                  ).toLocaleString()}
                </p>
              </div>
              <div>
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Ends On:
                </h2>
                <p>
                  {new Date(campaign.endAt.toNumber() * 1000).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                Description:
              </h2>
              <p>{campaign.description}</p>
            </div>
            <div className="md:px-2">
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
            </div>
            <div className="grid justify-center">
              {campaign.endAt <= new Date().getTime() / 1000 ? (
                <p className="font-bold text-red-500">Campaign Has Ended</p>
              ) : (
                <div className="flex flex-row space-x-5">
                  {!agree ? (
                    <div className="grid justify-center space-y-2">
                      <p className="text-left xs:text-md md:text-lg font-bold">
                        Want To Pledge?
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
                          htmlFor="link-checkbox"
                          className="ml-2 text-xs font-medium text-gray-400"
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
                    <div>
                      {account ? (
                        <div>
                          <div className="flex flex-row space-x-4">
                            {account !== campaign.owner ? (
                              <div>
                                <input
                                  placeholder="In ETH"
                                  id="eth"
                                  className="bg-gray-50 w-20 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                                />
                                <button
                                  onClick={pledgeToCampaign}
                                  className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
                                >
                                  Pledge
                                </button>
                              </div>
                            ) : (
                              <div>
                                {campaign.endAt <=
                                new Date().getTime() / 1000 ? (
                                  <>
                                    <p>
                                      You own this contract, do you want to
                                      cancel?
                                    </p>
                                    <button
                                      className="border border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                                      onClick={cancelCampaigns}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <p>
                                      You own this contract, but you cannot
                                      cancel it as it has already started.
                                    </p>
                                  </>
                                )}
                                {cancelHash ? (
                                  <a
                                    href={`https://goerli.etherscan.io/tx/${cancelHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-thin text-teal-900 hover:underline "
                                  >
                                    Cancelling campaign...
                                  </a>
                                ) : (
                                  <></>
                                )}
                              </div>
                            )}
                          </div>

                          {txHash ? (
                            <p className="font-xs font-bold text-teal-600 pt-2 grid justify-center">
                              Sending your pledge...{" "}
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
                          ) : (
                            <>
                              <p className="font-xs font-bold text-teal-600 pt-2">
                                Connected:{" "}
                                <span className="font-thin text-teal-900">
                                  {account.substring(0, 4)}...
                                  {account.substring(account.length - 4)}
                                </span>
                              </p>

                              {errMsg ? (
                                <p className="text-red-600">{errMsg}</p>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        <MMButton
                          agree={agree}
                          connectWallet={connectWallet}
                          owner={account}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;
