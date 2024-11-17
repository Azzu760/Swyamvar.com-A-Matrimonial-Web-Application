"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "../../../components/RegisterFrom";
import Navbar from "../../../components/dashboardSections/Navbar";

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const images = [
    "/wedding1.jpg",
    "/wedding2.jpg",
    "/wedding3.jpg",
    "/wedding4.jpg",
    "/wedding5.jpg",
    "/wedding6.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sections = [
    { name: "Registration Details" },
    { name: "Basic Details" },
    { name: "Background Details" },
    { name: "Physical Attributes" },
    { name: "Additional Details" },
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(imageInterval);
  }, []);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    if (step === sections.length - 1) {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setSuccess(true);
          setTimeout(() => router.push("/auth/sign-in"), 2000);
        } else {
          const errorData = await response.json();
          setError(
            errorData.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setError(
          "An error occurred. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      <Navbar />
      <div className="flex w-full max-w-7xl mt-20 mb-10 px-4">
        <div className="hidden md:block w-2/5">
          <img
            src={images[currentImageIndex]}
            alt="Slideshow"
            className="object-cover h-5/6 w-full transition-all duration-500 ease-in-out"
          />
        </div>
        <div className="w-full md:w-3/5 p-8">
          <RegisterForm
            onSubmit={onSubmit}
            step={step}
            setStep={setStep}
            loading={loading}
            success={success}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
