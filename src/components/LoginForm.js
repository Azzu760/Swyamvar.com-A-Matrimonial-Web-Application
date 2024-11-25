// components/LoginForm.js
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm = ({ onSubmit, errors, register, notification }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="bg-dark-gray text-white w-full max-w-md p-8 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {/* Display Notification */}
      {notification.message && (
        <div
          className={`mb-4 p-3 rounded ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white text-center`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required." })}
          className="bg-transparent text-white px-3 py-2 rounded border border-gray-600 outline-none focus:border-gray-400"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required." })}
            className="bg-transparent text-white px-3 py-2 rounded border border-gray-600 outline-none focus:border-gray-400 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/auth/sign-up" className="text-blue-400 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
