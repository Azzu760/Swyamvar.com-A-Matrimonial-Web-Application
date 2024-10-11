import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dummyUsers from "../data/dummyUsers2"; // Make sure you have this data file

const Preferences = () => {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [complexion, setComplexion] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [diet, setDiet] = useState("");
  const [filteredProfiles, setfilteredProfiles] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    const params = {
      age: age ? parseInt(age) : null,
      height: height ? parseInt(height) : null,
      bodyType,
      complexion,
      maritalStatus,
      country,
      city,
      religion,
      community,
      motherTongue,
      highestQualification,
      diet,
    };

    const results = searchPreferences(params);
    setfilteredProfiles(results);
    setSearchPerformed(true);
  };

  const handleClearFields = () => {
    setAge("");
    setHeight("");
    setBodyType("");
    setComplexion("");
    setMaritalStatus("");
    setCountry("");
    setCity("");
    setReligion("");
    setCommunity("");
    setMotherTongue("");
    setHighestQualification("");
    setDiet("");
    setfilteredProfiles([]);
    setSearchPerformed(false);
  };

  const searchPreferences = (params) => {
    return dummyUsers.filter((preference) => {
      return (
        (params.age === null || preference.age === params.age) &&
        (params.height === null || preference.height === params.height) &&
        (params.bodyType === "" || preference.bodyType === params.bodyType) &&
        (params.complexion === "" ||
          preference.complexion === params.complexion) &&
        (params.maritalStatus === "" ||
          preference.maritalStatus === params.maritalStatus) &&
        (params.country === "" || preference.country === params.country) &&
        (params.city === "" || preference.city === params.city) &&
        (params.religion === "" || preference.religion === params.religion) &&
        (params.community === "" ||
          preference.community === params.community) &&
        (params.motherTongue === "" ||
          preference.motherTongue === params.motherTongue) &&
        (params.highestQualification === "" ||
          preference.highestQualification === params.highestQualification) &&
        (params.diet === "" || preference.diet === params.diet)
      );
    });
  };

  const handleProfileClick = (id) => {
    router.push(`/profile/${id}`); // Adjust to your routing needs
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

  const bodyTypeOptions = [
    { value: "slim", label: "Slim" },
    { value: "average", label: "Average" },
    { value: "athletic", label: "Athletic" },
    { value: "heavy", label: "Heavy" },
  ];

  const complexionOptions = [
    { value: "fair", label: "Fair" },
    { value: "wheatish", label: "Wheatish" },
    { value: "dark", label: "Dark" },
  ];

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

  const highestQualificationOptions = [
    { value: "none", label: "None" },
    { value: "highschool", label: "High School" },
    { value: "bachelor", label: "Bachelor's" },
    { value: "master", label: "Master's" },
  ];

  const dietOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "non-vegetarian", label: "Non-Vegetarian" },
    { value: "vegan", label: "Vegan" },
  ];

  return (
    <>
      <div className="bg-dark-gray p-4 w-3/4 mx-auto rounded shadow">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>{renderInput("Age", age, setAge)}</div>
            <div>{renderInput("Height (cm)", height, setHeight)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                "Complexion",
                complexionOptions,
                complexion,
                setComplexion
              )}
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderSelect(
                "Highest Qualification",
                highestQualificationOptions,
                highestQualification,
                setHighestQualification
              )}
            </div>
            <div>{renderSelect("Diet", dietOptions, diet, setDiet)}</div>
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

      <div className="mt-4 w-3/4 mx-auto">
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

export default Preferences;
