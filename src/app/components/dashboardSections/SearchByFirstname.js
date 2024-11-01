"use client";
import React from "react";
import { useRouter } from "next/navigation";
import dummyUsers from "../../data/dummyUsers2"; // Importing dummyUsers data
import { FaSearch, FaTimes } from "react-icons/fa"; // Importing FaSearch and FaTimes

const SearchByFirstname = ({ searchTerm, setSearchTerm }) => {
  const router = useRouter();

  // Filtering profiles based on the search term
  const filteredProfiles = dummyUsers.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileClick = (id) => {
    // Navigate to the profile page using the user's id
    router.push(`/profile/${id}`); // Adjust the route according to your file structure
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center mb-4 relative">
        <input
          type="text"
          placeholder="Search by Firstname"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 outline-none text-gray-400 bg-dark-gray rounded w-full pl-10 transition-colors duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500"
        />
        <FaSearch className="absolute left-3 text-gray-500" />
        {searchTerm && (
          <FaTimes
            className="absolute right-3 text-gray-500 cursor-pointer"
            onClick={() => setSearchTerm("")} // Clear the search term on click
          />
        )}
      </div>

      {/* Render profiles only if searchTerm has a value */}
      {searchTerm && filteredProfiles.length > 0 ? (
        filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center p-3 bg-dark-gray mb-1 rounded shadow"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-16 h-16 rounded-full mr-4 cursor-pointer" // Add cursor-pointer for better UX
              onClick={() => handleProfileClick(profile.id)} // Call the handler on click
            />
            <div className="flex flex-col flex-grow">
              <div className="flex items-center">
                <span className="font-semibold">{profile.name}</span>
                <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                  {profile.maritalStatus}
                </span>
              </div>
              <span>{profile.age} years old</span>
            </div>
            <div className="ml-auto">
              <div className="text-gray-600 justify-center text-center">
                <span>{profile.matches}</span>
                <br />
                <span>
                  <strong>Matches</strong>
                </span>
              </div>
            </div>
          </div>
        ))
      ) : searchTerm ? (
        <div className="text-gray-500 text-center justify-center">
          No profiles matched your search.
        </div>
      ) : null}
    </div>
  );
};

export default SearchByFirstname;
