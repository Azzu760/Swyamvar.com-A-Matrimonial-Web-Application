"use client";

import React, { useState } from "react";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    astrologicalSign: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    community: "",
    religion: "",
    motherTongue: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (form.password !== form.confirmPassword) {
      setNotification({
        message: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    console.log("Form Submitted:", form);

    // Show loading notification
    setNotification({ message: "Loading...", type: "loading" });

    // Simulating form submission logic (e.g., API call)
    setTimeout(() => {
      // Display success notification
      setNotification({
        message: "Form submitted successfully!",
        type: "success",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login"); // Redirect to the login page
      }, 3000);
    }, 2000); // Simulate loading time for 2 seconds
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Navbar />
        <div className="bg-dark-gray text-white w-full max-w-7xl p-8 rounded-md shadow-lg mt-20 mb-10">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

          {/* Notification Display */}
          {notification.message && (
            <div
              className={`p-4 rounded-md mb-4 flex items-center justify-center ${
                notification.type === "loading"
                  ? "bg-yellow-500"
                  : notification.type === "error"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {notification.type === "loading" ? (
                <span className="mr-2">🔄</span> // Loading spinner emoji
              ) : notification.type === "error" ? (
                <span className="mr-2">❌</span> // Cross mark icon for error
              ) : (
                <span className="mr-2">✔️</span> // Checkmark icon
              )}
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Basic Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
              <div className="flex flex-wrap">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Gender"
                  name="gender"
                  type="select"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  value={form.gender}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Marital Status"
                  name="maritalStatus"
                  type="select"
                  options={[
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                    { value: "divorced", label: "Divorced" },
                    { value: "widowed", label: "Widowed" },
                  ]}
                  value={form.maritalStatus}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Astrological Sign"
                  name="astrologicalSign"
                  type="select"
                  options={[
                    { value: "aries", label: "Aries" },
                    { value: "taurus", label: "Taurus" },
                    { value: "gemini", label: "Gemini" },
                    { value: "cancer", label: "Cancer" },
                    { value: "leo", label: "Leo" },
                    { value: "virgo", label: "Virgo" },
                    { value: "libra", label: "Libra" },
                    { value: "scorpio", label: "Scorpio" },
                    { value: "sagittarius", label: "Sagittarius" },
                    { value: "capricorn", label: "Capricorn" },
                    { value: "aquarius", label: "Aquarius" },
                    { value: "pisces", label: "Pisces" },
                  ]}
                  value={form.astrologicalSign}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
              <div className="flex flex-wrap">
                <InputField
                  label="Country"
                  name="country"
                  type="select"
                  options={[
                    { value: "usa", label: "United States" },
                    { value: "canada", label: "Canada" },
                    { value: "uk", label: "United Kingdom" },
                    // Add more countries as needed
                  ]}
                  value={form.country}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="City"
                  name="city"
                  type="select"
                  options={[
                    { value: "new_york", label: "New York" },
                    { value: "toronto", label: "Toronto" },
                    { value: "london", label: "London" },
                    // Add more cities as needed
                  ]}
                  value={form.city}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
              </div>
            </div>

            {/* Community & Religious Background */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Diversity Details</h2>
              <div className="flex flex-wrap">
                <InputField
                  label="Community"
                  name="community"
                  type="select"
                  options={[
                    { value: "community1", label: "Community 1" },
                    { value: "community2", label: "Community 2" },
                    // Add more communities as needed
                  ]}
                  value={form.community}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Religion"
                  name="religion"
                  type="select"
                  options={[
                    { value: "hinduism", label: "Hinduism" },
                    { value: "christianity", label: "Christianity" },
                    { value: "islam", label: "Islam" },
                    // Add more religions as needed
                  ]}
                  value={form.religion}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Mother Tongue"
                  name="motherTongue"
                  type="select"
                  options={[
                    { value: "english", label: "English" },
                    { value: "spanish", label: "Spanish" },
                    // Add more languages as needed
                  ]}
                  value={form.motherTongue}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
              </div>
            </div>

            {/* Account Credentials */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Account Credentials
              </h2>
              <div className="flex flex-wrap">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="ml-8"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <label>
                I accept the{" "}
                <a href="/terms" className="text-blue-500 underline">
                  terms and conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
