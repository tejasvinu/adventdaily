import { FormStepProps } from '@/types/assessment';

export default function PhysicalMetricsStep({ formData, updateFormData }: FormStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Physical Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Height (cm)</label>
          <input
            type="number"
            value={formData.physicalMetrics.height}
            onChange={(e) => updateFormData({
              physicalMetrics: { ...formData.physicalMetrics, height: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Weight (kg)</label>
          <input
            type="number"
            value={formData.physicalMetrics.weight}
            onChange={(e) => updateFormData({
              physicalMetrics: { ...formData.physicalMetrics, weight: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Body Fat % (optional)</label>
          <input
            type="number"
            value={formData.physicalMetrics.bodyFat}
            onChange={(e) => updateFormData({
              physicalMetrics: { ...formData.physicalMetrics, bodyFat: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Resting Heart Rate (bpm)</label>
          <input
            type="number"
            value={formData.physicalMetrics.restingHeartRate}
            onChange={(e) => updateFormData({
              physicalMetrics: { ...formData.physicalMetrics, restingHeartRate: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Max Heart Rate (bpm)</label>
          <input
            type="number"
            value={formData.physicalMetrics.maxHeartRate}
            onChange={(e) => updateFormData({
              physicalMetrics: { ...formData.physicalMetrics, maxHeartRate: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
