import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-max">
      <footer class="p-4 bg-transparent rounded-lg shadow md:px-6 md:py-8 text-black">
        <div class="sm:flex sm:items-center sm:justify-between">
          <NavLink to="/">
            <div class="flex items-center mb-4 sm:mb-0">
              <span class="self-center text-2xl font-semibold whitespace-nowrap ">
                CrowdGaming
              </span>
            </div>
          </NavLink>
          <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-600 sm:mb-0 ">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Terms & Service
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">
                Legal
              </a>
            </li>
            <li>
              <a
                href="https://github.com/petermazzocco"
                target="_blank"
                rel="noreferrer"
                class="hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Peter Mazzocco™{" "}
          </a>
          | All Rights Reserved | Created for Alchemy University
        </span>
      </footer>
    </div>
  );
};

export default Footer;
