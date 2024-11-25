import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-black text-white p-10 space-y-16">
      <h1 className="text-4xl font-semibold text-center mb-12">About Us</h1>

      {/* Company Overview Section */}
      <section className="flex items-center justify-between space-x-10 mb-16">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-red-500 mb-4">
            Our Company
          </h2>
          <p className="text-lg text-gray-400">
            Swyamvar.com was founded with the goal of bridging the gap between
            tradition and technology in the world of matrimonial services. Our
            platform allows individuals to connect with like-minded people,
            share their life goals, and build meaningful relationships.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Swyamvar.com Logo"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="flex items-center justify-between space-x-10 mb-16">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-red-500 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-400">
            At Swyamvar.com, we aim to create meaningful connections by
            combining modern technology with a deep understanding of cultural
            values. Our goal is to help individuals find compatible life
            partners based on mutual respect, shared goals, and understanding.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="flex items-center justify-between space-x-10 mb-16">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-red-500 mb-4">
            Why Choose Us?
          </h2>
          <ul className="space-y-6 text-lg text-gray-400">
            <li>
              <strong>Trusted Platform:</strong> We ensure privacy and security
              for all our users, with measures in place to protect your personal
              information.
            </li>
            <li>
              <strong>Personalized Matches:</strong> Our advanced matchmaking
              system uses your preferences to suggest the best possible partners
              for you.
            </li>
            <li>
              <strong>Global Reach:</strong> Swyamvar.com connects individuals
              from diverse backgrounds, cultures, and locations, giving you a
              wide range of potential partners.
            </li>
            <li>
              <strong>Comprehensive Support:</strong> Our dedicated customer
              support team is always available to assist you with any questions
              or concerns.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1659080538752-ce4e29f2b8ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Why Choose Us"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

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

export default AboutUs;
