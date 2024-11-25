"use client";

import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  const [result, setResult] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "7e0c3506-e188-45d8-a769-d93c321f8cb1");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        setResult(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setResult("Unable to submit the form. Please try later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-10 px-5 sm:px-10 lg:px-20">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Have questions or need assistance? Feel free to reach out to us using
          the form below or through our contact details.
        </p>

        {/* Contact Form and Details */}
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2">
          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            className="bg-dark-gray p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-400 mb-2 font-medium"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-400 mb-2 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-400 mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg text-white transition duration-200 ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Contact Information</h2>
            <p className="text-gray-300">
              Feel free to visit us or reach out via phone or email. We’d love
              to hear from you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-red-500 text-xl" />
                <span className="text-gray-300">+91 9569759971</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-red-500 text-xl" />
                <span className="text-gray-300">support@swyamvar.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <span className="text-gray-300">
                  751024 Patia, Bhubaneswar, Odisha, India
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <FaFacebook size={28} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <FaTwitter size={28} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <FaLinkedin size={28} />
                </a>
              </div>
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
        </div>
      </footer>
    </div>
  );
}
