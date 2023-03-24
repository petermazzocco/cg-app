import MMButton from "../components/MMButton";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import ShareToTwitter from "../components/ShareToTwitter";

import {
  pledgeTo,
  provider,
  contract,
  cancelCampaign,
  withdrawFrom,
} from "../utils/configs";

import Campaign from "../components/Campaign";
import DonateToDev from "../components/DonateToDev";

const AllCampaigns = () => {
  const [campaign, setCampaign] = useState();
  const [txHash, setTxHash] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const [errMsg, setErrMsg] = useState();
  const [cancelHash, setCancelHash] = useState();
  const [withdrawHash, setWithdrawHash] = useState();
  // eslint-disable-next-line
  const [numOfCampaigns, setNumOfCampaigns] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [networkId, setNetworkId] = useState();

  let { id } = useParams();
  let navigate = useNavigate();
  // Connect wallet
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
  }

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
    //Navigate to campaign ID
    navigate(`/campaigns/${selectedCampaign}`);
  }

  // Set the selected campaign ID to the value from URL params
  useEffect(() => {
    setSelectedCampaign(id);
  }, [id]);

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
      setTimeout(() => setShowModal(true), 1000);
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
        setTimeout(() => setShowModal(true), 1000);
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
        setTimeout(() => setShowModal(true), 1000);
      } catch (err) {
        alert(err);
      }
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

  return (
    <div className="h-screen">
      {networkId ? (
        <>
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
                id="id"
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
                      {campaignId}
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
            <div className="grid justify-center align-middle place-items-center space-y-8">
              {" "}
              <h2 className="text-center xs:text-xl sm:text-2xl text-teal-600">
                Ready to Pledge?
              </h2>
              <p className="text-center xs:text-md sm:text-lg">
                Start helping out campaigns today! Click "
                <span className="text-teal-600">Get Campaign</span>
                ".
              </p>
              <p className="w-1/2">
                <span className="text-red-400 font-bold">Before You Do:</span>{" "}
                Transactions on the blockchain are irreversible, which means
                that any mistake made during the transaction cannot be undone.
                This creates a risk for users who may accidentally send, refund
                or withdraw funds to the wrong address, enter incorrect
                transaction details, or other errors. As such, it's important to
                carefully double-check all transaction details before sending.
                CrowdGaming cannot be held responsible for any loss of funds
                resulting from user or blockchain error, as it's outside our
                control.
              </p>
            </div>
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
                    id={campaign.id}
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
                            {showModal && withdrawHash ? (
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
                                      Your funds are on the way
                                      <a
                                        href={`https://goerli.etherscan.io/tx/${withdrawHash}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-thin text-teal-900 hover:underline "
                                      >
                                        <span className="font-bold">TX:</span>{" "}
                                        {withdrawHash.substring(0, 6)}...{" "}
                                        {withdrawHash.substring(
                                          withdrawHash.length - 6
                                        )}
                                      </a>
                                    </p>
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
                                {showModal && cancelHash ? (
                                  <div className="fixed top-0 left-0 backdrop-blur-sm w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                    <div
                                      onClick={(e) => e.stopPropagation()}
                                      className="bg-white p-24 rounded-xl space-y-6 "
                                    >
                                      <div>
                                        <h2 className="font-black text-xl text-teal-600 text-center">
                                          Successfully Cancelled
                                        </h2>
                                        <p className="text-md font-bold text-black pt-2 grid justify-center">
                                          Your campaign has been cancelled.
                                          <a
                                            href={`https://goerli.etherscan.io/tx/${cancelHash}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-thin text-teal-900 hover:underline "
                                          >
                                            <span className="font-bold">
                                              TX:
                                            </span>{" "}
                                            {cancelHash.substring(0, 6)}...{" "}
                                            {cancelHash.substring(
                                              cancelHash.length - 6
                                            )}
                                          </a>
                                        </p>
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
                            {/* Transaction Hash Modal */}
                            {showModal && txHash && (
                              <div className="fixed top-0 left-0 w-full backdrop-blur-sm h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-white p-24 rounded-xl space-y-6"
                                >
                                  <div>
                                    <h2 className="font-black text-xl text-teal-600 text-center">
                                      Success!
                                    </h2>
                                    <p className="text-md font-bold text-black pt-2 grid justify-center">
                                      Your donation is on the way!
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
                                    <div className="pt-4">
                                      <ShareToTwitter
                                        id={selectedCampaign}
                                        title={
                                          "Just donated to this campaign! Check it out: #CrowdGaming"
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
                            )}
                            {/* Throw error message */}
                            {errMsg && <p className="text-red-600">{errMsg}</p>}
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
                    <ShareToTwitter
                      id={selectedCampaign}
                      title={
                        "Check out this campaign from CrowdGaming! #CrowdGaming"
                      }
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="grid justify-center">
          <h2 className="text-center text-2xl pt-64">
            Please Switch To Goerli!
          </h2>
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;
