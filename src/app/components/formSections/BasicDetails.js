import { useFormContext } from "react-hook-form";
import countryCodes from "../../data/countryCodes";

const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Function to validate age
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
      <label>{label}</label>
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
      <label>{label}</label>
      <select
        {...register(name, { required: `${label} is required` })}
        className="w-full p-3 rounded bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" className="bg-dark-gray">
          Select {label}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            className="bg-dark-gray"
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
      })}
      {renderInput("Last Name", "text", "lastName", {
        required: "Last Name is required",
      })}
      {renderSelect("Gender", "gender", [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ])}
      {renderInput("Date of Birth", "date", "dob", {
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
      {renderSelect("Marital Status", "maritalStatus", [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorced", label: "Divorced" },
        { value: "Widowed", label: "Widowed" },
      ])}
      {renderSelect(
        "Country",
        "country",
        countryCodes.map((country) => ({
          value: country.name,
          label: country.name,
        }))
      )}
      {renderInput("City", "text", "city", { required: "City is required" })}
      {renderSelect("Preferred Partner", "preferredPartner", [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Non-binary", label: "Non-binary" },
        { value: "Other", label: "Other" },
      ])}
    </div>
  );
};

export default BasicDetails;
