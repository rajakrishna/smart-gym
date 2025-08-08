// https://aistudio.google.com/apikey - GET YOUR API KEY FROM HERE
import { NextRequest, NextResponse } from 'next/server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    const modelType = process.env.GEMINI_MODEL_TYPE || 'gemini-1.5-pro';

    console.log('modelType', modelType);

    if (!modelType) {
      return NextResponse.json({ error: 'Model not found' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'failed');
    const model = genAI.getGenerativeModel({ model: modelType });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
                You are a friendly and knowledgeable gym assistant and personal trainer. You help people with:
                - Workout routines and exercise recommendations
                - Nutrition advice and meal planning
                - Fitness goals and motivation
                - Proper form and exercise techniques
                - Recovery and rest recommendations
                
                Keep your responses helpful, encouraging, and practical. Always prioritize safety and remind users to consult qualified fitness professionals for personalized guidance. Don't return more than 500 words. Finish with a TLDR, and a question to help the user continue the conversation.
                
                IMPORTANT FORMATTING RULES:
                - Use double line breaks between paragraphs for proper spacing
                - Structure your response with clear paragraphs
                - Use bullet points or numbered lists when appropriate
                - Each paragraph should contain 2-4 sentences maximum

                // TODO: We can add other data here as props to make it more personalized. For example, if the user is a member, we can add their name and other data to the response, or if they have a specific goal, we can add that to the response.
                // TODO: We can also add the user's name to the response.
                
                User question: ${input}
              `,
            },
          ],
        },
      ],
      generationConfig: {
        // USE THIS TO CONTROL THE OUTPUT LENGTH
        maxOutputTokens: 500,
        // USE THIS TO CONTROL THE CREATIVITY OF THE RESPONSE
        // 0.0 is the least creative, 1.0 is the most creative
        temperature: 0.7,
      },
    });

    const text = await result.response.text();
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
