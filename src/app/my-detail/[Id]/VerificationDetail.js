import React, { useState } from "react";

const VerificationDetail = ({ verified, userId }) => {
  const [isVerified, setIsVerified] = useState(verified);
  const [verificationText, setVerificationText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change for the verification number
  const handleInputChange = (e) => {
    setVerificationText(e.target.value);
  };

  // Handle form submission to update isVerified status
  const handleSubmit = async () => {
    if (isVerified) {
      // Do not send a request if already verified
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          isVerified: true, // Set isVerified to true when submitting
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update verification status.");
      }

      const data = await response.json();
      console.log("Verification status updated successfully:", data);
      setIsVerified(true); // Update the local state to reflect the change
    } catch (error) {
      console.error("Error during verification update:", error);
      setError("Failed to update verification status. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg ${
        isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      } max-w-md mx-auto shadow-md`}
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isVerified ? "Verified" : "Not Verified"}
      </h2>

      {!isVerified && (
        <div className="w-full text-center">
          <input
            type="text"
            placeholder="Enter Citizenship Number, Aadhaar Number, etc."
            value={verificationText}
            onChange={handleInputChange}
            className="w-full p-3 text-lg rounded-lg mb-4 border border-gray-300"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 bg-green-500 text-white text-lg rounded-lg mb-4 transition-colors disabled:bg-gray-300"
          >
            {submitting ? "Submitting..." : "Submit Verification"}
          </button>
          {error && (
            <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
          )}
        </div>
      )}

      {isVerified && (
        <button
          onClick={() => setIsVerified(false)}
          className="w-full py-3 bg-red-200 text-red-600 text-lg rounded-lg transition-colors"
        >
          Unverify
        </button>
      )}
    </div>
  );
};

export default VerificationDetail;
