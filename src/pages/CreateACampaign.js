import React from "react";
import MMButton from "../components/MMButton";

const CreateACampaign = () => {
  return (
    <div className="h-screen content-center justify-center grid">
      <div className="text-black grid justify-center place-items-center space-y-6">
        <div className="text-center space-y-3">
          <h1 className="md:text-3xl sm:text-2xl xs:text-xl">
            Create A Campaign
          </h1>
          <p>Ready to fire up a campaign?</p>
          <p>
            Start by connecting your wallet, setting a goal, and filling out the
            description!
          </p>
        </div>
      </div>
      <MMButton />
    </div>
  );
};

export default CreateACampaign;
