import { FormStepProps } from '@/types/assessment';

export default function MetricsStep({ formData, updateFormData }: FormStepProps) {
  const handleMetricsChange = (metric: string) => {
    const current = formData.metrics.trackedMetrics;
    const updated = current.includes(metric)
      ? current.filter(m => m !== metric)
      : [...current, metric];
    
    updateFormData({
      metrics: { ...formData.metrics, trackedMetrics: updated }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Training Metrics & Feedback</h2>
      
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.metrics.usesWearableDevice}
            onChange={(e) => updateFormData({
              metrics: { ...formData.metrics, usesWearableDevice: e.target.checked }
            })}
            className="rounded border-gray-300"
          />
          <span>I use a wearable device for training</span>
        </label>
      </div>

      {formData.metrics.usesWearableDevice && (
        <div>
          <label className="block text-sm font-medium">Device Type</label>
          <select
            value={formData.metrics.deviceType}
            onChange={(e) => updateFormData({
              metrics: { ...formData.metrics, deviceType: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select device type</option>
            <option value="garmin">Garmin</option>
            <option value="apple">Apple Watch</option>
            <option value="polar">Polar</option>
            <option value="suunto">Suunto</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Metrics Tracked</label>
        {[
          'Heart Rate',
          'Pace',
          'Distance',
          'Power',
          'Cadence',
          'Sleep',
          'Recovery',
          'HRV'
        ].map((metric) => (
          <label key={metric} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={formData.metrics.trackedMetrics.includes(metric)}
              onChange={() => handleMetricsChange(metric)}
              className="rounded border-gray-300"
            />
            <span>{metric}</span>
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium">Preferred RPE Scale</label>
        <select
          value={formData.metrics.preferredRPEScale}
          onChange={(e) => updateFormData({
            metrics: { ...formData.metrics, preferredRPEScale: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select RPE scale</option>
          <option value="1-10">1-10 Scale</option>
          <option value="6-20">Borg 6-20 Scale</option>
          <option value="zones">Heart Rate Zones</option>
        </select>
      </div>
    </div>
  );
}
