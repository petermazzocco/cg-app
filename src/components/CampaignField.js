import React from "react";
import { launchCampaign } from "../utils/configs";

const CampaignField = (props) => {
  async function newContract() {
    const owner = props.account;
    const title = document.getElementById("title").value;
    const goal = document.getElementById("goal").value;
    const startAt = document.getElementById("startAt").value;
    const endAt = document.getElementById("endAt").value;
    const description = document.getElementById("description").value;

    try {
      const tx = await launchCampaign(
        owner,
        title,
        goal,
        startAt,
        endAt,
        description
      );
      console.log(`Tx hash: ${tx.hash}`);
      const receipt = await tx.wait();
    } catch (err) {
      console.log(`Error when creating a contract: ${err}`);
    }
  }

  return (
    <div className="grid justify-center h-full place-items-center w-full mx-5 ">
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
            placeholder={props.account}
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
            Max 50 characters. The transaction will fail if you go over 50.
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
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-black"
          >
            Length
          </label>
          <div date-rangepicker class="flex items-center">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                name="start"
                type="text"
                id="startAt"
                class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date to start"
              />
            </div>
            <span class="mx-4 text-gray-500">to</span>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                name="end"
                type="text"
                id="endAt"
                class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date to end"
              />
            </div>
          </div>
          <p className="text-xs font-thin">
            Max length is 30 days. The transaction will fail if you go over 30.
          </p>
        </div>
        <div className="w-3/4">
          <label
            for="message"
            className="block  text-sm font-medium text-black"
          >
            Description <span className="text-xs font-thin">**</span>
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 min-w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500   dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please give a detail description of your campaign."
            maxLength="4000"
          ></textarea>
          <p className="text-xs font-thin">
            Max 2000 characters. The transaction will fail if you go over 2000.
          </p>
        </div>
        <div className="w-1/3">
          <button
            onClick={newContract}
            className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
          >
            Create Your Campaign
          </button>
          <p className="text-xs font-thin pt-2">
            * Creating a campaign incurs gas fees to deploy and set the smart
            contract. Please have enough ETH in your wallet before submitting
            your campaign to cover these gas fees.
          </p>
          <p className="text-xs font-thin pt-2">
            ** The longer the description the higher the likelihood of a larger
            gas fees for deploying the contract will occur. Please keep that in
            mind when creating a description
          </p>
        </div>
      </form>
    </div>
  );
};

export default CampaignField;
