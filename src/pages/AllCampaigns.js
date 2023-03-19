import MMButton from "../components/MMButton";
import React, { useState } from "react";
// import { motion } from "framer-motion";
import { ethers } from "ethers";
import CrowdGaming from "../artifacts/contracts/CrowdGaming.sol/CrowdGaming.json";
import { pledgeTo } from "../utils/configs";

//Contract address
const contractAddress = "0x882978f7Afef5bc38c73461f4Bf096e5dF03Ef5C";

const AllCampaigns = () => {
  const [agree, setAgree] = useState(false);
  const [campaign, setCampaign] = useState();
  const [txHash, setTxHash] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();

  // Web3 connection
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    CrowdGaming.abi,
    provider
  );

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
    // console.log(JSON.stringify(campaign));
  }

  // Pledge to campaign

  async function pledgeToCampaign() {
    const amount = ethers.utils.parseEther(
      document.getElementById("eth").value,
      "ether"
    );

    try {
      const tx = await pledgeTo(signer, amount);
      setTxHash(tx.hash);
      console.log(tx.hash);
    } catch (err) {
      console.log(err);
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
            <div className="flex flex-row justify-start space-x-32">
              <div>
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Goal:
                </h2>
                <p>{ethers.utils.formatEther(campaign.goal.toString())} ETH</p>
              </div>
              <div>
                <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                  Amount Pledged:
                </h2>
                <p>
                  {ethers.utils.formatEther(campaign.pledged.toString())} ETH
                </p>
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

                        {txHash ? (
                          <p className="font-xs font-bold text-teal-600 pt-2">
                            Sending your pledge...{" "}
                            <span className="font-thin text-teal-900">
                              {txHash.substring(0, 4)}...
                              {txHash.substring(txHash.length - 4)}
                            </span>
                          </p>
                        ) : (
                          <p className="font-xs font-bold text-teal-600 pt-2">
                            Connected:{" "}
                            <span className="font-thin text-teal-900">
                              {account.substring(0, 4)}...
                              {account.substring(account.length - 4)}
                            </span>
                          </p>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;
