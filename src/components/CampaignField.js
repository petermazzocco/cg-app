import React from "react";

const CampaignField = () => {
  return (
    <div className="grid justify-center h-screen place-items-center w-ful mx-5 ">
      <form className="space-y-8">
        <div>
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-black"
          >
            Campaign Name
          </label>
          <input
            type="text"
            placeholder="My Campaign"
            id="default-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-1/2 p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
          />
        </div>
        <div className="">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-black"
          >
            Campaign Goal
          </label>
          <div className="flex flex-row align-middle">
            <input
              type="text"
              placeholder="3"
              id="default-input"
              class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
            />
            <p className="pl-2">ETH</p>
          </div>
          <div class="relative max-w-sm">
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
              datepicker
              type="text"
              class="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <div>
          <label for="message" class="block  text-sm font-medium text-black">
            Description <span className="text-xs font-thin">**</span>
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please give a detail description of your campaign."
            maxLength="4000"
          ></textarea>
          <p className="text-xs font-thin">Max 4000 characters</p>
        </div>
        <div className="w-1/3">
          <button className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md">
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
