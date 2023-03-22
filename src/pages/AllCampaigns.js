import MMButton from "../components/MMButton";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import {
  pledgeTo,
  provider,
  contract,
  cancelCampaign,
  withdrawFrom,
} from "../utils/configs";

import Campaign from "../components/Campaign";

const AllCampaigns = () => {
  const [campaign, setCampaign] = useState();
  const [txHash, setTxHash] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const [errMsg, setErrMsg] = useState();
  const [cancelHash, setCancelHash] = useState();
  const [withdrawHash, setWithdrawHash] = useState();
  const [numOfCampaigns, setNumOfCampaigns] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  // Connect wallet
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
  }

  // Get total campaigns
  useEffect(() => {
    async function getTotalCampaigns() {
      const allCampaigns = await contract.totalCampaigns();
      setNumOfCampaigns(allCampaigns);
      const campaignIds = [];
      for (let i = 0; i < allCampaigns.toNumber(); i++) {
        campaignIds.push(i);
      }
      setCampaigns(campaignIds);
    }
    getTotalCampaigns();
  }, []);

  // Get campaign by ID
  async function getCampaigns(e) {
    e.preventDefault();
    const campaign = await contract.campaigns(selectedCampaign);
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
    } catch (err) {
      setErrMsg(`Uh oh, an error occured!`);
    }
  }

  // Cancel campaign
  async function cancelCampaigns() {
    const id = document.getElementById("id").value;
    if (account !== campaign.owner) {
      alert("You're not the owner and you cannot withdraw from this campaign");
    } else {
      try {
        const cancel = await cancelCampaign(signer, id);
        setCancelHash(cancel.hash);
      } catch (err) {
        alert(err);
      }
    }
  }

  // Withdraw from campaign
  async function withdrawFunds() {
    const id = document.getElementById("id").value;
    if (account !== campaign.owner) {
      alert("You're not the owner and you cannot withdraw from this campaign");
    } else {
      try {
        const withdraw = await withdrawFrom(signer, id);
        setWithdrawHash(withdraw.hash);
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <div className="h-screen">
      <div className="grid  pt-10 justify-center align-middle place-items-center">
        <h1 className="md:text-3xl sm:text-2xl xs:text-xl pb-4">
          Find A Campaign
        </h1>
      </div>
      <div className="md:px-6">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
      </div>
      <div className="grid justify-center align-middle place-items-center pb-10">
        <form className="flex flex-row justify-between align-middle space-x-4 place-items-center pt-5">
          <select
            value={selectedCampaign}
            onChange={(e) => {
              setSelectedCampaign(e.target.value);
            }}
            className="rounded-md px-2 py-2 w-34 focus:ring-teal-600 hover:border-teal-200"
          >
            <option value="">Select ID</option>
            {campaigns
              .slice()
              .reverse()
              .map((campaignId) => (
                <option key={campaignId} value={campaignId}>
                  {campaignId + 1}
                </option>
              ))}
          </select>
          <button
            className="border border-black px-4 h-10 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
            onClick={getCampaigns}
          >
            Get Campaign
          </button>
        </form>
      </div>
      {!campaign ? (
        <>
          {" "}
          <h2 className="text-center xs:text-xl sm:text-2xl text-teal-600 pt-10">
            Ready to Pledge?
          </h2>
          <p className="text-center xs:text-md sm:text-lg pt-10">
            Start helping out campaigns today! Simply find a campaign that's
            active and connect your wallet!
          </p>
        </>
      ) : (
        <div className="xs:px-10 sm:px-14 md:px-24 pb-24">
          <div>
            {campaign && (
              <Campaign
                title={campaign.title}
                owner={`${campaign.owner.substring(0, 5)}...
            ${campaign.owner.substring(campaign.owner.length - 4)}`}
                campaign={campaign}
                startDate={new Date(
                  campaign.startAt.toNumber() * 1000
                ).toLocaleString()}
                endDate={new Date(
                  campaign.endAt.toNumber() * 1000
                ).toLocaleString()}
                description={campaign.description}
              />
            )}
          </div>
          {/* If account is campaign owner, remove pledge. If the campaign hasn't started, display cancel button. If campaign has started, display warning. If campaign has ended and goal was met, display Withdraw*/}
          <div className="grid justify-center space-y-2 pt-10">
            {account ? (
              <div className="text-center">
                <p className="font-xs font-bold text-teal-600 pt-2 pb-2">
                  Connected:{" "}
                  <span className="font-thin text-teal-900">
                    {account.substring(0, 4)}...
                    {account.substring(account.length - 4)}
                  </span>
                </p>
                {/* If the owner connects to the account*/}
                {account === campaign.owner ? (
                  <div>
                    {/* If the campaign has ended*/}
                    {campaign.endAt <= new Date().getTime() / 1000 ? (
                      <div className="space-y-2 text-center">
                        <p className="font-bold text-red-400">
                          Campaign Has Ended
                        </p>
                        <p>Connect your wallet to withdraw funds</p>
                        <button
                          className="border w-full border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                          onClick={withdrawFunds}
                        >
                          Withdraw
                        </button>
                        {withdrawHash ? (
                          <>
                            <a
                              href={`https://goerli.etherscan.io/tx/${withdrawHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-thin text-teal-900 hover:underline "
                            >
                              Withdrawing funds...
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        {/* If the campaign hasn't started*/}
                        {campaign.startAt >= new Date().getTime() / 1000 ? (
                          <>
                            <p>Your campaign hasn't started</p>
                            <p>Do you want to cancel it?</p>
                            <button
                              className="border w-full border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                              onClick={cancelCampaigns}
                            >
                              Cancel
                            </button>
                            {/* Cancellation Hash */}
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
                          </>
                        ) : (
                          <>
                            <p> Your Campaign Is Active</p>
                            <p> Check Back Later</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid justify-center space-y-4 ">
                    {/* If anyone else connects*/}
                    {/* If the campaign is active*/}
                    {campaign.endAt >= new Date().getTime() / 1000 ? (
                      <>
                        <input
                          placeholder="In ETH"
                          id="eth"
                          className="bg-gray-50 w-full border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        />
                        <button
                          onClick={pledgeToCampaign}
                          className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
                        >
                          Pledge
                        </button>
                        {/* Transaction Hash for pledging */}
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
                            {/* Throw error message */}
                            {errMsg ? (
                              <p className="text-red-600">{errMsg}</p>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <p className="font-bold text-red-400">
                        Campaign Has Ended
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                <p className="text-left xs:text-md md:text-lg font-bold">
                  Connect Wallet To Interact
                </p>
                <MMButton connectWallet={connectWallet} owner={account} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;
