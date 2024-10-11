import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dummyUsers from "../data/dummyUsers2";

const SearchByParameters = () => {
  const router = useRouter();
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    const params = {
      fromYear: fromYear ? parseInt(fromYear) : null,
      toYear: toYear ? parseInt(toYear) : null,
      maritalStatus,
      country,
      city,
      religion,
      community,
      motherTongue,
    };

    const results = searchUsers(params);
    setFilteredProfiles(results);
    setSearchPerformed(true);
  };

  const handleClearFields = () => {
    setFromYear("");
    setToYear("");
    setMaritalStatus("");
    setCountry("");
    setCity("");
    setReligion("");
    setCommunity("");
    setMotherTongue("");
    setFilteredProfiles([]);
    setSearchPerformed(false);
  };

  const searchUsers = (params) => {
    return dummyUsers.filter((user) => {
      return (
        (params.fromYear === null || user.yearOfBirth >= params.fromYear) &&
        (params.toYear === null || user.yearOfBirth <= params.toYear) &&
        (params.maritalStatus === "" ||
          user.maritalStatus === params.maritalStatus) &&
        (params.country === "" || user.country === params.country) &&
        (params.city === "" || user.city === params.city) &&
        (params.religion === "" || user.religion === params.religion) &&
        (params.community === "" || user.community === params.community) &&
        (params.motherTongue === "" ||
          user.motherTongue === params.motherTongue)
      );
    });
  };

  const handleProfileClick = (id) => {
    router.push(`/profile/${id}`);
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

  const renderSelect = (label, options, value, setValue) => (
    <select
      className="bg-transparent border border-gray-400 rounded p-2 w-full text-white"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((option) => (
        <option
          className="bg-dark-gray text-white"
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  const countryOptions = [
    { value: "usa", label: "USA" },
    { value: "india", label: "India" },
    { value: "canada", label: "Canada" },
  ];

  const cityOptions = [
    { value: "new-york", label: "New York" },
    { value: "mumbai", label: "Mumbai" },
    { value: "toronto", label: "Toronto" },
  ];

  const religionOptions = [
    { value: "hindu", label: "Hindu" },
    { value: "muslim", label: "Muslim" },
    { value: "christian", label: "Christian" },
    { value: "other", label: "Other" },
  ];

  const communityOptions = [
    { value: "general", label: "General" },
    { value: "sc", label: "Scheduled Caste" },
    { value: "st", label: "Scheduled Tribe" },
  ];

  const motherTongueOptions = [
    { value: "hindi", label: "Hindi" },
    { value: "tamil", label: "Tamil" },
    { value: "english", label: "English" },
  ];

  return (
    <>
      <div className="bg-dark-gray p-4 rounded shadow">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderInput("From Year of Birth", fromYear, setFromYear)}
            </div>
            <div>{renderInput("To Year of Birth", toYear, setToYear)}</div>
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
              {renderSelect("Country", countryOptions, country, setCountry)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>{renderSelect("City", cityOptions, city, setCity)}</div>
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
        <div className="flex flex-col gap-1">
          {filteredProfiles.length > 0
            ? filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center p-3 bg-dark-gray mb-1 rounded shadow"
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full mr-4 cursor-pointer"
                    onClick={() => handleProfileClick(profile.id)}
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
            : searchPerformed && (
                <div className="text-gray-500 text-center justify-center">
                  No profiles matched your search.
                </div>
              )}
        </div>
      </div>
    </>
  );
};

export default SearchByParameters;
