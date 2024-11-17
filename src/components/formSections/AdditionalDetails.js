import { useFormContext } from "react-hook-form";
import {
  dietOptions,
  smokingHabitsOptions,
  astrologicalSignOptions,
} from "../../app/data/options";

const AdditionalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formFields = [
    {
      label: "Diet",
      name: "diet",
      type: "select",
      options: dietOptions,
      validation: { required: "Diet selection is required" },
    },
    {
      label: "Smoking Habits",
      name: "smokingHabits",
      type: "select",
      options: smokingHabitsOptions,
      validation: { required: "Smoking habits selection is required" },
    },
    {
      label: "Hobbies and Interests",
      name: "hobbiesAndInterests",
      type: "text",
      validation: { required: "Hobbies and Interests are required" },
    },
    {
      label: "Astrological Sign",
      name: "astrologicalSign",
      type: "select",
      options: astrologicalSignOptions,
      validation: { required: "Astrological sign selection is required" },
    },
    {
      label: "Bio / Additional Notes",
      name: "bio",
      type: "textarea",
      validation: { required: "Bio is required" },
    },
    {
      label: "Facebook Link (optional)",
      name: "facebookLink",
      type: "url",
    },
    {
      label: "Instagram Link (optional)",
      name: "instagramLink",
      type: "url",
    },
    {
      label: "Twitter Link (optional)",
      name: "twitterLink",
      type: "url",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {formFields.map(({ label, name, type, options, validation }) => (
        <div className="mb-4" key={name}>
          <label className="block mb-2">{label}</label>
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
          ) : type === "textarea" ? (
            <textarea
              {...register(name, validation)}
              className="w-full p-3 rounded bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type={type}
              {...register(name, validation)}
              className="w-full p-3 rounded bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {errors[name] && (
            <p className="text-red-500">{errors[name].message}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdditionalDetails;
