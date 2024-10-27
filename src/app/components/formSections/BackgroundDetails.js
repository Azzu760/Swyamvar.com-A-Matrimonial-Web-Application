import { useFormContext } from "react-hook-form";

const BackgroundDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formFields = [
    {
      label: "Religion",
      name: "religion",
      type: "select",
      options: [
        { value: "", label: "Select Religion" },
        { value: "Hindu", label: "Hindu" },
        { value: "Muslim", label: "Muslim" },
        { value: "Christian", label: "Christian" },
        { value: "Sikh", label: "Sikh" },
        { value: "Buddhist", label: "Buddhist" },
        { value: "Jain", label: "Jain" },
        { value: "Jewish", label: "Jewish" },
        { value: "Bahá'í", label: "Bahá'í" },
        { value: "Other", label: "Other" },
      ],
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
      options: [
        { value: "", label: "Select Mother Tongue" },
        { value: "Hindi", label: "Hindi" },
        { value: "Bengali", label: "Bengali" },
        { value: "Telugu", label: "Telugu" },
        { value: "Marathi", label: "Marathi" },
        { value: "Tamil", label: "Tamil" },
        { value: "Urdu", label: "Urdu" },
        { value: "Gujarati", label: "Gujarati" },
        { value: "Malayalam", label: "Malayalam" },
        { value: "Kannada", label: "Kannada" },
        { value: "Punjabi", label: "Punjabi" },
        { value: "Other", label: "Other" },
      ],
      validation: { required: "Mother Tongue is required" },
    },
    {
      label: "Community",
      name: "community",
      type: "select",
      options: [
        { value: "", label: "Select Community" },
        { value: "General", label: "General" },
        { value: "OBC", label: "OBC" },
        { value: "SC", label: "SC" },
        { value: "ST", label: "ST" },
        { value: "Brahmin", label: "Brahmin" },
        { value: "Kshatriya", label: "Kshatriya" },
        { value: "Vaishya", label: "Vaishya" },
        { value: "Other", label: "Other" },
      ],
      validation: { required: "Community is required" },
    },
    {
      label: "Educational Level",
      name: "educationLevel",
      type: "select",
      options: [
        { value: "", label: "Select Educational Level" },
        { value: "High School", label: "High School" },
        { value: "Associate Degree", label: "Associate Degree" },
        { value: "Bachelor's Degree", label: "Bachelor's Degree" },
        { value: "Master's Degree", label: "Master's Degree" },
        { value: "Doctorate", label: "Doctorate" },
        { value: "Other", label: "Other" },
      ],
      validation: { required: "Education Level is required" },
    },
    {
      label: "Field of Study",
      name: "fieldOfStudy",
      type: "select",
      options: [
        { value: "", label: "Select Field of Study" },
        { value: "Arts", label: "Arts" },
        { value: "Business", label: "Business" },
        { value: "Education", label: "Education" },
        { value: "Engineering", label: "Engineering" },
        { value: "Health Sciences", label: "Health Sciences" },
        { value: "Humanities", label: "Humanities" },
        { value: "Law", label: "Law" },
        { value: "Mathematics", label: "Mathematics" },
        { value: "Science", label: "Science" },
        { value: "Social Sciences", label: "Social Sciences" },
        { value: "Technology", label: "Technology" },
        { value: "Other", label: "Other" },
      ],
      validation: { required: "Field of Study is required" },
    },
    {
      label: "Profession",
      name: "profession",
      type: "select",
      options: [
        { value: "", label: "Select Profession" },
        { value: "Student", label: "Student" },
        { value: "Teacher", label: "Teacher" },
        { value: "Engineer", label: "Engineer" },
        { value: "Doctor", label: "Doctor" },
        { value: "Nurse", label: "Nurse" },
        { value: "IT Professional", label: "IT Professional" },
        { value: "Business Analyst", label: "Business Analyst" },
        { value: "Researcher", label: "Researcher" },
        { value: "Marketing Specialist", label: "Marketing Specialist" },
        { value: "Lawyer", label: "Lawyer" },
        { value: "Other", label: "Other" },
      ],
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

export default BackgroundDetails;
