import { FormStepProps } from '@/types/assessment';

export default function PersonalInfoStep({ formData, updateFormData }: FormStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium mb-2">Age</label>
        <input
          id="age"
          type="number"
          value={formData.personalInfo.age}
          onChange={(e) => updateFormData({
            personalInfo: { ...formData.personalInfo, age: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          aria-label="Age"
          title="Enter your age"
          placeholder="Enter your age"
          required
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium mb-2">Gender</label>
        <select
          id="gender"
          value={formData.personalInfo.gender}
          onChange={(e) => updateFormData({
            personalInfo: { ...formData.personalInfo, gender: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          aria-label="Gender"
          title="Select your gender"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-2">Location (Optional)</label>
        <input
          id="location"
          type="text"
          value={formData.personalInfo.location}
          onChange={(e) => updateFormData({
            personalInfo: { ...formData.personalInfo, location: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          aria-label="Location"
          title="Enter your location"
          placeholder="City, Country"
        />
      </div>
    </div>
  );
}
