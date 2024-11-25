import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const SocialMedia = ({
  userId,
  facebookLink,
  instagramLink,
  twitterLink,
  handleChange,
}) => {
  const [inputLinks, setInputLinks] = useState({
    facebook: facebookLink || "",
    twitter: twitterLink || "",
    instagram: instagramLink || "",
  });

  const [isEditing, setIsEditing] = useState({
    facebook: false,
    twitter: false,
    instagram: false,
  });

  // Handle input change for each social link
  const handleInputChange = (e, platform) => {
    setInputLinks((prev) => ({
      ...prev,
      [platform]: e.target.value,
    }));
  };

  // Toggle edit mode and save changes
  const toggleEditMode = async (platform) => {
    if (isEditing[platform]) {
      // Map frontend platform names to backend field names
      const platformMapping = {
        facebook: "facebookLink",
        twitter: "twitterLink",
        instagram: "instagramLink",
      };

      const backendPlatform = platformMapping[platform]; // Get correct field name

      // Save updated link to the database
      try {
        const response = await fetch("/api/updateSocialLinks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            platform: backendPlatform, // Use correct field name here
            link: inputLinks[platform],
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Error: ${errorMessage}`);
          throw new Error("Failed to update link");
        }

        // Update parent component after successful update
        handleChange(inputLinks);
      } catch (error) {
        console.error("Error updating link:", error);
      }
    }

    // Toggle the edit mode for the platform
    setIsEditing((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  // Render each social media link or input field with edit/save button
  const renderSocialMediaLink = (link, platform) => (
    <div
      key={platform}
      className="flex items-center justify-between space-x-3 text-gray-800 mb-2 p-2 rounded-lg bg-gray-100 shadow-sm"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-gray-800 no-underline"
      >
        {platform === "facebook" && (
          <FaFacebook className="text-2xl text-blue-600" />
        )}
        {platform === "twitter" && (
          <FaTwitter className="text-2xl text-blue-400" />
        )}
        {platform === "instagram" && (
          <FaInstagram className="text-2xl text-pink-600" />
        )}
      </a>

      {isEditing[platform] ? (
        <input
          type="text"
          value={inputLinks[platform]}
          onChange={(e) => handleInputChange(e, platform)}
          placeholder={`Enter ${platform} link`}
          className="ml-3 p-2 border border-gray-300 rounded-md w-3/4 text-sm"
        />
      ) : (
        <span className="ml-3 text-sm">{link}</span>
      )}

      <button
        onClick={() => toggleEditMode(platform)}
        className="ml-3 p-2 rounded-md text-sm text-gray-800 hover:text-green-500"
      >
        {isEditing[platform] ? <FaSave /> : <FaEdit />}
      </button>
    </div>
  );

  return (
    <div className="p-6 rounded-xl bg-white shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Social Media Links
      </h3>
      {renderSocialMediaLink(inputLinks.facebook, "facebook")}
      {renderSocialMediaLink(inputLinks.twitter, "twitter")}
      {renderSocialMediaLink(inputLinks.instagram, "instagram")}
    </div>
  );
};

export default SocialMedia;
