import React, { useState } from "react";
import { ethers } from "ethers";
import { donate, provider, withdraw } from "../utils/donateToDevConfig";
import MMButton from "../components/MMButton";

const dev = "0x90BadE35Da052450B01e99b38Cbb550BC3f1dD58";

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
      const tx = await donate(signer, name, message, amount);
      setTxHash(tx.hash);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  async function withdrawTip() {
    try {
      const tx = await withdraw(signer);
      setTxHash(tx.hash);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="grid">
      <p className="text-center font-bold">Want to Donate To The Dev?</p>

      {account ? (
        <>
          {account === dev ? (
            <div className="grid justify-center">
              <label className="text-center pt-2">Hello Dev!</label>

              <button
                className="border w-full mt-2 border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                type="button"
                onClick={withdrawTip}
              >
                Withdraw
              </button>
              <p className="text-xs font-thin">You can withdraw tips here</p>
            </div>
          ) : (
            <>
              <form className="grid place-items-center space-y-3">
                <div className=" grid justify-center">
                  <label>Name</label>

                  <input
                    placeholder={account}
                    disabled
                    type="text"
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
                    type="text"
                    placeholder="Thanks!"
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    id="message"
                  />
                </div>
                <div className=" grid justify-center">
                  <label>Amount</label>
                  <input
                    type="text"
                    placeholder="in ETH"
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    id="eth"
                  />
                </div>
                <div className=" grid justify-center">
                  <button
                    type="button"
                    className="border w-full border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                    onClick={newDonation}
                  >
                    Donate
                  </button>

                  {txHash ? (
                    <div className="grid justify-center text-center">
                      <p>Thank You :^)</p>
                      <p>
                        TX Hash:{""}
                        <a
                          href={`https://goerli.etherscan.io/tx/${txHash}`}
                          className="text-thin underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {txHash.substring(0, 3)}...
                          {txHash.substring(txHash.length - 3)}
                        </a>
                      </p>
                    </div>
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
          )}
        </>
      ) : (
        <MMButton connectWallet={connectWallet} owner={account} />
      )}
    </div>
  );
};

export default DonateToDev;
