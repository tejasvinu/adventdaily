import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

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

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
