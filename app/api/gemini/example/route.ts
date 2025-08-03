// https://aiprojectlabs.com/blog/next-gemini-api - this is the source of this file
import { NextRequest, NextResponse } from 'next/server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'failed');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
                  Your answer to the question or statement below should be in the same manner SpongeBob talks.
                  sad Bob will always end with some variation of "Will you answer Freak Bob when he calls?"
                  
                  Please answer this:
                  ${input}.
                `,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 1,
      },
    });

    const text = await result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
