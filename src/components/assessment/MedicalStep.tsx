import { FormStepProps } from '@/types/assessment';

export default function MedicalStep({ formData, updateFormData }: FormStepProps) {
  const handleArrayInput = (field: keyof typeof formData.medical, value: string) => {
    if (Array.isArray(formData.medical[field])) {
      updateFormData({
        medical: {
          ...formData.medical,
          [field]: value.split(',').map(item => item.trim())
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Medical Information</h2>
      
      <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mb-6">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This information helps us customize your training plan safely. Please consult with a healthcare provider before starting any new exercise program.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Do you have any current injuries?</label>
        <div className="flex gap-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.medical.hasInjuries}
              onChange={() => updateFormData({
                medical: { ...formData.medical, hasInjuries: true }
              })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={!formData.medical.hasInjuries}
              onChange={() => updateFormData({
                medical: { ...formData.medical, hasInjuries: false }
              })}
              className="mr-2"
            />
            No
          </label>
        </div>
        {formData.medical.hasInjuries && (
          <textarea
            value={formData.medical.injuries}
            onChange={(e) => updateFormData({
              medical: { ...formData.medical, injuries: e.target.value }
            })}
            className="w-full p-2 border rounded dark:bg-gray-700"
            placeholder="Please describe your injuries..."
            required
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Current Medications (comma-separated)</label>
        <input
          type="text"
          value={formData.medical.medications.join(', ')}
          onChange={(e) => handleArrayInput('medications', e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="e.g., Medication 1, Medication 2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Allergies (comma-separated)</label>
        <input
          type="text"
          value={formData.medical.allergies.join(', ')}
          onChange={(e) => handleArrayInput('allergies', e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="e.g., Allergy 1, Allergy 2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Have you been advised to limit physical activity?
        </label>
        <div className="flex gap-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.medical.hasActivityRestrictions}
              onChange={() => updateFormData({
                medical: { ...formData.medical, hasActivityRestrictions: true }
              })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={!formData.medical.hasActivityRestrictions}
              onChange={() => updateFormData({
                medical: { ...formData.medical, hasActivityRestrictions: false }
              })}
              className="mr-2"
            />
            No
          </label>
        </div>
        {formData.medical.hasActivityRestrictions && (
          <textarea
            value={formData.medical.activityRestrictions}
            onChange={(e) => updateFormData({
              medical: { ...formData.medical, activityRestrictions: e.target.value }
            })}
            className="w-full p-2 border rounded dark:bg-gray-700"
            placeholder="Please describe your activity restrictions..."
            required
          />
        )}
      </div>
    </div>
  );
}
