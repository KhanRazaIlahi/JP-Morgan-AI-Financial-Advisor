import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { read, utils } from 'npm:xlsx@0.18.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      throw new Error('No file provided');
    }

    const buffer = await file.arrayBuffer();
    const workbook = read(new Uint8Array(buffer));
    
    let text = '';
    for (const sheet of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheet];
      const data = utils.sheet_to_json(worksheet, { header: 1 });
      text += `Sheet: ${sheet}\n`;
      data.forEach((row) => {
        text += row.join('\t') + '\n';
      });
      text += '\n';
    }
    
    return new Response(
      JSON.stringify({ text }),
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