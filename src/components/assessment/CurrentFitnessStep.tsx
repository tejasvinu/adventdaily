import { FormStepProps as BaseFormStepProps, AssessmentFormData } from '@/types/assessment';

// Discipline-specific interfaces
interface SwimData {
  comfortLevel: string;
  maxDistance: string;
  technique: string;
  timeFor400m: string;
  [key: string]: string;
}

interface BikeData {
  frequency: string;
  maxDistance: string;
  averageSpeed: string;
  timeFor20k: string;
  [key: string]: string;
}

interface RunData {
  frequency: string;
  maxDistance: string;
  averagePace: string;
  timeFor5k: string;
  [key: string]: string;
}

type ExtendedAssessmentFormData = Omit<AssessmentFormData, 'currentFitness'> & {
  currentFitness: {
    swim: SwimData;
    bike: BikeData;
    run: RunData;
  };
};

interface FormStepProps extends BaseFormStepProps {
  formData: ExtendedAssessmentFormData;
  updateFormData: (data: Partial<ExtendedAssessmentFormData>) => void;
}

interface FieldBase {
  label: string;
}

interface SelectField extends FieldBase {
  type: 'select';
  options: string[];
}

interface TimeInputField extends FieldBase {
  type: 'timeInput';
  placeholder: string;
}

interface NumberField extends FieldBase {
  type: 'number';
}

type FieldConfig = SelectField | TimeInputField | NumberField;

interface DisciplineFields {
  [key: string]: FieldConfig;
}

interface DisciplineConfig {
  title: string;
  fields: DisciplineFields;
}

export default function CurrentFitnessStep({ formData, updateFormData }: FormStepProps) {
  const disciplines: Record<string, DisciplineConfig> = {
    swim: {
      title: 'Swimming',
      fields: {
        comfortLevel: {
          type: 'select',
          label: 'Comfort Level in Water',
          options: ['Not at all', 'Beginner', 'Somewhat Comfortable', 'Comfortable', 'Very Comfortable']
        },
        maxDistance: {
          type: 'select',
          label: 'Maximum Distance (meters)',
          options: ['25', '50', '100', '200', '400', '800', '1500', '2000+']
        },
        technique: {
          type: 'select',
          label: 'Technique Self-Assessment',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        },
        timeFor400m: {
          type: 'timeInput',
          label: '400m Time (Optional)',
          placeholder: 'HH:MM:SS'
        }
      }
    },
    bike: {
      title: 'Cycling',
      fields: {
        frequency: {
          type: 'select',
          label: 'Training Frequency',
          options: ['Never', 'Rarely', '1-2 times/week', '3-4 times/week', '5+ times/week']
        },
        maxDistance: {
          type: 'select',
          label: 'Maximum Distance (km)',
          options: ['5', '10', '20', '40', '60', '80', '100+']
        },
        averageSpeed: {
          type: 'number',
          label: 'Average Speed (km/h)'
        },
        timeFor20k: {
          type: 'timeInput',
          label: '20km Time (Optional)',
          placeholder: 'HH:MM:SS'
        }
      }
    },
    run: {
      title: 'Running',
      fields: {
        frequency: {
          type: 'select',
          label: 'Training Frequency',
          options: ['Never', 'Rarely', '1-2 times/week', '3-4 times/week', '5+ times/week']
        },
        maxDistance: {
          type: 'select',
          label: 'Maximum Distance (km)',
          options: ['1', '3', '5', '10', '15', '21', '42']
        },
        averagePace: {
          type: 'timeInput',
          label: 'Average Pace (min/km)',
          placeholder: 'HH:MM:SS'
        },
        timeFor5k: {
          type: 'timeInput',
          label: '5km Time (Optional)',
          placeholder: 'HH:MM:SS'
        }
      }
    }
  };

  const formatTimeInput = (value: string) => {
    // Remove non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}:${numbers.slice(4, 6)}`;
    }
  };

  const handleTimeInput = (discipline: keyof ExtendedAssessmentFormData['currentFitness'], field: string, value: string) => {
    const formattedTime = formatTimeInput(value);
    handleFieldChange(discipline, field, formattedTime);
  };

  const handleFieldChange = (discipline: keyof ExtendedAssessmentFormData['currentFitness'], field: string, value: string) => {
    updateFormData({
      currentFitness: {
        ...formData.currentFitness,
        [discipline]: {
          ...formData.currentFitness[discipline],
          [field]: value
        }
      }
    });
  };

  const isTimeInputField = (field: FieldConfig): field is TimeInputField => {
    return field.type === 'timeInput';
  };

  const isSelectField = (field: FieldConfig): field is SelectField => {
    return field.type === 'select';
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Current Fitness Assessment</h2>
      
      {Object.entries(disciplines).map(([discipline, data]) => (
        <div key={discipline} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">{data.title}</h3>
          <div className="space-y-4">
            {Object.entries(data.fields).map(([field, fieldData]) => (
              <div key={field}>
                <label htmlFor={`${discipline}-${field}`} className="block text-sm font-medium mb-2">
                  {fieldData.label}
                </label>
                {isTimeInputField(fieldData) ? (
                  <input
                    id={`${discipline}-${field}`}
                    type="text"
                    value={formData.currentFitness[discipline as keyof ExtendedAssessmentFormData['currentFitness']][field] || ''}
                    onChange={(e) => handleTimeInput(discipline as keyof ExtendedAssessmentFormData['currentFitness'], field, e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-600"
                    placeholder={fieldData.placeholder}
                    pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                    maxLength={8}
                    aria-label={fieldData.label}
                  />
                ) : isSelectField(fieldData) ? (
                  <select
                    id={`${discipline}-${field}`}
                    value={formData.currentFitness[discipline as keyof ExtendedAssessmentFormData['currentFitness']][field] || ''}
                    onChange={(e) => handleFieldChange(discipline as keyof ExtendedAssessmentFormData['currentFitness'], field, e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-600"
                    required={!field.includes('Optional')}
                    aria-label={fieldData.label}
                  >
                    <option value="">Select {fieldData.label}</option>
                    {fieldData.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`${discipline}-${field}`}
                    type={fieldData.type}
                    value={formData.currentFitness[discipline as keyof ExtendedAssessmentFormData['currentFitness']][field] || ''}
                    onChange={(e) => handleFieldChange(discipline as keyof ExtendedAssessmentFormData['currentFitness'], field, e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-600"
                    required={!field.includes('Optional')}
                    aria-label={fieldData.label}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
