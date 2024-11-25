"use client";

import {
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaUserFriends,
  FaMobileAlt,
  FaHandsHelping,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      title: "Smart Matching",
      description:
        "Leverage advanced algorithms to find the most compatible matches for you based on preferences and interests.",
      icon: <FaBolt className="text-red-500 text-3xl" />,
    },
    {
      title: "Privacy & Security",
      description:
        "Your data is safe with us. We ensure your privacy through robust encryption and security measures.",
      icon: <FaShieldAlt className="text-red-500 text-3xl" />,
    },
    {
      title: "Verified Profiles",
      description:
        "Interact with genuine and verified profiles to ensure trust and transparency in every connection.",
      icon: <FaCheckCircle className="text-red-500 text-3xl" />,
    },
    {
      title: "Community Building",
      description:
        "Join communities with shared interests and build lasting friendships with like-minded individuals.",
      icon: <FaUserFriends className="text-red-500 text-3xl" />,
    },
    {
      title: "Mobile Optimized",
      description:
        "Access all features seamlessly on mobile devices, ensuring a smooth user experience on the go.",
      icon: <FaMobileAlt className="text-red-500 text-3xl" />,
    },
    {
      title: "Dedicated Support",
      description:
        "Our support team is available 24/7 to assist you with any issues or questions you may have.",
      icon: <FaHandsHelping className="text-red-500 text-3xl" />,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="py-10 px-5 sm:px-10 lg:px-20 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">Our Features</h1>
        <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Discover the unique features that make Swyamvar.com the perfect
          platform for building meaningful connections.
        </p>

        {/* Features Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:bg-gray-700 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Content */}
        <div className="mt-16 max-w-4xl mx-auto space-y-8 text-gray-300">
          <h2 className="text-3xl font-semibold text-center">Why Choose Us?</h2>
          <p>
            At Swyamvar.com, we aim to create meaningful relationships by
            providing a seamless, secure, and enjoyable matchmaking experience.
            Our cutting-edge technology ensures that you find the right people
            based on your preferences and interests. With a focus on trust and
            transparency, you can feel confident in every interaction.
          </p>
          <p>
            We prioritize your privacy and security, using advanced encryption
            protocols to protect your data. Verified profiles and a robust
            matching algorithm make our platform one of the most reliable in the
            industry. Additionally, our community-building features allow you to
            connect with like-minded individuals, fostering friendships that go
            beyond the screen.
          </p>
          <p>
            Our dedicated support team is always available to assist you with
            any questions or concerns. Whether you're using our platform on a
            mobile device or desktop, you'll enjoy a smooth and optimized user
            experience. Choose Swyamvar.com to start your journey toward
            meaningful connections today.
          </p>
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
