import { useState, useEffect } from "react";
import logo from "../img/logo2.png";
import DonateToDev from "../components/DonateToDev";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { contract } from "../utils/configs";

const Index = () => {
  const [numOfCampaigns, setNumOfCampaigns] = useState("");
  // Get total campaigns
  useEffect(() => {
    async function getTotalCampaigns() {
      const campaigns = await contract.totalCampaigns();
      setNumOfCampaigns(campaigns);
    }
    getTotalCampaigns();
  }, []);
  return (
    <div className="min-h-screen">
      <div className=" px-24 pt-48 text-black">
        <div className="md:grid md:grid-cols-2 md:gap-48 xs:gap-12 xs:grid-rows-1">
          <div className="md:col-span-1 xs:row-span-1 space-y-4 xs:text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
            >
              CrowdGaming{" "}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className=" xs:text-xs sm:text-sm md:text-md font-normal  lg:text-xl"
            >
              Funding gamers and streamers all around the world. Create and
              support campaigns utilizing blockchain technology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-row justify-center space-x-10"
            >
              <NavLink to="new_campaign">
                <button className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md">
                  Get Started
                </button>
              </NavLink>
              <NavLink to="campaigns">
                <button className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md">
                  Campaigns
                </button>
              </NavLink>
            </motion.div>
          </div>
          <div className="md:col-span-1 xs:row-span-1 justify-center grid place-items-center xs:pt-10 md:pt-0">
            <img src={logo} className="w-1/3" alt="logo" />
            <NavLink to="campaigns">
              <p className="font-bold sm:text-xl md:text-2xl pt-2">
                Total Campaigns:{" "}
                <span className="text-teal-600">
                  {numOfCampaigns.toString()}
                </span>
              </p>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="grid place-items-center pt-40 space-y-8 pl-10 pr-10">
        <h1 className="text-center text-2xl">What are we trying to solve?</h1>
        <div className="md:flex md:flex-row md:justify-evenly text-center md:w-full xs:grid xs:grid-cols-1 gap-24">
          <div className="grid grid-cols-1">
            <h2 className="text-3xl font-black text-gray-400">2.9 billion </h2>
            <p>Gamers Worldwide</p>
          </div>
          <div className="grid grid-cols-1">
            <h2 className="text-3xl font-black text-gray-400">70%</h2>
            <p>of gamers play on Console or PC</p>
          </div>
          <div className="grid grid-cols-1">
            <h2 className="text-3xl font-black text-gray-400">62%</h2>
            <p>The price increase of gaming </p>
            <p>equipment from 2019-2021</p>
          </div>
          <div className="grid grid-cols-1">
            <h2 className="text-3xl font-black text-gray-400">1</h2>
            <p>form of global currency </p>
          </div>
        </div>
      </div>
      <div className="p-10 text-black">
        <p className="mb-3 font-light ">
          The increasing popularity of video games worldwide has led to a surge
          in demand for gaming equipment, such as gaming consoles, graphics
          cards, and high-performance computers. As a result, gamers around the
          world are struggling to keep up with the rising costs of these
          essential tools. The average price of a gaming computer, for example,
          can range from several hundred to several thousand dollars, depending
          on the specifications.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <p className="mb-3 font-light ">
            Moreover, as the video game industry continues to grow, game
            developers are releasing more graphically demanding games that
            require the latest hardware to run smoothly. This means that gamers
            who want to enjoy the latest games at their full potential may have
            to upgrade their equipment more frequently, which can be a
            significant financial burden.
          </p>
          <p className="mb-3 font-light ">
            Additionally, crowdfunding platforms may not support global
            campaigns due to limitations in accepting donations from other
            countries and requiring payment systems supported in specific
            regions. This can be a significant barrier for creators or causes
            based in countries without access to international payment systems.
            This is where cryptocurrency comes in, it is considered the Global
            currency.
          </p>
        </div>
        <p className="mb-3 font-light ">
          The increasing demand for gaming equipment due to the rising
          popularity of video games has made it difficult for gamers worldwide
          to keep up with the increasing costs of gaming tools. This is
          exacerbated by the release of graphically demanding games that require
          the latest hardware, leading gamers to upgrade their equipment
          frequently, resulting in a significant financial burden. Furthermore,
          traditional crowdfunding platforms may not support global campaigns
          due to limitations in accepting donations from other countries and
          requiring payment systems supported in specific regions.
          Cryptocurrency can be a viable solution for these limitations, as it
          is considered a global currency. This is why our mission is to provide
          gamers all over the world with the ability to create a campaign.
        </p>
      </div>
      <div className="grid justify-center pt-5 pb-10 ">
        <div className="text-center grid grid-cols-1 space-y-4">
          <h1 className="font-bold">Ready To Commit?</h1>
          <NavLink to="campaigns">
            <button className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md">
              Campaigns
            </button>
          </NavLink>
        </div>
      </div>
      <DonateToDev />
    </div>
  );
};

export default Index;
