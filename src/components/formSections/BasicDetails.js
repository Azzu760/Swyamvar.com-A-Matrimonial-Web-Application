import { useFormContext } from "react-hook-form";
import countryCodes from "../../app/data/countryCodes";
import {
  genderOptions,
  maritalStatusOptions,
  preferredPartnerOptions,
} from "../../app/data/options";

const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const renderInput = (label, type, name, options = {}) => (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        {...register(name, options)}
        className="w-full p-3 rounded bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );

  const renderSelect = (label, name, options = []) => (
    <div>
      <label className="font-semibold">{label}</label>
      <select
        {...register(name, { required: `${label} is required` })}
        className="w-full p-3 rounded bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option
            className="bg-dark-gray"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderInput("First Name", "text", "firstName", {
        required: "First Name is required",
        maxLength: {
          value: 30,
          message: "First Name cannot exceed 30 characters",
        },
      })}
      {renderInput("Last Name", "text", "lastName", {
        required: "Last Name is required",
        maxLength: {
          value: 30,
          message: "Last Name cannot exceed 30 characters",
        },
      })}
      {renderSelect("Gender", "gender", genderOptions)}
      {renderInput("Date of Birth", "date", "dateOfBirth", {
        required: "Date of Birth is required",
        validate: {
          isAdult: (value) => {
            const age = validateAge(value);
            return (
              age >= 18 || "You must be at least 18 years old to register."
            );
          },
        },
      })}
      {renderSelect("Marital Status", "maritalStatus", maritalStatusOptions)}
      {renderSelect(
        "Country",
        "country",
        countryCodes.map((country) => ({
          value: country.name,
          label: country.name,
        }))
      )}
      {renderInput("City", "text", "city", {
        required: "City is required",
        maxLength: {
          value: 50,
          message: "City name cannot exceed 50 characters",
        },
      })}
      {renderSelect(
        "Preferred Partner",
        "preferredPartner",
        preferredPartnerOptions
      )}
    </div>
  );
};

export default BasicDetails;
