import { FormStepProps } from '@/types/assessment';

export default function FacilitiesStep({ formData, updateFormData }: FormStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Training Facilities & Environment</h2>
      
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.facilities.hasOpenWaterAccess}
            onChange={(e) => updateFormData({
              facilities: { ...formData.facilities, hasOpenWaterAccess: e.target.checked }
            })}
            className="rounded border-gray-300"
          />
          <span>Access to open water swimming</span>
        </label>
        
        {formData.facilities.hasOpenWaterAccess && (
          <textarea
            value={formData.facilities.openWaterDetails}
            onChange={(e) => updateFormData({
              facilities: { ...formData.facilities, openWaterDetails: e.target.value }
            })}
            placeholder="Describe the open water facility (lake, ocean, etc.)"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.facilities.hasBikeTrainer}
            onChange={(e) => updateFormData({
              facilities: { ...formData.facilities, hasBikeTrainer: e.target.checked }
            })}
            className="rounded border-gray-300"
          />
          <span>Access to bike trainer</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.facilities.hasTreadmill}
            onChange={(e) => updateFormData({
              facilities: { ...formData.facilities, hasTreadmill: e.target.checked }
            })}
            className="rounded border-gray-300"
          />
          <span>Access to treadmill</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">Weather Constraints</label>
        <textarea
          value={formData.facilities.weatherConstraints}
          onChange={(e) => updateFormData({
            facilities: { ...formData.facilities, weatherConstraints: e.target.value }
          })}
          placeholder="Describe any weather-related training limitations..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={3}
        />
      </div>
    </div>
  );
}
