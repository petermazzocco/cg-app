import React, { useState } from "react";
import { ethers } from "ethers";
import { buyCoffee, provider } from "../utils/donateToDevConfig";
import MMButton from "../components/MMButton";

const DonateToDev = () => {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [txHash, setTxHash] = useState();

  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
  }

  async function newDonation() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const amount = ethers.utils.parseEther(
      document.getElementById("eth").value,
      "ether"
    );
    try {
      const tx = await buyCoffee(signer, name, message, amount);
      setTxHash(tx.hash);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  return (
    <div className="grid">
      <p className="text-center font-bold">Want to Donate To The Dev?</p>

      {account ? (
        <>
          <form className="grid place-items-center space-y-3">
            <div className=" grid justify-center">
              <label>Name</label>
              <input
                placeholder={account}
                disabled
                className="bg-gray-50 cursor-not-allowed border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                id="name"
              />
            </div>
            <div className=" grid justify-center">
              <label>
                Message
                <span className="text-xs font-thin">{""}*Not required</span>
              </label>
              <input
                placeholder="Thanks!"
                className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                id="message"
              />
            </div>
            <div className=" grid justify-center">
              <label>Amount</label>
              <input
                placeholder="in ETH"
                className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                id="eth"
              />
            </div>
            <div className=" grid justify-center">
              <button
                className="border w-full border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                onSubmit={newDonation}
              >
                Donate
              </button>
              {txHash ? (
                { txHash }
              ) : (
                <>
                  <p className="text-xs text-center">Connected</p>
                  <p className="text-xs text-center text-teal-500">
                    {account.substring(0, 5)}...
                    {account.substring(account.length - 5)}
                  </p>
                </>
              )}
            </div>
          </form>
        </>
      ) : (
        <MMButton connectWallet={connectWallet} owner={account} />
      )}
    </div>
  );
};

export default DonateToDev;
