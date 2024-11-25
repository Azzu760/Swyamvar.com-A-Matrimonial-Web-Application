import React from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

const GetHelp = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-black">
      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-semibold text-center text-white">
          Help Center
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Need assistance? Browse through the topics below or contact our
          support team for more help.
        </p>

        <div className="mt-8 space-y-8">
          {/* Help Topics Section */}
          <div className="bg-dark-gray p-6 rounded-md shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-gray-100">Help Topics</h2>
            <ul className="mt-4 space-y-4 text-gray-300">
              <li className="flex items-center gap-2 hover:text-indigo-400">
                <FaUser className="text-indigo-400" />{" "}
                <span>Create Your Profile</span>
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400">
                <FaQuestionCircle className="text-indigo-400" />{" "}
                <span>Browse & Search Profiles</span>
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400">
                <FaPhoneAlt className="text-indigo-400" />{" "}
                <span>Subscription Plans & Features</span>
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400">
                <FaUser className="text-indigo-400" />{" "}
                <span>Profile Privacy & Security</span>
              </li>
            </ul>
          </div>

          {/* FAQs Section */}
          <div className="bg-dark-gray p-6 rounded-md shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-gray-100">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3 text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-100">
                  How do I create a profile?
                </h3>
                <p>
                  Click on "Create Account," fill in your personal details, and
                  upload a profile picture. Follow the prompts to complete your
                  profile.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-100">
                  Is my profile private?
                </h3>
                <p>
                  Yes, you can control who sees your profile and hide sensitive
                  information using the privacy settings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-100">
                  How can I contact support?
                </h3>
                <p>
                  If you need help, you can reach out to our support team
                  through the contact form below or via email.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="bg-dark-gray p-6 rounded-md shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-gray-100">
              Contact Support
            </h2>
            <p className="mt-4 text-gray-300">
              Our support team is available to assist you. Reach out for any
              queries or issues you might face.
            </p>
            <div className="mt-4 flex items-center gap-3 text-gray-300">
              <FaEnvelope className="text-indigo-400" />
              <span>
                Email:{" "}
                <a
                  href="mailto:support@swyamvar.com"
                  className="text-indigo-400 hover:underline"
                >
                  support@swyamvar.com
                </a>
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-gray-300">
              <FaPhoneAlt className="text-indigo-400" />
              <span>
                Phone:{" "}
                <a
                  href="tel:+919569759971"
                  className="text-indigo-400 hover:underline"
                >
                  +91-9569759971
                </a>
              </span>
            </div>
          </div>
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
};

export default GetHelp;
