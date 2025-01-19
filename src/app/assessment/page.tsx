'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoStep from '@/components/assessment/PersonalInfoStep';
import ExperienceStep from '@/components/assessment/ExperienceStep';
import CurrentFitnessStep from '@/components/assessment/CurrentFitnessStep';
import MedicalStep from '@/components/assessment/MedicalStep';
import TrainingStep from '@/components/assessment/TrainingStep';
import { AssessmentFormData } from '@/types/assessment';

const initialFormState: AssessmentFormData = {
  personalInfo: {
    age: '',
    gender: '',
    location: ''
  },
  experience: {
    hasCompeted: false,
    completedDistances: [],
    raceCount: '',
    recentRaceTimes: [],
    previousChallenges: [],
    primaryGoal: '',
    targetRaceDate: ''
  },
  currentFitness: {
    swim: {
      comfortLevel: '',
      maxDistance: '',
      technique: '',
      timeFor400m: ''
    },
    bike: {
      frequency: '',
      maxDistance: '',
      averageSpeed: '',
      timeFor20k: ''
    },
    run: {
      frequency: '',
      maxDistance: '',
      averagePace: '',
      timeFor5k: ''
    }
  },
  medical: {
    hasInjuries: false,
    injuries: '',
    medications: [],
    allergies: [],
    hasActivityRestrictions: false,
    activityRestrictions: ''
  },
  training: {
    weeklyHours: '',
    availableDays: [],
    preferredTime: '',
    hasPoolAccess: false,
    hasGymAccess: false,
    trainingPreference: '',
    additionalNotes: ''
  }
};

export default function Assessment() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');

  const updateFormData = (newData: Partial<AssessmentFormData>) => {
    setError('');
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Personal Info
        if (!formData.personalInfo.age || !formData.personalInfo.gender) {
          setError('Please fill in all required fields');
          return false;
        }
        if (parseInt(formData.personalInfo.age) < 16 || parseInt(formData.personalInfo.age) > 100) {
          setError('Please enter a valid age between 16 and 100');
          return false;
        }
        break;
        
      case 2: // Experience
        if (!formData.experience.primaryGoal || !formData.experience.targetRaceDate) {
          setError('Please select your goal and target race date');
          return false;
        }
        const targetDate = new Date(formData.experience.targetRaceDate);
        const today = new Date();
        if (targetDate <= today) {
          setError('Race date must be in the future');
          return false;
        }
        break;
        
      case 3: // Current Fitness
        const { swim, bike, run } = formData.currentFitness;
        
        // Swimming required fields
        if (!swim.comfortLevel || !swim.maxDistance || !swim.technique) {
          setError('Please complete all required swimming assessments: comfort level, maximum distance, and technique');
          return false;
        }
        
        // Cycling required fields
        if (!bike.frequency || !bike.maxDistance || !bike.averageSpeed) {
          setError('Please complete all required cycling assessments: frequency, maximum distance, and average speed');
          return false;
        }
        
        // Running required fields
        if (!run.frequency || !run.maxDistance || !run.averagePace) {
          setError('Please complete all required running assessments: frequency, maximum distance, and average pace');
          return false;
        }
        
        // Time format validation
        const timeRegex = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
        if (swim.timeFor400m && !timeRegex.test(swim.timeFor400m)) {
          setError('Please enter valid time format for 400m swim (HH:MM:SS)');
          return false;
        }
        if (bike.timeFor20k && !timeRegex.test(bike.timeFor20k)) {
          setError('Please enter valid time format for 20km bike (HH:MM:SS)');
          return false;
        }
        if (run.timeFor5k && !timeRegex.test(run.timeFor5k)) {
          setError('Please enter valid time format for 5km run (HH:MM:SS)');
          return false;
        }
        break;
        
      case 4: // Medical
        if (formData.medical.hasInjuries && !formData.medical.injuries) {
          setError('Please describe your injuries');
          return false;
        }
        if (formData.medical.hasActivityRestrictions && !formData.medical.activityRestrictions) {
          setError('Please describe your activity restrictions');
          return false;
        }
        break;
        
      case 5: // Training
        if (!formData.training.weeklyHours) {
          setError('Please select your available training hours');
          return false;
        }
        if (formData.training.availableDays.length === 0) {
          setError('Please select at least one training day');
          return false;
        }
        if (!formData.training.preferredTime) {
          setError('Please select your preferred training time');
          return false;
        }
        if (formData.training.hasPoolAccess === undefined || formData.training.hasGymAccess === undefined) {
          setError('Please indicate your access to facilities');
          return false;
        }
        if (!formData.training.trainingPreference) {
          setError('Please select your training preference');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ExperienceStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <CurrentFitnessStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <MedicalStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <TrainingStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Ensure all arrays are properly initialized
      const submissionData = {
        ...formData,
        experience: {
          ...formData.experience,
          completedDistances: formData.experience.completedDistances || [],
          recentRaceTimes: formData.experience.recentRaceTimes || [],
          previousChallenges: formData.experience.previousChallenges || []
        },
        medical: {
          ...formData.medical,
          medications: formData.medical.medications || [],
          allergies: formData.medical.allergies || []
        },
        training: {
          ...formData.training,
          availableDays: formData.training.availableDays || []
        }
      };

      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (res.ok) {
        // Verify the returned assessment data
        if (data.assessment) {
          console.log('Assessment stored successfully:', data.assessment);
          router.push('/dashboard');
        } else {
          setError('Assessment saved but verification failed');
        }
      } else {
        setError(data.message || 'Failed to save assessment');
      }
    } catch (err) {
      setError('Error submitting assessment');
      console.error('Error submitting assessment:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-1/5 h-2 rounded ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 text-center">
            Step {currentStep} of 5
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded"
              >
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
