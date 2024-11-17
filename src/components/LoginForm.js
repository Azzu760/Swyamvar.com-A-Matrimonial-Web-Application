// components/LoginForm.js
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm = ({ onSubmit, errors, register }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate async submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onSubmit({ rememberMe });
    }, 2000);
  };

  return (
    <div className="bg-dark-gray text-white w-full max-w-md p-8 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center transition-transform duration-700 ease-in-out transform">
        Login
      </h1>

      <form
        onSubmit={handleFormSubmit}
        className={`flex flex-col gap-3 transition-opacity duration-500 ease-in-out ${
          isLoading || isSuccess
            ? "opacity-50 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required." })}
          className="bg-transparent text-white px-3 py-2 rounded border border-gray-600 outline-none focus:border-gray-400"
          disabled={isLoading || isSuccess}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required." })}
            className="bg-transparent text-white px-3 py-2 rounded border border-gray-600 outline-none focus:border-gray-400 w-full pr-10"
            disabled={isLoading || isSuccess}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isLoading || isSuccess}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
              disabled={isLoading || isSuccess}
            />
            <span className="ml-2 text-gray-300">Remember Me</span>
          </label>
          <a
            href="/auth/forgot-password"
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className={`mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-transform duration-500 ease-in-out ${
            isLoading || isSuccess ? "animate-pulse" : "hover:scale-105"
          }`}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? "Processing..." : "Login"}
        </button>

        {isLoading && (
          <div className="flex justify-center items-center mt-3">
            <div className="border-4 border-gray-300 border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 text-center text-green-500 font-semibold animate-pulse">
            Login Successful!
          </div>
        )}
      </form>

      <p className="mt-4 text-center transition-transform duration-700 ease-in-out">
        Don't have an account?{" "}
        <a href="/auth/sign-up" className="text-blue-400 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
