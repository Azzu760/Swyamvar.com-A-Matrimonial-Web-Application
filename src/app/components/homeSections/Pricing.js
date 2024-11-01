"use client";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const toggleSubscription = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="py-10 sm:py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">Pricing</h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8">
          Join our matrimonial service and find your perfect match. Choose the
          plan that best suits your needs!
        </p>

        {/* Toggle Button */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <button
            className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-l-lg ${
              !isYearly ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={toggleSubscription}
          >
            Monthly
          </button>
          <button
            className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-r-lg ${
              isYearly ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={toggleSubscription}
          >
            Yearly
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
            {/* Free Plan Card */}
            <div className="bg-dark-gray shadow-lg rounded-lg p-4 sm:p-6 flex flex-col w-72 sm:w-80 h-96">
              <div>
                <div className="bg-red-500 h-1 rounded-t-lg" />
                <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                  Free Membership
                </h3>
                <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
                  Free
                </p>
                <p className="text-sm sm:text-lg mb-1 sm:mb-2">
                  Access to basic features.
                </p>
                <ul className="list-none mb-2 sm:mb-4 text-sm sm:text-base">
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Profile Creation
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Basic Matches
                  </li>
                  <li className="flex items-center">
                    <FaTimesCircle className="text-red-500 mr-2" />
                    Unlimited Messaging
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Access to Community Forums
                  </li>
                  <li className="flex items-center">
                    <FaTimesCircle className="text-red-500 mr-2" />
                    No Profile Highlights
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex justify-center">
                <a
                  href="/register"
                  className="bg-transparent border border-gray-300 text-white py-2 px-4 rounded-lg text-sm sm:text-base"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Premium Plan Card */}
            <div className="bg-dark-gray shadow-lg rounded-lg p-4 sm:p-6 flex flex-col w-72 sm:w-80 h-96">
              <div>
                <div className="bg-green-500 h-1 rounded-t-lg" />
                <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                  Premium Membership
                </h3>
                <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
                  {isYearly ? "$199/year" : "$19/month"}
                </p>
                <p className="text-sm sm:text-lg mb-1 sm:mb-2">
                  {isYearly
                    ? "Save 20% with Yearly Plan!"
                    : "Unlock full features!"}
                </p>
                <ul className="list-none mb-2 sm:mb-4 text-sm sm:text-base">
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Unlimited Messaging
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Advanced Matching
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Access to Premium Profiles
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    See who viewed your profile
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Profile Highlights
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Access to Exclusive Events
                  </li>
                </ul>
              </div>
              <div className="mt-auto flex justify-center">
                <a
                  href="/payment"
                  className="bg-transparent border border-gray-300 text-white py-2 px-4 rounded-lg text-sm sm:text-base"
                >
                  Subscribe Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
