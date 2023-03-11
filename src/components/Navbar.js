import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav class="bg-transparent border-[#223843] px-2 sm:px-4 py-2.5 rounded ">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <NavLink to="/">
            <div class="flex items-center">
              <img src={logo} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-[#223843]">
                CrowdGaming
              </span>
            </div>
          </NavLink>

          <div
            class="hidden w-full md:block md:w-auto text-[#223843]"
            id="navbar-default"
          >
            <ul class="flex flex-col p-4 mt-4 border border-[#223843] rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium  bg-transparent">
              <li>
                <NavLink to="new_campaign">
                  <p class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-teal-600 ">
                    Create A Campaign
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="campaigns">
                  <p class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-teal-600 ">
                    Campaigns
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="mission">
                  <p class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-teal-600">
                    Mission
                  </p>
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-teal-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
