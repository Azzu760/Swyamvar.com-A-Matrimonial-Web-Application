"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);

    // Show loading notification
    setNotification({ message: "Loading...", type: "loading" });

    // Simulating login logic (e.g., API call)
    setTimeout(() => {
      // Display success notification
      setNotification({ message: "Logged in successfully!", type: "success" });

      // Redirect to homepage or dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to the dashboard
      }, 2000);
    }, 2000); // Simulate loading time for 2 seconds
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Navbar />
        <div className="bg-dark-gray text-white w-full max-w-md p-8 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          {/* Notification Display */}
          {notification.message && (
            <div
              className={`p-4 rounded-md mb-4 flex items-center justify-center ${
                notification.type === "loading"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {notification.type === "loading" ? (
                <span className="mr-2">🔄</span> // Loading spinner emoji
              ) : (
                <span className="mr-2">✔️</span> // Checkmark icon
              )}
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="bg-dark-gray text-white px-3 py-2 rounded border border-gray-400 outline-none focus:border-gray-500"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="bg-dark-gray text-white px-3 py-2 rounded border border-gray-400 outline-none focus:border-gray-500"
            />

            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <div className="flex items-center">
                <a href="/resetPassword" className="text-white">
                  Forget Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-400">
              Register here
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
