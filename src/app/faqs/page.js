"use client";

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Swyamvar.com?",
      answer:
        "Swyamvar.com is a modern platform designed to connect individuals looking for meaningful relationships, providing tools and features for compatibility and communication.",
    },
    {
      question: "How can I create an account?",
      answer:
        "You can create an account by clicking on the 'Sign Up' button on the homepage, filling in your details, and verifying your email.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, your privacy is our top priority. We use advanced encryption methods to secure your personal information.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "To reset your password, go to the login page, click on 'Forgot Password,' and follow the instructions to reset your password.",
    },
    {
      question: "What are the subscription plans?",
      answer:
        "We offer various subscription plans to suit your needs. Visit our Pricing page for detailed information.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* FAQ Content */}
      <div className="flex-grow py-10 px-5 sm:px-10 lg:px-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-5 hover:bg-gray-700 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h2 className="text-lg sm:text-xl font-semibold">
                  {faq.question}
                </h2>
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="text-gray-300 mt-3">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-gray py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-lg font-semibold text-red-500 mb-2">
            Swyamvar.com
          </h4>
          <p className="text-gray-400 text-sm">
            © 2024 Swyamvar.com. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
