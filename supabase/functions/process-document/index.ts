import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "npm:openai@4.28.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

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

    const analysis = completion.choices[0].message.content;

    return new Response(
      JSON.stringify({ analysis }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});