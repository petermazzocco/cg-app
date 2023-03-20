import React from "react";
import { ethers } from "ethers";

const ProgressBar = ({ campaign }) => {
  // calculate the percentage of the goal that has been pledged
  const percentagePledged = (campaign.pledged / campaign.goal) * 100;

  // format the goal and pledged amounts as ether values
  const formattedGoal = ethers.utils.formatEther(campaign.goal.toString());
  const formattedPledged = ethers.utils.formatEther(
    campaign.pledged.toString()
  );

  return (
    <div className="">
      <div
        value={percentagePledged}
        max="100"
        className="w-full rounded-sm h-5 border-2 border-teal-400 bg-gray-300"
      >
        <div
          className="bg-gradient-to-r from-red-200 to-green-500 h-4 rounded-sm"
          style={{ width: `${percentagePledged}%` }}
        ></div>
      </div>
      <p className="pt-2 text-sm">
        {formattedPledged} ETH pledged out of {formattedGoal} ETH goal
      </p>
    </div>
  );
};

export default ProgressBar;
