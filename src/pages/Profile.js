import React, { useState } from "react";

import MMButton from "../components/MMButton";
import { provider, contract } from "../utils/configs";

const Profile = () => {
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();

  const [campaigns, setCampaigns] = useState();

  // Connect wallet
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
  }

  async function getCampaigns() {
    const id = document.getElementById("id");
    const campaign = await contract.campaigns(id);
    setCampaigns(campaign);
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center sm:text-2xl md:text-3xl pt-10 font-bold">
        Profile
      </h1>

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
              </div>
            </div>
          </>
        ) : (
          <>
            <p className=" xs:text-md md:text-lg font-bold text-center">
              Login
            </p>
            <MMButton connectWallet={connectWallet} owner={account} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
