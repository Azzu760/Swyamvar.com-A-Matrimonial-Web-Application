"use client";

import { useForm, FormProvider } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import RegistrationDetails from "./formSections/RegistrationDetails";
import BasicDetails from "./formSections/BasicDetails";
import BackgroundDetails from "./formSections/BackgroundDetails";
import PhysicalAttributes from "./formSections/PhysicalAttributes";
import AdditionalDetails from "./formSections/AdditionalDetails";

const sections = [
  { title: "Registration Details", component: RegistrationDetails },
  { title: "Basic Details", component: BasicDetails },
  { title: "Background Details", component: BackgroundDetails },
  { title: "Physical Attributes", component: PhysicalAttributes },
  { title: "Additional Details", component: AdditionalDetails },
];

const RegisterForm = ({ onSubmit, step, setStep, loading, success, error }) => {
  const methods = useForm({ mode: "onBlur" });
  const { handleSubmit, trigger } = methods;
  const CurrentSection = sections[step].component;

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center mb-6">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              aria-label="Go back"
              className="mr-2"
            >
              <IoArrowBack className="text-white text-2xl" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-center flex-grow">
            Registration Form
          </h1>
        </div>

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

        {error && (
          <div className="bg-red-600 p-4 rounded mb-4 text-white">{error}</div>
        )}

        {success ? (
          <div className="flex flex-col items-center justify-center p-6 mb-8 bg-green-600 text-white rounded transition-opacity duration-500 ease-in">
            <h2 className="text-lg font-semibold">Registration Successful!</h2>
            <p>You will be redirected to the sign-in page shortly.</p>
          </div>
        ) : (
          <>
            <CurrentSection />
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={
                  step === sections.length - 1
                    ? handleSubmit(onSubmit)
                    : handleNextStep
                }
                className={`bg-red-500 w-full text-white px-4 py-2 rounded transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                }`}
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : step === sections.length - 1
                  ? "Register"
                  : "Next"}
              </button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
