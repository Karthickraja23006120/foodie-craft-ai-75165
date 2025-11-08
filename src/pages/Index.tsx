import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeCard, Recipe } from "@/components/RecipeCard";
import { CalorieTracker, DetectedIngredient } from "@/components/CalorieTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (ingredients: string, image?: File) => {
    setIsLoading(true);
    setRecipes([]);
    setDetectedIngredients([]);

    try {
      let imageBase64 = "";
      if (image) {
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      }

      const { data, error } = await supabase.functions.invoke("generate-recipes", {
        body: { ingredients, image: imageBase64 },
      });

      if (error) throw error;

      if (data?.detectedIngredients) {
        setDetectedIngredients(data.detectedIngredients);
      }

      if (data?.recipes) {
        setRecipes(data.recipes);
        toast({
          title: "Analysis complete! 🎉",
          description: `Found ${data.detectedIngredients?.length || 0} ingredients and ${data.recipes.length} recipes`,
        });
      }
    } catch (error: any) {
      console.error("Error generating recipes:", error);
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Failed to generate recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-[#001a1f] via-[#002833] to-[#001014] relative overflow-hidden"
    >
      {/* Floating gradient blobs in background */}
      <div className="floating-blob w-[500px] h-[500px] bg-[#00F3FF]/20 -top-20 -left-20" />
      <div className="floating-blob w-[400px] h-[400px] bg-[#00D4FF]/20 top-1/3 -right-20" />
      <div className="floating-blob w-[600px] h-[600px] bg-[#00B8D4]/20 bottom-0 left-1/4" />
      
      <div className="relative z-10">
        <Hero />
        <div className="py-12 space-y-12">
          <IngredientInput onGenerate={handleGenerate} isLoading={isLoading} />
          
          {detectedIngredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CalorieTracker ingredients={detectedIngredients} />
            </motion.div>
          )}

          {recipes.length > 0 && (
            <section className="container mx-auto max-w-6xl px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-center gradient-text font-poppins"
              >
                Your Personalized Recipes 🍽️
              </motion.h2>
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
