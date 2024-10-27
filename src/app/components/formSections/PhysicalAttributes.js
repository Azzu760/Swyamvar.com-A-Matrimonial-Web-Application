import { useFormContext } from "react-hook-form";

const PhysicalAttributes = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formFields = [
    {
      label: "Height (in cm)",
      name: "height",
      type: "number",
      validation: { required: "Height is required" },
    },
    {
      label: "Body Type",
      name: "bodyType",
      type: "select",
      options: [
        { value: "", label: "Select Body Type" },
        { value: "Slim", label: "Slim" },
        { value: "Athletic", label: "Athletic" },
        { value: "Average", label: "Average" },
        { value: "Heavyset", label: "Heavyset" },
        { value: "Obese", label: "Obese" },
      ],
      validation: { required: "Body Type is required" },
    },
    {
      label: "Complexion",
      name: "complexion",
      type: "select",
      options: [
        { value: "", label: "Select Complexion" },
        { value: "Fair", label: "Fair" },
        { value: "Wheatish", label: "Wheatish" },
        { value: "Dark", label: "Dark" },
        { value: "Medium", label: "Medium" },
      ],
      validation: { required: "Complexion is required" },
    },
    {
      label: "Physical Disability",
      name: "physicalDisability",
      type: "select",
      options: [
        { value: "", label: "Select Disability Status" },
        { value: "None", label: "None" },
        { value: "Mobility Impairment", label: "Mobility Impairment" },
        { value: "Visual Impairment", label: "Visual Impairment" },
        { value: "Hearing Impairment", label: "Hearing Impairment" },
        { value: "Other", label: "Other" },
      ],
      validation: { required: "Physical Disability status is required" },
    },
    {
      label: "Hair Color",
      name: "hairColor",
      type: "select",
      options: [
        { value: "", label: "Select Hair Color" },
        { value: "Black", label: "Black" },
        { value: "Brown", label: "Brown" },
        { value: "Blonde", label: "Blonde" },
        { value: "Red", label: "Red" },
        { value: "Gray", label: "Gray" },
      ],
      validation: { required: "Hair Color is required" },
    },
    {
      label: "Eye Color",
      name: "eyeColor",
      type: "select",
      options: [
        { value: "", label: "Select Eye Color" },
        { value: "Brown", label: "Brown" },
        { value: "Blue", label: "Blue" },
        { value: "Green", label: "Green" },
        { value: "Hazel", label: "Hazel" },
        { value: "Gray", label: "Gray" },
      ],
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
      options: [
        { value: "", label: "Select Skin Tone" },
        { value: "Fair", label: "Fair" },
        { value: "Medium", label: "Medium" },
        { value: "Dark", label: "Dark" },
      ],
      validation: { required: "Skin Tone is required" },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {formFields.map(({ label, name, type, options, validation }) => (
        <div className="mb-4" key={name}>
          <label>{label}</label>
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
            <p className="text-red-500">{errors[name].message}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhysicalAttributes;
