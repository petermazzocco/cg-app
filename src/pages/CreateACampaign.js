import React from "react";
import MMButton from "../components/MMButton";
import { motion } from "framer-motion";

const CreateACampaign = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="h-screen content-center justify-center grid"
    >
      <div className="text-black grid justify-center place-items-center space-y-6">
        <div className="text-center space-y-3">
          <h1 className="md:text-3xl sm:text-2xl xs:text-xl">
            Create A Campaign
          </h1>
          <p>Ready to fire up a campaign?</p>
        </div>
      </div>
      <MMButton />
    </motion.div>
  );
};

export default CreateACampaign;
