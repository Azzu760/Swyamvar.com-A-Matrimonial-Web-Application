import React, { useState } from "react";

const VerificationDetails = ({ verificationDetails, handleChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    document: null,
  });
  const [submitted, setSubmitted] = useState(verificationDetails.submitted); // Track submission status

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle submission to admin can be added here.
    console.log("Form submitted:", formData);
    setSubmitted(true); // Set submitted status to true
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Verification Details</h4>
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <label>Verified:</label>
          <input
            type="checkbox"
            className="bg-transparent focus:outline-none text-white"
            checked={verificationDetails.verified}
            onChange={(e) =>
              handleChange("verificationDetails", "verified", e.target.checked)
            }
          />
        </div>

        {!verificationDetails.verified && (
          <div className="mt-4">
            <p className="text-gray-400">
              You are not verified.{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsModalOpen(true)}
              >
                Complete verification process
              </button>
            </p>
          </div>
        )}

        {/* Verification Progress */}
        <div className="mt-4">
          <h5 className="font-semibold">Verification Progress:</h5>
          <div className="flex space-x-4">
            <div
              className={`flex-1 ${
                submitted ? "text-green-500" : "text-gray-400"
              }`}
            >
              Submitted
            </div>
            <div
              className={`flex-1 ${
                verificationDetails.underVerification
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              Under Verification
            </div>
            <div
              className={`flex-1 ${
                verificationDetails.verified
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              Successfully Verified
            </div>
          </div>
          <div className="h-1 bg-gray-300">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${
                  verificationDetails.verified
                    ? "100%"
                    : verificationDetails.underVerification
                    ? "66%"
                    : submitted // Change to 33% when submitted
                    ? "33%"
                    : "0%"
                }`,
              }}
            />
          </div>
        </div>

        {/* Verified Badge and Document Photo */}
        {verificationDetails.verified && (
          <div className="mt-4 flex items-center">
            <span className="text-green-500 font-bold">Verified</span>
            {verificationDetails.documentPhoto && (
              <img
                src={verificationDetails.documentPhoto}
                alt="Verified Document"
                className="ml-2 w-12 h-12 object-cover border border-gray-500 rounded"
              />
            )}
          </div>
        )}
      </div>

      {/* Modal for Verification Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-dark-gray p-4 rounded shadow-md w-1/3">
            <h5 className="font-semibold">Complete Verification</h5>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4 mt-2">
                <label htmlFor="fullName" className="text-white text-left">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Name must match with the ID"
                  className="bg-transparent border-b border-gray-500 focus:outline-none text-white"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                />

                <label htmlFor="document" className="text-white text-left">
                  Upload Document (ID Card, Passport, Driving Licence,
                  Citizenship)
                </label>
                <input
                  id="document"
                  type="file"
                  name="document"
                  className="mt-2"
                  onChange={handleFormChange}
                  required
                />

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    className="bg-gray-500 text-white p-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationDetails;
