import { FormStepProps } from '@/types/assessment';

export default function NutritionStep({ formData, updateFormData }: FormStepProps) {
  const handleDietaryRestrictionChange = (restriction: string) => {
    const current = formData.nutrition.dietaryRestrictions;
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    
    updateFormData({
      nutrition: { ...formData.nutrition, dietaryRestrictions: updated }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nutrition & Hydration</h2>
      
      <div>
        <label className="block text-sm font-medium">Daily Calorie Intake (kcal)</label>
        <input
          type="number"
          value={formData.nutrition.dailyCalories}
          onChange={(e) => updateFormData({
            nutrition: { ...formData.nutrition, dailyCalories: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
        {['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Keto'].map((diet) => (
          <label key={diet} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={formData.nutrition.dietaryRestrictions.includes(diet)}
              onChange={() => handleDietaryRestrictionChange(diet)}
              className="rounded border-gray-300"
            />
            <span>{diet}</span>
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium">Meal Frequency</label>
        <select
          value={formData.nutrition.mealFrequency}
          onChange={(e) => updateFormData({
            nutrition: { ...formData.nutrition, mealFrequency: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select frequency</option>
          <option value="2-3">2-3 meals per day</option>
          <option value="4-5">4-5 meals per day</option>
          <option value="6+">6+ meals per day</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Hydration Habits</label>
        <textarea
          value={formData.nutrition.hydrationHabits}
          onChange={(e) => updateFormData({
            nutrition: { ...formData.nutrition, hydrationHabits: e.target.value }
          })}
          placeholder="Describe your typical daily water intake..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={3}
        />
      </div>
    </div>
  );
}
