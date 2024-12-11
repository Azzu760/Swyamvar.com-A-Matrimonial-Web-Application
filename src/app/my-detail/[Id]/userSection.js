import React from "react";

function UserSection({ title, details }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
          >
            <span className="text-gray-400">{detail.label}:</span>
            <span className="text-white">{detail.value || "N/A"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSection;
