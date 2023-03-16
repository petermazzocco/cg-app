import React from "react";

const CampaignField = (props) => {
  return (
    <div className="grid justify-center h-full place-items-center w-full mx-5 ">
      <form className="space-y-8">
        <div>
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-black"
          >
            Campaign Owner
          </label>
          <input
            type="text"
            placeholder={props.account}
            id="default-input"
            disabled
            className="bg-gray-50 border cursor-not-allowed border-gray-300 text-teal-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-1/2 p-2.5 dark:border-gray-600 dark:placeholder-teal-500  dark:focus:ring-teal-500 dark:focus:border-teal-500"
          />

          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-black"
          >
            Campaign Name
          </label>
          <input
            type="text"
            placeholder="My Campaign"
            id="default-input"
            maxLength="50"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-1/2 p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
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
            Campaign Goal
          </label>
          <input
            type="text"
            placeholder="In ETH"
            id="default-input"
            className="bg-gray-50 w-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
          />
          <div className="relative max-w-sm">
            <label
              for="default-input"
              className="block mb-2 text-sm font-medium text-black"
            >
              Start On
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
              placeholder="Select a date that is in the future."
            />
          </div>
          <div className="relative max-w-sm">
            <label
              for="default-input"
              className="block mb-2 text-sm font-medium text-black"
            >
              End On
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
              placeholder="Select date that is less than 30 days from the start date."
            />
          </div>
        </div>
        <div>
          <label
            for="message"
            className="block  text-sm font-medium text-black"
          >
            Description <span className="text-xs font-thin">**</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please give a detail description of your campaign."
            maxLength="4000"
          ></textarea>
          <p className="text-xs font-thin">
            Max 2000 characters. The transaction will fail if you go over 2000.
          </p>
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
