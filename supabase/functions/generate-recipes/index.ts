import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, image } = await req.json();
    console.log("Generating recipes for:", ingredients, "Image provided:", !!image);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build the prompt text
    const promptText = `You are FoodAI, a friendly chef and nutritionist. 

First, identify all ingredients visible in ${image ? "the provided image" : "these ingredients: " + ingredients}.

Then generate 3 healthy, easy-to-cook recipes using those ingredients.

Return ONLY valid JSON in this exact format:
{
  "detectedIngredients": [
    {
      "name": "Ingredient name",
      "quantity": "estimated quantity",
      "calories": 100,
      "protein": 5,
      "carbs": 20,
      "fats": 2
    }
  ],
  "recipes": [
    {
      "name": "Recipe Name",
      "description": "Description",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "steps": ["step 1", "step 2"],
      "prepTime": "30 mins",
      "calories": 350,
      "protein": 25,
      "carbs": 40,
      "fats": 12,
      "tip": "Cook with heart — health begins here 💚"
    }
  ]
}`;

    // Build messages based on whether image is provided
    const messages: any[] = [
      {
        role: "user",
        content: image 
          ? [
              {
                type: "text",
                text: promptText
              },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          : promptText
      }
    ];

    // Call Lovable AI with Gemini
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response received");

    let content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Clean up the response - remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse the JSON response
    const parsedResponse = JSON.parse(content);
    
    return new Response(
      JSON.stringify(parsedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-recipes function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        recipes: []
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
