import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Add system prompt for JP Morgan context
    const systemMessage = {
      role: "system",
      content: `You are JP Morgan's AI Financial Advisor. Your role is to:
1. Provide expert financial guidance
2. Explain JP Morgan's products and services
3. Help analyze financial documents
4. Make personalized recommendations
Always maintain a professional, helpful tone and focus on accurate, actionable advice.`
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    return NextResponse.json({ response: completion.choices[0].message });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}