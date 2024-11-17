import { useFormContext } from "react-hook-form";
import {
  bodyTypeOptions,
  complexionOptions,
  physicalDisabilityOptions,
  hairColorOptions,
  eyeColorOptions,
  skinToneOptions,
} from "../../app/data/options";

const PhysicalAttributes = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formFields = [
    {
      label: "Height (in feet)",
      name: "height",
      type: "number",
      validation: { required: "Height is required" },
    },
    {
      label: "Body Type",
      name: "bodyType",
      type: "select",
      options: bodyTypeOptions,
      validation: { required: "Body Type is required" },
    },
    {
      label: "Complexion",
      name: "complexion",
      type: "select",
      options: complexionOptions,
      validation: { required: "Complexion is required" },
    },
    {
      label: "Physical Disability",
      name: "physicalDisability",
      type: "select",
      options: physicalDisabilityOptions,
      validation: { required: "Physical Disability status is required" },
    },
    {
      label: "Hair Color",
      name: "hairColor",
      type: "select",
      options: hairColorOptions,
      validation: { required: "Hair Color is required" },
    },
    {
      label: "Eye Color",
      name: "eyeColor",
      type: "select",
      options: eyeColorOptions,
      validation: { required: "Eye Color is required" },
    },
    {
      label: "Weight (in kg)",
      name: "weight",
      type: "number",
      validation: { required: "Weight is required" },
    },
    {
      label: "Skin Tone",
      name: "skinTone",
      type: "select",
      options: skinToneOptions,
      validation: { required: "Skin Tone is required" },
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
              placeholder={label}
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

export default PhysicalAttributes;
