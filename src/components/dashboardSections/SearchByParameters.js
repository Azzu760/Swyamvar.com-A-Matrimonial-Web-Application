import React, { useState } from "react";
import { useRouter } from "next/navigation";
import countryCodes from "../../app/data/countryCodes";
import {
  maritalStatusOptions,
  religionOptions,
  communityOptions,
  motherTongueOptions,
} from "../../app/data/options";
import LoadingSpinner from "./LoadingSpinner";

const SearchByParameters = ({ userId }) => {
  const router = useRouter();
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {
        minAge,
        maxAge,
        maritalStatus,
        country,
        city,
        religion,
        community,
        motherTongue,
        userId,
      };

      const response = await fetch(`/api/user/search?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      setFilteredProfiles(data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFields = () => {
    setMinAge("");
    setMaxAge("");
    setMaritalStatus("");
    setCountry("");
    setCity("");
    setReligion("");
    setCommunity("");
    setMotherTongue("");
    setFilteredProfiles([]);
    setSearchPerformed(false);
  };

  const handleProfileClick = (profileId) => {
    router.push(`/profile/${profileId}?userId=${userId}`);
  };

  const renderInput = (label, value, setValue) => (
    <input
      type="number"
      className="bg-transparent border border-gray-400 rounded p-2 w-full text-white"
      placeholder={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );

  const renderTextInput = (label, value, setValue) => (
    <input
      type="text"
      className="bg-transparent border border-gray-400 rounded p-2 w-full text-white"
      placeholder={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );

  const renderSelect = (label, options, value, setValue) => (
    <select
      className="bg-transparent border border-gray-400 rounded p-2 w-full text-white"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((option) => (
        <option
          className="bg-dark-gray text-white"
          key={option.code || option.name}
          value={option.name || option.value}
        >
          {option.name || option.label}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <div className="bg-dark-gray p-4 rounded shadow">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>{renderInput("Min Age", minAge, setMinAge)}</div>
            <div>{renderInput("Max Age", maxAge, setMaxAge)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderSelect(
                "Marital Status",
                maritalStatusOptions,
                maritalStatus,
                setMaritalStatus
              )}
            </div>
            <div>
              {renderSelect("Country", countryCodes, country, setCountry)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>{renderTextInput("City", city, setCity)}</div>
            <div>
              {renderSelect("Religion", religionOptions, religion, setReligion)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderSelect(
                "Community",
                communityOptions,
                community,
                setCommunity
              )}
            </div>
            <div>
              {renderSelect(
                "Mother Tongue",
                motherTongueOptions,
                motherTongue,
                setMotherTongue
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="bg-red-500 text-white rounded p-2 w-full"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="bg-gray-500 text-white rounded p-2 w-full"
              onClick={handleClearFields}
            >
              Clear Fields
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredProfiles.length > 0
              ? filteredProfiles.map((profile) => (
                  <div
                    key={profile.userId}
                    className="flex items-center p-3 bg-dark-gray mb-1 rounded shadow relative"
                  >
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full mr-4 cursor-pointer"
                      onClick={() => handleProfileClick(profile.userId)}
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
                    {profile.isVerified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      <span className="text-gray-500">Not Verified</span>
                    )}
                  </div>
                ))
              : searchPerformed && (
                  <div className="text-gray-500 text-center">
                    No profiles matched your search.
                  </div>
                )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchByParameters;
