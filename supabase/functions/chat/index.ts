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

    return new Response(
      JSON.stringify({ response: completion.choices[0].message }),
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