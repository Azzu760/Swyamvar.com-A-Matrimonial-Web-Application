import { useFormContext } from "react-hook-form";
import {
  religionOptions,
  motherTongueOptions,
  communityOptions,
  educationLevelOptions,
  fieldOfStudyOptions,
  professionOptions,
} from "../../app/data/options";

const BackgroundDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Define form fields with their properties
  const formFields = [
    {
      label: "Religion",
      name: "religion",
      type: "select",
      options: religionOptions,
      validation: { required: "Religion is required" },
    },
    {
      label: "Caste",
      name: "caste",
      type: "text",
      validation: { required: "Caste is required" },
    },
    {
      label: "Mother Tongue",
      name: "motherTongue",
      type: "select",
      options: motherTongueOptions,
      validation: { required: "Mother Tongue is required" },
    },
    {
      label: "Community",
      name: "community",
      type: "select",
      options: communityOptions,
      validation: { required: "Community is required" },
    },
    {
      label: "Educational Level",
      name: "educationLevel",
      type: "select",
      options: educationLevelOptions,
      validation: { required: "Education Level is required" },
    },
    {
      label: "Field of Study",
      name: "fieldOfStudy",
      type: "select",
      options: fieldOfStudyOptions,
      validation: { required: "Field of Study is required" },
    },
    {
      label: "Profession",
      name: "profession",
      type: "select",
      options: professionOptions,
      validation: { required: "Profession is required" },
    },
    {
      label: "Annual Income",
      name: "annualIncome",
      type: "number",
      validation: { required: "Annual Income is required" },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {formFields.map(({ label, name, type, options, validation }) => (
        <div className="mb-4" key={name}>
          <label className="block mb-1">{label}</label>
          {type === "select" ? (
            <select
              {...register(name, validation)}
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
          ) : (
            <input
              type={type}
              {...register(name, validation)}
              className="w-full p-3 rounded bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {errors[name] && (
            <p className="text-red-500 mt-1">{errors[name].message}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BackgroundDetails;
