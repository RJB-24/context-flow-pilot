
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API key');
    }

    const { messages, assistantType } = await req.json();

    // Set system message based on assistant type
    const systemMessage = getSystemMessage(assistantType);
    
    // Prepare the messages array for OpenAI API
    const apiMessages = [
      { role: "system", content: systemMessage },
      ...messages
    ];

    // Make request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using a cost-effective model
        messages: apiMessages,
        temperature: 0.7,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'Unknown error from OpenAI API');
    }

    return new Response(JSON.stringify({ 
      reply: result.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in assistant-chat function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Helper function to get system messages based on assistant type
function getSystemMessage(assistantType: string): string {
  switch (assistantType) {
    case "coding":
      return "You are an expert coding assistant. Provide helpful, accurate code assistance, best practices, debugging help, and explanations. Focus on writing clean, efficient code. When giving examples, ensure they're well-documented and follow modern conventions.";
    
    case "email":
      return "You are an email writing assistant. Help craft professional, clear, and effective emails. Suggest appropriate tone, structure, and language based on the context. Provide template suggestions and help with optimizing email content for the intended audience.";
    
    case "document":
      return "You are a document assistant. Help create well-structured documents, suggest formatting improvements, assist with clarity and coherence, and provide high-quality content suggestions. Consider formatting, style, and organization in your recommendations.";
    
    case "research":
      return "You are a research assistant. Help with finding relevant information, synthesizing complex topics, suggesting credible sources, and organizing research findings. Provide comprehensive but concise summaries of topics with important details highlighted.";
    
    case "meeting":
      return "You are a meeting assistant. Help prepare agendas, summarize discussion points, track action items, and create effective meeting notes. Suggest meeting structures and help with time management strategies for productive discussions.";
    
    default:
      return "You are a helpful assistant providing accurate, relevant, and useful information. Answer questions clearly and concisely, and always try to provide the most helpful response possible.";
  }
}
