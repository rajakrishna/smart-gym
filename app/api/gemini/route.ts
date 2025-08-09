import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

const FITNESS_ONLY_SYSTEM = `
You are a friendly and knowledgeable gym assistant and personal trainer.
ONLY cover fitness and nutrition topics:
- Nutrition advice and meal planning
- Workout routines and exercise recommendations
- Fitness goals and motivation
- Proper form and exercise techniques
- Recovery and rest recommendations

Keep your responses helpful, encouraging, and practical.
Always prioritize safety and suggest consulting qualified fitness professionals for personalized guidance.
Don't return more than 500 words. Finish with a TLDR, and a question to help the user continue the conversation.

IMPORTANT FORMATTING RULES:
- Use double line breaks between paragraphs for proper spacing
- Structure your response with clear paragraphs
- Use bullet points or numbered lists when appropriate
- Each paragraph should contain 2–4 sentences maximum
`;

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    const modelType = process.env.GEMINI_MODEL_TYPE || 'gemini-1.5-flash';

    const { text } = await generateText({
      model: google(modelType), // reads GOOGLE_GENERATIVE_AI_API_KEY
      system: FITNESS_ONLY_SYSTEM,
      prompt: `User question: ${input}`,
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({ text });
  } catch (err) {
    console.error('AI SDK error:', err);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
