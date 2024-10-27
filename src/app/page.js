"use client";
import {
  FaHeart,
  FaLightbulb,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

// Navbar Component
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-gray text-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between h-16">
        <div className="flex items-center">
          <FaHeart className="text-red-500 h-6 w-6 mr-2" />
          <div className="text-xl sm:text-2xl font-bold">
            <a href="/">Swyamvar.com</a>
          </div>
        </div>
        <a
          href="/login"
          className="bg-red-500 hover:bg-red-600 text-white text-base sm:text-lg py-2 px-6 sm:px-8 rounded-lg font-medium"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

// Hero Section Component
export function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[70vh] sm:h-screen pt-16"
      style={{
        backgroundImage: "url('/HeroBackground.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 max-w-10xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center h-full">
        <div className="text-left text-slate-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Soulmate
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6">
            Join millions in the quest for love and companionship.
          </p>
          <a
            href="/register"
            className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm sm:text-lg py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}

// About Us Component
export function AboutUs() {
  return (
    <section className="relative bg-black min-h-screen py-8 px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-center rounded-md">
      <div className="lg:w-1/2 text-white text-justify">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          About Us
        </h1>
        <p className="text-base sm:text-lg mb-3 sm:mb-4 text-gray-300">
          Swyamvar.com is dedicated to connecting individuals seeking meaningful
          relationships. Our platform provides a safe space where people can
          find true companionship based on shared values and interests.
        </p>
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Innovation</h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4">
            Our pioneering approach combines cutting-edge technology with
            traditional matchmaking principles to offer a unique and effective
            solution for finding meaningful relationships.
          </p>
          <hr className="border-t border-gray-600" />
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Customer-Centric
          </h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4 text-gray-300">
            We are committed to providing our clients with exceptional service,
            ensuring privacy and security while fostering genuine connections
            based on compatibility and shared values.
          </p>
          <hr className="border-t border-gray-600" />
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Expertise</h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4 text-gray-300">
            Our team of experienced professionals brings a wealth of knowledge
            in relationship dynamics, technology, and customer service, ensuring
            a high-quality experience for every user.
          </p>
          <hr className="border-t border-gray-600" />
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Integrity</h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4 text-gray-300">
            Transparency and honesty are at the core of our values, guiding
            every decision we make and fostering trust and integrity in all our
            interactions.
          </p>
          <hr className="border-t border-gray-600" />
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
        <img
          src="/AboutUs.jpg"
          alt="About Us"
          className="rounded-sm w-full sm:w-2/3 md:w-1/2 lg:w-3/5"
        />
      </div>
    </section>
  );
}

// Feature Component
export function Feature() {
  const [flipped, setFlipped] = useState(Array(3).fill(false));

  const features = [
    {
      icon: <FaHeart className="text-white text-3xl sm:text-4xl" />,
      title: "Perfect Match",
      description1: "Compatibility",
      description2:
        "We use advanced algorithms to find the perfect match. Our unique approach ensures that you are matched based on your true values, interests, and personality traits, helping you find a meaningful connection that goes beyond surface-level attraction. By understanding your preferences and desires, we provide you with compatible matches.",
      bgColor: "bg-red-500",
    },
    {
      icon: <FaLightbulb className="text-white text-3xl sm:text-4xl" />,
      title: "Expert Suggestion",
      description1: "Recommendations",
      description2:
        "Receive expert advice and personalized suggestions based on your profile. Our team of relationship experts ensures you get valuable insights and tips to improve your dating experience. Whether you're looking for conversation starters, date ideas, or guidance on how to strengthen your connection with potential matches, we’ve got you covered.",
      bgColor: "bg-yellow-500",
    },
    {
      icon: <FaSearch className="text-white text-3xl sm:text-4xl" />,
      title: "Preference Based Search",
      description1: "Custom Search",
      description2:
        "Search for your ideal partner based on detailed preferences. Our advanced filtering options allow you to fine-tune your search results, bringing you closer to your soulmate. You can specify your ideal match's interests, lifestyle, and values, ensuring that your search is tailored to your unique desires and goals in a relationship.",
      bgColor: "bg-blue-500",
    },
  ];

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <section className="py-10 sm:py-16 mt-10 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-10">
          Our Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          {features.map((feature, index) => (
            <div key={index} className="relative w-full p-6 sm:p-8">
              <div
                className={`card h-80 sm:h-96 bg-dark-gray p-6 sm:p-8 rounded-lg shadow-lg`}
              >
                {flipped[index] ? (
                  <>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-left">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base mb-4 text-left text-justify">
                      {feature.description2}
                    </p>
                    <button
                      onClick={() => handleFlip(index)}
                      className="mt-auto inline-flex items-center text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Go Back <FiArrowLeft className="ml-2" />
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className={`flex justify-center items-center ${feature.bgColor} w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-md`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-left">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 text-left">
                      {feature.description1}
                    </p>
                    <p className="text-sm sm:text-base mb-4 text-left">
                      {feature.description2.slice(0, 80)}...
                    </p>
                    <button
                      onClick={() => handleFlip(index)}
                      className="mt-auto inline-flex items-center text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Read More <FiArrowRight className="ml-2" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <a
            href="/features"
            className="inline-block bg-red-500 hover:bg-red-600 text-white text-base sm:text-lg py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors duration-200"
          >
            Explore All Features
          </a>
        </div>
      </div>
    </section>
  );
}

// Pricing Section Component
export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const toggleSubscription = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

// Footer Component
export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
    setEmail("");
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
            onSubmit={handleSubscribe}
            className="flex justify-center items-center"
          >
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 text-gray-500 sm:px-6 sm:py-3 rounded-l-full focus:outline-slate-500 w-48 sm:w-64 md:w-80"
                required
              />
              <button
                type="submit"
                className="bg-red-500 px-4 py-2 sm:px-6 sm:py-3 rounded-r-full hover:bg-red-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Logo and Company Name with Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <FaHeart className="text-red-500 h-6 w-6 sm:h-8 sm:w-8" />{" "}
            {/* Heart Icon */}
            <h1 className="text-xl sm:text-2xl font-bold">Swyamvar.com</h1>
          </div>
          <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            <a href="/pricing" className="hover:text-gray-400">
              Pricing
            </a>
            <a href="/about" className="hover:text-gray-400">
              About Us
            </a>
            <a href="/features" className="hover:text-gray-400">
              Features
            </a>
            <a href="/help" className="hover:text-gray-400">
              Help Center
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact Us
            </a>
            <a href="/faqs" className="hover:text-gray-400">
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
              <a href="/privacy" className="hover:text-gray-400">
                {" "}
                Privacy{" "}
              </a>{" "}
              |
              <a href="/terms" className="hover:text-gray-400">
                {" "}
                Terms{" "}
              </a>{" "}
              |
              <a href="/sitemap" className="hover:text-gray-400">
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
            >
              <FaFacebook className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-xl sm:text-2xl hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Feature />
      <Pricing />
      <Footer />
    </>
  );
}
