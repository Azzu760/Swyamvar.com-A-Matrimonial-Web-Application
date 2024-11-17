import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

import {
  isVerifiedOptions,
  genderOptions,
  maritalStatusOptions,
  religionOptions,
  educationLevelOptions,
  professionOptions,
  bodyTypeOptions,
  skinToneOptions,
  dietOptions,
  smokingHabitsOptions,
} from "../../app/data/options";
import countryCodes from "../../app/data/countryCodes";

const Preferences = ({ userId }) => {
  const router = useRouter();
  const [minAge, setMinAge] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [profession, setProfession] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [diet, setDiet] = useState("");
  const [smokingHabits, setSmokingHabit] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to fetch data based on selected preferences
  const fetchData = async (params) => {
    setLoading(true);
    try {
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

  const handleSearch = () => {
    const params = {
      minAge,
      isVerified,
      gender,
      maritalStatus,
      country,
      city,
      religion,
      caste,
      educationLevel,
      profession,
      bodyType,
      skinTone,
      diet,
      smokingHabits,
      userId,
    };
    fetchData(params);
  };

  const handleClearFields = () => {
    setMinAge("");
    setIsVerified("");
    setGender("");
    setMaritalStatus("");
    setCountry("");
    setCity("");
    setReligion("");
    setCaste("");
    setEducationLevel("");
    setProfession("");
    setBodyType("");
    setSkinTone("");
    setDiet("");
    setSmokingHabit("");
    setFilteredProfiles([]);
    setSearchPerformed(false);
  };

  const handleProfileClick = (profileId) => {
    router.push(`/profile/${profileId}?userId=${userId}`);
  };

  const renderInput = (label, value, setValue) => (
    <input
      type="text"
      className="bg-transparent border border-gray-400 rounded p-2 w-full text-white"
      placeholder={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );

  const renderSelect = (label, options = [], value, setValue) => (
    <select
      className="bg-transparent border border-gray-400 rounded p-2 w-full text-white"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((option) => (
        <option
          className="bg-dark-gray text-white"
          key={option.code || option.name || option.value}
          value={option.name || option.value}
        >
          {option.name || option.label}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <div className="bg-dark-gray p-4 rounded shadow w-[80%] mx-auto">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>{renderInput("Min Age", minAge, setMinAge)}</div>
            <div>
              {renderSelect(
                "Is Verified",
                isVerifiedOptions,
                isVerified,
                setIsVerified
              )}
            </div>
            <div>
              {renderSelect("Gender", genderOptions, gender, setGender)}
            </div>
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
            <div>{renderInput("City", city, setCity)}</div>
            <div>
              {renderSelect("Religion", religionOptions, religion, setReligion)}
            </div>
            <div>{renderInput("Caste", caste, setCaste)}</div>
            <div>
              {renderSelect(
                "Education Level",
                educationLevelOptions,
                educationLevel,
                setEducationLevel
              )}
            </div>
            <div>
              {renderSelect(
                "Profession",
                professionOptions,
                profession,
                setProfession
              )}
            </div>
            <div>
              {renderSelect(
                "Body Type",
                bodyTypeOptions,
                bodyType,
                setBodyType
              )}
            </div>
            <div>
              {renderSelect(
                "Skin Tone",
                skinToneOptions,
                skinTone,
                setSkinTone
              )}
            </div>
            <div>{renderSelect("Diet", dietOptions, diet, setDiet)}</div>
            <div>
              {renderSelect(
                "Smoking Habits",
                smokingHabitsOptions,
                smokingHabits,
                setSmokingHabit
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

      <div className="mt-4 w-[80%] mx-auto">
        {loading ? (
          <LoadingSpinner />
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

export default Preferences;
