import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"; // You can use any icon you prefer

const VerificationDetail = ({ verified, userId }) => {
  const [isVerified, setIsVerified] = useState(verified);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // Handle file upload to the server
  const uploadFile = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const response = await fetch("/api/uploadVerificationImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      setIsVerified(true);

      const verificationResponse = await fetch(
        "/api/updateVerificationStatus",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            isVerified: true,
          }),
        }
      );

      if (!verificationResponse.ok) {
        throw new Error("Failed to update verification status");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setError("There was an error uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: isVerified ? "#e6f9e6" : "#fbe3e4",
        color: isVerified ? "#4CAF50" : "#D32F2F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "16px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {isVerified ? "Verified" : "Not Verified"}
      </h2>

      {!isVerified && (
        <div style={{ width: "100%", textAlign: "center" }}>
          {/* Custom File Input Styling */}
          <label
            htmlFor="file-upload"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontSize: "16px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              textAlign: "center",
              transition: "background-color 0.3s ease",
              marginBottom: "16px",
              boxSizing: "border-box",
              justifyContent: "center", // Center the icon and text
            }}
          >
            <FaCloudUploadAlt
              style={{
                marginRight: "8px", // Space between icon and text
                fontSize: "20px",
              }}
            />
            Choose Image for Verification
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              display: "none", // Hide the default file input
            }}
          />
          {file && (
            <p
              style={{
                color: "#333",
                fontSize: "14px",
                marginTop: "8px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Selected File: {file.name}
            </p>
          )}
          <button
            onClick={uploadFile}
            disabled={uploading}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
              marginBottom: "16px",
              transition: "background-color 0.3s",
            }}
          >
            {uploading ? "Uploading..." : "Upload Image for Verification"}
          </button>
          {error && (
            <p
              style={{
                color: "#D32F2F",
                fontSize: "14px",
                marginTop: "8px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
        </div>
      )}

      {isVerified && (
        <button
          onClick={() => setIsVerified(false)}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#f8d7da",
            color: "#D32F2F",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.3s",
          }}
        >
          Unverify
        </button>
      )}
    </div>
  );
};

export default VerificationDetail;
