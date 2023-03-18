import MMButton from "../components/MMButton";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import CrowdGaming from "../artifacts/contracts/CrowdGaming.sol/CrowdGaming.json";

//Contract address
const contractAddress = "0x882978f7Afef5bc38c73461f4Bf096e5dF03Ef5C";

const AllCampaigns = () => {
  const [campaign, setCampaign] = useState();

  // Web3 connection
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    CrowdGaming.abi,
    provider
  );

  // Get campaign by ID
  async function getCampaigns(e) {
    e.preventDefault();
    const id = document.getElementById("id").value;
    // ethers contract METHODS
    const campaign = await contract.campaigns(id);
    setCampaign(campaign);
    console.log(JSON.stringify(campaign));
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
        {/*<p>Name: {campaign.title}</p>
        <p>Description: {campaign.description}</p>
        <p>Owner: {campaign.owner}</p>
        <p>Goal:{campaign.goal.toHexString()}</p>*/}
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    </div>
  );
};

export default AllCampaigns;
