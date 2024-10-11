import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialMedia = ({ socialMedia, handleChange }) => {
  const socialMediaIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
  };

  const hasLinks = Object.values(socialMedia).some((link) => link !== "");

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Social Media</h4>
      {hasLinks ? (
        <div className="flex justify-around mt-2 mb-4">
          {Object.entries(socialMedia).map(([key, value]) => {
            const Icon = socialMediaIcons[key];
            return (
              value && (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Icon className="text-white" style={{ fontSize: "30px" }} />{" "}
                  {/* Increased size */}
                </a>
              )
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 mt-2">Add your social media links below:</p>
      )}
      <div className="text-sm space-y-2 mt-2">
        {Object.entries(socialMedia).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <label className="capitalize">{key}:</label>
            <input
              type="text"
              className="bg-transparent border-b border-gray-500 focus:outline-none text-white w-1/2"
              value={value}
              onChange={(e) => handleChange("socialMedia", key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
