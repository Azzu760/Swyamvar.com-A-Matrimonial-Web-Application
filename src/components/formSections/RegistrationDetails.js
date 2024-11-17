import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import countryCodes from "../../app/data/countryCodes";

const RegistrationDetails = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleCountryCodeChange = (e) => {
    const selectedCode = e.target.value;
    setValue("countryCode", selectedCode); // Set the country code in the form
    setValue("fullPhoneNumber", `${selectedCode}${getValues("phone")}`); // Update full phone number
  };

  // Effect to update full phone number when the phone number changes
  useEffect(() => {
    const fullPhoneNumber = `${getValues("countryCode")}${getValues("phone")}`;
    setValue("fullPhoneNumber", fullPhoneNumber); // Update the full phone number
  }, [getValues("phone")]); // Only update when the phone number changes

  const renderError = (error) =>
    error && <p className="text-red-500 text-sm">{error.message}</p>;

  return (
    <div>
      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm">
          Email:
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className={`w-full p-3 h-12 rounded bg-transparent border ${
            errors.email ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {renderError(errors.email)}
      </div>

      {/* Password Field */}
      <div className="mb-4 relative">
        <label htmlFor="password" className="block mb-2 text-sm">
          Password:
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /[!@#$%^&*(),.?":{}|<>]/,
                message: "Password must contain at least one special character",
              },
            })}
            className={`w-full p-3 h-12 rounded bg-transparent border pr-10 ${
              errors.password ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {renderError(errors.password)}
      </div>

      {/* Confirm Password Field */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2 text-sm">
          Confirm Password:
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          className={`w-full p-3 h-12 rounded bg-transparent border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {renderError(errors.confirmPassword)}
      </div>

      {/* Phone Number Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2 text-sm">
          Phone Number:
        </label>
        <div className="flex items-center">
          <select
            onChange={handleCountryCodeChange}
            {...register("countryCode")}
            className={`mr-2 p-3 h-12 rounded bg-transparent border ${
              errors.countryCode ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 w-24`}
          >
            <option className="bg-dark-gray" value="">
              Code
            </option>
            {countryCodes.map((country) => (
              <option
                className="bg-dark-gray"
                key={country.code}
                value={country.code}
              >
                {`${country.name} (${country.code})`}
              </option>
            ))}
          </select>

          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Validate the phone number format
                message: "Phone number must be exactly 10 digits",
              },
            })}
            className={`w-full p-3 h-12 rounded bg-transparent border ${
              errors.phone ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {renderError(errors.phone)}
      </div>

      {/* Hidden Input for Full Phone Number */}
      <input type="hidden" {...register("fullPhoneNumber")} />
    </div>
  );
};

export default RegistrationDetails;
