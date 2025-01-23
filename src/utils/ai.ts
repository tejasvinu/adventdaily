import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

// Update the helper function to use chat session
const generateWithAI = async (prompt: string) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
};

// Add this helper function to clean AI response
const cleanJsonResponse = (text: string) => {
  // Remove markdown code blocks if present
  let cleaned = text.replace(/```json\n|\```\n|```/g, '');
  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();
  // Attempt to find the first { and last }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return cleaned;
};

export async function generateAssessmentReview(assessmentData: any) {
  const prompt = `Write a direct, personal assessment review addressing the athlete using "you/your". Based on this data:
    ${JSON.stringify(assessmentData, null, 2)}
    
    Cover only:
    1. Your current fitness snapshot
    2. Your key strengths
    3. Areas to focus on
    4. Specific training recommendations
    5. Success probability for your goals
    
    Keep it concise and actionable. No fluff or generic statements.`;

  return generateWithAI(prompt);
}

export async function generateWorkoutPlanAI(assessmentData: any, weekCount: number = 8) {
  const prompt = `Generate a complete ${weekCount}-week structured workout plan based on this assessment data:
    ${JSON.stringify(assessmentData, null, 2)}
    
    Return a valid JSON object (without markdown formatting) with this structure:
    {
      "id": string,
      "name": string,
      "duration": number,
      "weeks": [
        {
          "weekNumber": number,
          "theme": string,
          "goals": string[],
          "workouts": {
            "YYYY-MM-DD": {
              "type": string,
              "description": string,
              "intensity": string,
              "duration": string,
              "category": "Strength" | "Cardio" | "Recovery",
              "notes": string
            }
          }
        }
      ]
    }

    Requirements:
    1. Generate workouts for ALL days of each week
    2. Ensure proper progression over 8 weeks
    3. Include rest/recovery days
    4. Alternate workout types (Strength, Cardio, Recovery)
    5. Consider user's available time and equipment
    6. Include proper rest between similar workouts
    7. Follow progression principles:
       - Gradual intensity increase
       - Volume progression
       - Recovery weeks (4, 8)
    8. Workout distribution:
       - 2-3 Strength sessions per week
       - 3-4 Cardio sessions per week
       - 1-2 Recovery/flexibility sessions
       - No more than 2 high-intensity days in a row
    
    Consider the user's:
    - Current fitness level: ${assessmentData.fitnessLevel}
    - Available equipment: ${assessmentData.equipment}
    - Time constraints: ${assessmentData.timeAvailable}
    - Injury history: ${assessmentData.injuries}
    - Goals: ${assessmentData.goals}`;

  try {
    const response = await generateWithAI(prompt);
    const cleanedResponse = cleanJsonResponse(response);
    
    try {
      const plan = JSON.parse(cleanedResponse);
      
      // Validate plan structure
      if (!plan.weeks || plan.weeks.length !== weekCount) {
        throw new Error('Invalid plan structure: missing weeks or incorrect week count');
      }

      // Validate each week has workouts for all days
      for (const week of plan.weeks) {
        if (Object.keys(week.workouts).length < 7) {
          throw new Error(`Week ${week.weekNumber} is missing workouts`);
        }
      }

      return plan;
    } catch (parseError) {
      console.error('Failed to parse cleaned response:', cleanedResponse);
      throw new Error('Invalid JSON format in AI response');
    }
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate workout plan');
  }
}

export async function generateWorkoutDetails(
  workout: WorkoutData,
  params: {
    userLevel: string;
    weekNumber: number;
    fitnessScore: number;
    injuries: string[];
  }
) {
  const prompt = `Generate detailed workout instructions for a ${params.userLevel} level athlete in week ${params.weekNumber} of training.
    Base workout: ${JSON.stringify(workout)}
    Fitness score: ${params.fitnessScore}
    Injuries to consider: ${params.injuries.join(', ')}
    
    Provide:
    1. Warm-up routine
    2. Main workout with specific exercises, sets, reps, and intensities
    3. Cool-down protocol
    4. Form cues and technique tips
    5. Recovery recommendations
    
    Format as JSON with sections for warmup, mainSet, cooldown, and notes.`;

  try {
    const response = await generateWithAI(prompt);
    const cleanedResponse = cleanJsonResponse(response);
    
    try {
      return JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse cleaned response:', cleanedResponse);
      throw new Error('Invalid JSON format in AI response');
    }
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate workout details');
  }
}
