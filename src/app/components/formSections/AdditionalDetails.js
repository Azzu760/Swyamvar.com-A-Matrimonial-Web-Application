import { useFormContext } from "react-hook-form";

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
      options: [
        { value: "", label: "Select Diet" },
        { value: "Vegetarian", label: "Vegetarian" },
        { value: "Non-Vegetarian", label: "Non-Vegetarian" },
        { value: "Vegan", label: "Vegan" },
      ],
    },
    {
      label: "Smoking Habits",
      name: "smokingHabits",
      type: "select",
      options: [
        { value: "", label: "Select Smoking Habits" },
        { value: "Non-Smoker", label: "Non-Smoker" },
        { value: "Occasional Smoker", label: "Occasional Smoker" },
        { value: "Regular Smoker", label: "Regular Smoker" },
      ],
    },
    {
      label: "Hobbies and Interests",
      name: "hobbies",
      type: "text",
      validation: { required: "Hobbies and Interests are required" },
    },
    {
      label: "Astrological Sign",
      name: "astrologicalSign",
      type: "select",
      options: [
        { value: "", label: "Select Astrological Sign" },
        { value: "Aries", label: "Aries" },
        { value: "Taurus", label: "Taurus" },
        { value: "Gemini", label: "Gemini" },
        { value: "Cancer", label: "Cancer" },
        { value: "Leo", label: "Leo" },
        { value: "Virgo", label: "Virgo" },
        { value: "Libra", label: "Libra" },
        { value: "Scorpio", label: "Scorpio" },
        { value: "Sagittarius", label: "Sagittarius" },
        { value: "Capricorn", label: "Capricorn" },
        { value: "Aquarius", label: "Aquarius" },
        { value: "Pisces", label: "Pisces" },
      ],
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
          <label>{label}</label>
          {type === "select" ? (
            <select
              {...register(name)}
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
