"use client";
import React from "react";

export default function InputField({
  label,
  type = "text",
  options,
  ...props
}) {
  if (type === "select") {
    return (
      <div className="flex flex-col mb-4 w-full md:w-1/4 px-2">
        {" "}
        <label className="text-gray-400 mb-1">{label}</label>
        <select
          {...props}
          className="bg-dark-gray text-white px-3 py-2 rounded border border-gray-400 outline-none focus:border-gray-500"
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-2 mb-4 w-full md:w-1/4 px-2">
        {" "}
        <input type="checkbox" {...props} className="form-checkbox" />
        <label className="text-gray-400">{label}</label>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-4 w-full md:w-1/4 px-2">
      {" "}
      <label className="text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        {...props}
        className="bg-transparent text-white px-3 py-2 rounded border border-gray-400 outline-none focus:border-gray-500"
      />
    </div>
  );
}
