import React from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

const Campaign = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className=""
    >
      <div className="space-y-10 text-left xs:px-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
              Name:
            </h2>
            <p>{props.title}</p>
          </div>
          <div className="col-span-1">
            <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
              Owner:
            </h2>
            <p>{props.owner}</p>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
                Campaign Progress:
              </h2>
              <ProgressBar campaign={props.campaign} />
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
              Starts On:
            </h2>
            <p>{props.startDate}</p>
          </div>
          <div className="col-span1">
            <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
              Ends On:
            </h2>
            <p>{props.endDate}</p>
          </div>
          <div className="col-span-2">
            <h2 className="xs:text-md lg:text-lg xl:text-xl text-teal-600">
              Description:
            </h2>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Campaign;
