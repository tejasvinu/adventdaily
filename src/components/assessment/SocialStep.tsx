import { FormStepProps } from '@/types/assessment';

export default function SocialStep({ formData, updateFormData }: FormStepProps) {
  const handleCommunityChange = (community: string) => {
    const current = formData.social.onlineCommunities;
    const updated = current.includes(community)
      ? current.filter(c => c !== community)
      : [...current, community];
    
    updateFormData({
      social: { ...formData.social, onlineCommunities: updated }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Social Support & Training Community</h2>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.social.needsGroupTraining}
            onChange={(e) => updateFormData({
              social: { ...formData.social, needsGroupTraining: e.target.checked }
            })}
            className="rounded border-gray-300"
          />
          <span>I prefer group training sessions</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.social.hasTrainingPartner}
            onChange={(e) => updateFormData({
              social: { ...formData.social, hasTrainingPartner: e.target.checked }
            })}
            className="rounded border-gray-300"
          />
          <span>I have a training partner</span>
        </label>
      </div>

      {formData.social.hasTrainingPartner && (
        <div>
          <label className="block text-sm font-medium">Training Partner's Fitness Level</label>
          <select
            value={formData.social.partnerFitnessLevel}
            onChange={(e) => updateFormData({
              social: { ...formData.social, partnerFitnessLevel: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select fitness level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="elite">Elite</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Online Communities & Platforms</label>
        {[
          'Strava',
          'Training Peaks',
          'Garmin Connect',
          'Facebook Groups',
          'Local Club',
          'Discord',
          'Other'
        ].map((community) => (
          <label key={community} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={formData.social.onlineCommunities.includes(community)}
              onChange={() => handleCommunityChange(community)}
              className="rounded border-gray-300"
            />
            <span>{community}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
