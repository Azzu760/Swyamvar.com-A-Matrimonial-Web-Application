"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import RegistrationDetails from "../components/formSections/RegistrationDetails";
import BasicDetails from "../components/formSections/BasicDetails";
import BackgroundDetails from "../components/formSections/BackgroundDetails";
import PhysicalAttributes from "../components/formSections/PhysicalAttributes";
import AdditionalDetails from "../components/formSections/AdditionalDetails";
import Navbar from "../components/dashboardSections/Navbar";

const sections = [
  { title: "Registration Details", component: RegistrationDetails },
  { title: "Basic Details", component: BasicDetails },
  { title: "Background Details", component: BackgroundDetails },
  { title: "Physical Attributes", component: PhysicalAttributes },
  { title: "Additional Details", component: AdditionalDetails },
];

const RegisterPage = () => {
  const methods = useForm({ mode: "onBlur" });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const images = [
    "/wedding1.jpg",
    "/wedding2.jpg",
    "/wedding3.jpg",
    "/wedding4.jpg",
    "/wedding5.jpg",
    "/wedding6.jpg",
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(imageInterval);
  }, [images.length]);

  const CurrentSection = sections[step].component;

  const onSubmit = async (data) => {
    if (step === sections.length - 1) {
      setLoading(true);
      console.log("Form submitted successfully:", data);
      try {
        setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setTimeout(() => router.push("/login"), 2000);
        }, 1000);
      } catch (error) {
        console.error("Submission error: ", error);
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      <Navbar />

      <div className="flex w-full max-w-7xl mt-20 mb-10 px-4">
        {/* Left Side - Image Slideshow */}
        <div className="hidden md:block w-2/5">
          <img
            src={images[currentImageIndex]}
            alt="Slideshow"
            className="object-cover h-5/6 w-full transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="flex items-center mb-6">
            {step > 0 && (
              <button onClick={handleBack} className="mr-2">
                <IoArrowBack className="text-white text-2xl" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-center flex-grow">
              Registration Form
            </h1>
          </div>

          {/* Step Circles */}
          <div className="flex items-center justify-between mb-6">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                {step > index ? (
                  <FaCheckCircle className="text-green-500 mb-1" />
                ) : (
                  <FiCircle
                    className={`text-${
                      step === index ? "red-500" : "gray-400"
                    } mb-1`}
                  />
                )}
                <span className="text-sm text-center">{section.title}</span>
              </div>
            ))}
          </div>

          {/* Success Animation */}
          {success ? (
            <div className="flex flex-col items-center justify-center p-6 mb-8 bg-green-600 text-white rounded transition-opacity duration-500 ease-in-out">
              <FaCheckCircle className="text-4xl mb-2" />
              <h2 className="text-xl font-semibold">
                Form Submitted Successfully!
              </h2>
              <p className="text-sm mt-2">Redirecting to login page...</p>
            </div>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <CurrentSection />
                <div className="flex justify-between mt-8">
                  <button
                    type="submit"
                    className={`px-4 w-full py-2 font-bold rounded ${
                      loading
                        ? "bg-gray-500"
                        : step === sections.length - 1
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                    disabled={loading}
                  >
                    {loading
                      ? "Submitting..."
                      : step === sections.length - 1
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
