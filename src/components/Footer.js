import React from "react";
import { Link } from "react-router-dom";
import x from "../assets/x-twitter.svg";
import instagram from "../assets/instagram.svg";
import fb from "../assets/fb.svg";
import linkedin from "../assets/linkedin.svg";

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#891C69] to-[#6e1455] text-white py-10 text-center">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="" className="text-white hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="" className="text-white hover:text-gray-800">
                About Us
              </Link>
            </li>
            <li>
              <Link to="" className="text-white hover:text-gray-800">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4 ">
          <h4 className="text-lg font-bold text-white">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link to="" className="text-white hover:text-gray-800">
                Menu
              </Link>
            </li>
            <li>
              <Link to="" className="text-white hover:text-gray-800">
                Support
              </Link>
            </li>
            <li>
              <Link to="" className="text-white hover:text-gray-800">
                Geolocator
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Our Socials</h4>
          <ul className="space-y-2">
            <li className="flex items-center justify-center space-x-3">
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
              <Link
                to=""
                className="text-white hover:text-gray-800 w-[5rem]"
              >
                Instagram
              </Link>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <img src={x} alt="Twitter" className="w-6 h-6" />
              <Link
                to=""
                className="text-white hover:text-gray-800 w-[5rem]"
              >
                Twitter
              </Link>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <img src={fb} alt="Facebook" className="w-6 h-6" />
              <Link
                to=""
                className="text-white hover:text-gray-800 w-[5rem]"
              >
                Facebook
              </Link>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
              <Link
                to=""
                className="text-white hover:text-gray-800 w-[5rem]"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-2 text-center text-sm text-white">
        <p>&copy; 2025 All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
