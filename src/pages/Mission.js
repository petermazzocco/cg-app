import React from "react";
import { motion } from "framer-motion";

const Mission = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="grid place-items-center content-center text-[#223843]"
    >
      <div className="w-1/2 space-y-10 pt-10 pb-10">
        <p class="mb-3 font-light text-[#223843]  first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900  first-letter:mr-3 first-letter:float-left">
          Welcome to CrowdGaming, a crowd funding platform dedicated to helping
          gamers and streamers around the world get the gaming and streaming
          equipment they need to pursue their passion.
        </p>
        <p class="font-light ">
          Our mission is to provide a platform where gamers and streamers who
          can't afford the necessary equipment to create campaigns to raise the
          funds they need. We believe that everyone should have the opportunity
          to pursue their passion, and we aim to make that a reality for those
          who might not have the means to do so.
        </p>
        <p class="font-light ">
          Our platform utilizes blockchain technology, which allows for fast and
          secure transactions that can be made from anywhere in the world. This
          means that our users can receive support from a global community of
          fellow gamers and streamers who are passionate about helping others
          achieve their goals. We understand that cyptocurrencies and blockchain
          technology might be viewed as a negative with gamers, but this using
          it is vital in providing access globally.
        </p>
        <p class="font-light ">
          At CrowdGaming, we believe in the power of community and the
          importance of supporting each other in pursuing our passions. We are
          committed to providing a safe, reliable, and transparent platform
          where gamers and streamers can connect with supporters and raise the
          funds they need to make their dreams a reality
        </p>
        <p class="font-light ">
          Join us in our mission to make gaming and streaming accessible to
          everyone. Create a campaign, support a campaign, or simply spread the
          word about CrowdGaming to help us build a global community of
          passionate gamers and streamers. Let's work together to help each
          other achieve our goals and pursue our passions!
        </p>
      </div>
    </motion.div>
  );
};

export default Mission;
