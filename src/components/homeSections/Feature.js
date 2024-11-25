"use client";
import { useState } from "react";
import { FaHeart, FaLightbulb, FaSearch, FaComments } from "react-icons/fa";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function Feature() {
  const [flipped, setFlipped] = useState(Array(4).fill(false));

  const features = [
    {
      icon: <FaHeart className="text-white text-3xl sm:text-4xl" />,
      title: "Perfect Match",
      description1: "Compatibility",
      description2:
        "We use advanced algorithms to find the perfect match. Our unique approach ensures that you are matched based on your true values, interests, and personality traits, helping you find a meaningful connection that goes beyond surface-level attraction.",
      bgColor: "bg-red-500",
    },
    {
      icon: <FaLightbulb className="text-white text-3xl sm:text-4xl" />,
      title: "Expert Suggestion",
      description1: "Recommendations",
      description2:
        "Receive expert advice and personalized suggestions based on your profile. Our team of relationship experts ensures you get valuable insights and tips to improve your dating experience. Whether you're looking for conversation starters, date ideas, or guidance, we’ve got you covered.",
      bgColor: "bg-yellow-500",
    },
    {
      icon: <FaSearch className="text-white text-3xl sm:text-4xl" />,
      title: "Preference Based Search",
      description1: "Custom Search",
      description2:
        "Search for your ideal partner based on detailed preferences. Our advanced filtering options allow you to fine-tune your search results, bringing you closer to your soulmate. Specify interests, lifestyle, and values, ensuring that your search is tailored to your unique desires.",
      bgColor: "bg-blue-500",
    },
    {
      icon: <FaComments className="text-white text-3xl sm:text-4xl" />,
      title: "Real-Time Chat",
      description1: "Instant Communication",
      description2:
        "Connect with potential matches instantly using our real-time chat feature. Share your thoughts, ask questions, and build a connection in a seamless and secure environment. Our chat feature ensures privacy and responsiveness, giving you the confidence to engage with your matches effortlessly.",
      bgColor: "bg-green-500",
    },
  ];

  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  return (
    <section className="py-10 sm:py-16 mt-10 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-10">
          Our Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="relative w-full p-6 sm:p-8">
              <div
                className={`card bg-dark-gray p-6 sm:p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                  flipped[index] ? "h-full" : "h-80 sm:h-96"
                }`}
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
