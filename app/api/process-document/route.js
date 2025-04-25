import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req) {
  try {
    const { content, type } = await req.json();

    // System prompt for financial document analysis
    const systemPrompt = `You are an expert financial analyst AI assistant. Analyze the following ${type} document and provide:
1. Key financial metrics and their trends
2. Important insights and patterns
3. Potential risks or concerns
4. Recommendations based on the analysis
Format the response in a clear, structured manner.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content }
      ],
      temperature: 0.3,
    });

    return NextResponse.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    );
  }
}