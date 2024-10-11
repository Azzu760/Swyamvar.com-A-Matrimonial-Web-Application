import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-4">
      <div className="flex justify-center items-center">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 text-white bg-gray-800 p-1.5 rounded-full hover:text-gray-400"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 text-white bg-gray-800 p-1.5 rounded-full hover:text-gray-400"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 text-white bg-gray-800 p-1.5 rounded-full hover:text-gray-400"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 text-white bg-gray-800 p-1.5 rounded-full hover:text-gray-400"
        >
          <FaLinkedinIn size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
