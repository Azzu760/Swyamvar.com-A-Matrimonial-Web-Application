"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/dashboardSections/Navbar";
import LoginForm from "../../../components/LoginForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    // Auto-login if valid session exists
    const savedUserId = localStorage.getItem("userId");
    const expiryDate = localStorage.getItem("expiryDate");

    if (savedUserId && expiryDate) {
      const currentDate = new Date();
      if (currentDate.getTime() < new Date(expiryDate).getTime()) {
        router.push(`/dashboard/${savedUserId}`);
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("expiryDate");
      }
    }

    // Autofill email and password if saved
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setRememberMe(true);
      if (savedEmail) setValue("email", savedEmail);
      if (savedPassword) setValue("password", savedPassword);
    }
  }, [router, setValue]);

  const onSubmit = async (data) => {
    setNotification({ message: "Signing in...", type: "loading" });
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Successful login actions
        setNotification({ message: "Login successful!", type: "success" });

        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.user.id);

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 15); // Set session for 15 days
        localStorage.setItem("expiryDate", expiryDate.toISOString());

        if (rememberMe) {
          localStorage.setItem("email", data.email);
          localStorage.setItem("password", data.password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }

        setTimeout(() => {
          router.push(`/dashboard/${result.user.id}`);
        }, 1500);
      } else {
        setNotification({
          message: result.message || "Invalid email or password.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setNotification({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Login Form Section */}
      <div className="flex-grow bg-black flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-md shadow-lg">
          <LoginForm
            onSubmit={handleSubmit(onSubmit)}
            notification={notification}
            errors={errors}
            register={register}
            loading={loading}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-gray text-white py-4">
        <p className="text-center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
