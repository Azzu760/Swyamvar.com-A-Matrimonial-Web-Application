"use client";

import {
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const subscribeToNewsletter = async (email) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const responseData = await subscribeToNewsletter(email);

      if (responseData.message) {
        setMessage(responseData.message);
      } else {
        setMessage("Thank you for subscribing!");
      }
    } catch (error) {
      setError(true);
      setMessage("Something went wrong. Please try again later.");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <footer className="bg-dark-gray text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Subscription */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <form
            className="flex justify-center items-center"
            onSubmit={handleFormSubmit}
          >
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 text-gray-500 sm:px-6 sm:py-3 rounded-l-full focus:outline-slate-500 w-48 sm:w-64 md:w-80 focus:ring-2 focus:ring-red-500"
                aria-label="Email Address"
                required
              />
              <button
                type="submit"
                className="bg-red-500 px-4 py-2 sm:px-6 sm:py-3 rounded-r-full hover:bg-red-600 transition-colors duration-200"
                aria-label="Subscribe to Newsletter"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
          {message && (
            <p
              className={`mt-4 text-sm ${
                error ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Logo and Company Name with Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <FaHeart
              className="text-red-500 h-6 w-6 sm:h-8 sm:w-8"
              aria-label="Heart Icon"
            />
            <h1 className="text-xl sm:text-2xl font-bold">Swyamvar.com</h1>
          </div>
          <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            <a
              onClick={() => openLinkInNewTab("/pricing")}
              className="cursor-pointer hover:text-gray-400"
            >
              Pricing
            </a>
            <a
              onClick={() => openLinkInNewTab("/about-us")}
              className="cursor-pointer hover:text-gray-400"
            >
              About Us
            </a>
            <a
              onClick={() => openLinkInNewTab("/features")}
              className="cursor-pointer hover:text-gray-400"
            >
              Features
            </a>
            <a
              onClick={() => openLinkInNewTab("/get-help")}
              className="cursor-pointer hover:text-gray-400"
            >
              Help Center
            </a>
            <a
              onClick={() => openLinkInNewTab("/contact")}
              className="cursor-pointer hover:text-gray-400"
            >
              Contact Us
            </a>
            <a
              onClick={() => openLinkInNewTab("/faqs")}
              className="cursor-pointer hover:text-gray-400"
            >
              FAQs
            </a>
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-4" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Language Dropdown */}
          <select className="bg-transparent border border-gray-300 text-white py-2 px-4 rounded-lg text-sm sm:text-base">
            <option className="bg-dark-gray text-white" value="en">
              English
            </option>
            <option className="bg-dark-gray text-white" value="es">
              Español
            </option>
            <option className="bg-dark-gray text-white" value="fr">
              Français
            </option>
          </select>

          {/* Copyright and Links */}
          <div className="text-center text-xs sm:text-sm">
            <p>
              © 2024 Swyamvar.com. All rights reserved. |
              <a
                onClick={() => openLinkInNewTab("/privacy")}
                className="cursor-pointer hover:text-gray-400"
              >
                {" "}
                Privacy{" "}
              </a>{" "}
              |
              <a
                onClick={() => openLinkInNewTab("/terms")}
                className="cursor-pointer hover:text-gray-400"
              >
                {" "}
                Terms{" "}
              </a>{" "}
              |
              <a
                onClick={() => openLinkInNewTab("/sitemap")}
                className="cursor-pointer hover:text-gray-400"
              >
                {" "}
                Sitemap{" "}
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
