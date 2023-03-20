import React, { useState } from "react";
import { ethers } from "ethers";
import MMButton from "../components/MMButton";
import { provider, contract } from "../utils/configs";

const Profile = () => {
  const [agree, setAgree] = useState(false);
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const [pledged, setPledged] = useState();

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

  // Search pledged amount by ID
  async function getPledgedAmount() {
    const id = document.getElementById("id").value;
    const campaign = await contract.pledgedAmount(id, signer);
    setPledged(campaign);
    console.log(campaign);
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center sm:text-2xl md:text-3xl pt-10 font-bold">
        Profile
      </h1>
      {!agree ? (
        <div className="grid justify-center space-y-2">
          <p className=" xs:text-md md:text-lg font-bold text-center">Login</p>
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
            <>
              <div className="text-center">
                <p className="font-xs font-bold text-teal-600 pt-2">
                  Connected As:{" "}
                  <span className="font-thin text-teal-900">
                    {account.substring(0, 4)}...
                    {account.substring(account.length - 4)}
                  </span>
                </p>
              </div>
              <div className="md:px-6">
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
              </div>
              <div className="grid md:grid-cols-2 xs:grid-cols-1 place-items-center">
                <div className=" col-span-1">
                  <h2 className="font-bold xs:text-lg md:text-xl">Campaigns</h2>
                  <p className="text-xs">
                    View or cancel your active and expired campaigns.
                  </p>
                </div>
                <div className=" grid justify-center col-span-1">
                  <h2 className="font-bold xs:text-lg md:text-xl">Pledged</h2>
                  <p className="text-xs">
                    View how much you've donated to a campaign.
                  </p>
                  <p className="text-center pt-4">Campaign ID</p>
                  <form className="flex flex-row justify-evenly align-middle space-x-4 place-items-center pt-5">
                    <input
                      id="id"
                      type="text"
                      className="bg-gray-50 w-24 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block   p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                      onClick={getPledgedAmount}
                      className="border border-black px-4 h-10 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
                    >
                      Search
                    </button>
                    {pledged ? <p>You have donated: {pledged} ETH</p> : <></>}
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className=" xs:text-md md:text-lg font-bold text-center">
                Login
              </p>
              <MMButton
                agree={agree}
                connectWallet={connectWallet}
                owner={account}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
