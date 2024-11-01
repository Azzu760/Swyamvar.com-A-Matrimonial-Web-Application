"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/dashboardSections/Navbar";
import { useRouter } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing social media icons

const LoginPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Load saved credentials if available
  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (savedCredentials) {
      setValue("email", savedCredentials.email);
      setValue("password", savedCredentials.password);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);

    setNotification({ message: "Loading...", type: "loading" });

    // Simulate login logic (e.g., API call)
    setTimeout(() => {
      setNotification({ message: "Logged in successfully!", type: "success" });

      // Save credentials if "Remember Me" is checked
      if (data.rememberMe) {
        localStorage.setItem(
          "credentials",
          JSON.stringify({
            email: data.email,
            password: data.password,
          })
        );
      } else {
        localStorage.removeItem("credentials");
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-dark-gray text-white w-full max-w-md p-8 rounded-md shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

            {notification.message && (
              <div
                className={`p-4 rounded-md mb-4 flex items-center justify-center ${
                  notification.type === "loading"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {notification.type === "loading" ? (
                  <span className="mr-2">🔄</span>
                ) : (
                  <span className="mr-2">✔️</span>
                )}
                {notification.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`bg-dark-gray text-white px-3 py-2 rounded border ${
                  errors.email ? "border-red-500" : "border-gray-400"
                } outline-none focus:border-gray-500`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`bg-dark-gray text-white px-3 py-2 rounded border ${
                  errors.password ? "border-red-500" : "border-gray-400"
                } outline-none focus:border-gray-500`}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <div className="flex justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
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
        {/* Footer Section Integrated Inside LoginPage */}
        <footer className="bg-black text-white py-4">
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-center mt-2">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
