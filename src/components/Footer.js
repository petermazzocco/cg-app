import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-max">
      <footer className="p-4 bg-transparent rounded-lg shadow md:px-6 md:py-8 text-black">
        <div className="sm:flex sm:items-center sm:justify-between">
          <NavLink to="/">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                CrowdGaming
              </span>
            </div>
          </NavLink>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-600 sm:mb-0 ">
            <NavLink to="terms">
              <li>
                <p className="mr-4 hover:underline md:mr-6">Terms & Service</p>
              </li>
            </NavLink>
            <li>
              <a
                href="https://goerli.etherscan.io/address/0x882978f7Afef5bc38c73461f4Bf096e5dF03Ef5C"
                target="_blank"
                rel="noreferrer"
              >
                <p className="mr-4 hover:underline md:mr-6">Contract</p>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/petermazzocco"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <p className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 SB Labs LLC™ | All Rights Reserved | Created for Alchemy
          University
        </p>
      </footer>
    </div>
  );
};

export default Footer;
