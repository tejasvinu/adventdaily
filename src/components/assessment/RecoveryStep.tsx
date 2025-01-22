import { FormStepProps } from '@/types/assessment';

export default function RecoveryStep({ formData, updateFormData }: FormStepProps) {
  const handleMobilityWorkChange = (activity: string) => {
    const current = formData.recovery.mobilityWork;
    const updated = current.includes(activity)
      ? current.filter(a => a !== activity)
      : [...current, activity];
    
    updateFormData({
      recovery: { ...formData.recovery, mobilityWork: updated }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recovery & Injury Prevention</h2>
      
      <div>
        <label className="block text-sm font-medium">Warm-up Routine</label>
        <textarea
          value={formData.recovery.warmupRoutine}
          onChange={(e) => updateFormData({
            recovery: { ...formData.recovery, warmupRoutine: e.target.value }
          })}
          placeholder="Describe your typical warm-up routine..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Cool-down Routine</label>
        <textarea
          value={formData.recovery.cooldownRoutine}
          onChange={(e) => updateFormData({
            recovery: { ...formData.recovery, cooldownRoutine: e.target.value }
          })}
          placeholder="Describe your typical cool-down routine..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mobility Work</label>
        {[
          'Foam Rolling',
          'Dynamic Stretching',
          'Static Stretching',
          'Yoga',
          'Massage',
          'Compression',
          'Ice/Heat Therapy'
        ].map((activity) => (
          <label key={activity} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={formData.recovery.mobilityWork.includes(activity)}
              onChange={() => handleMobilityWorkChange(activity)}
              className="rounded border-gray-300"
            />
            <span>{activity}</span>
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium">Therapy Frequency</label>
        <select
          value={formData.recovery.therapyFrequency}
          onChange={(e) => updateFormData({
            recovery: { ...formData.recovery, therapyFrequency: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select frequency</option>
          <option value="never">Never</option>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="weekly">Weekly</option>
          <option value="asNeeded">As needed</option>
        </select>
      </div>
    </div>
  );
}