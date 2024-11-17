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
      // Save updated link to the database
      try {
        const response = await fetch("/api/updateSocialLink", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            platform,
            link: inputLinks[platform],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update link");
        }

        handleChange(inputLinks); // update parent component
      } catch (error) {
        console.error("Error updating link:", error);
      }
    }

    setIsEditing((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  // Render each social media link or input field with edit/save button
  const renderSocialMediaLink = (link, platform) => (
    <div
      key={platform}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
        borderRadius: "8px",
        padding: "8px",
        background: "#f9f9f9",
        color: "black",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {platform === "facebook" && (
          <FaFacebook style={{ fontSize: "24px", color: "#3b5998" }} />
        )}
        {platform === "twitter" && (
          <FaTwitter style={{ fontSize: "24px", color: "#1DA1F2" }} />
        )}
        {platform === "instagram" && (
          <FaInstagram style={{ fontSize: "24px", color: "#C13584" }} />
        )}
      </a>

      {isEditing[platform] ? (
        <input
          type="text"
          value={inputLinks[platform]}
          onChange={(e) => handleInputChange(e, platform)}
          placeholder={`Enter ${platform} link`}
          style={{
            marginLeft: "12px",
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "80%",
            fontSize: "14px",
          }}
        />
      ) : (
        <span style={{ marginLeft: "12px", fontSize: "16px" }}>{link}</span>
      )}

      <button
        onClick={() => toggleEditMode(platform)}
        style={{
          marginLeft: "8px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: isEditing[platform] ? "#4CAF50" : "#333",
        }}
      >
        {isEditing[platform] ? <FaSave /> : <FaEdit />}
      </button>
    </div>
  );

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h3 style={{ marginBottom: "20px", fontSize: "20px", color: "#333" }}>
        Social Media Links
      </h3>
      {renderSocialMediaLink(inputLinks.facebook, "facebook")}
      {renderSocialMediaLink(inputLinks.twitter, "twitter")}
      {renderSocialMediaLink(inputLinks.instagram, "instagram")}
    </div>
  );
};

export default SocialMedia;
