import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Flame } from "lucide-react";
import { motion } from "framer-motion";

export interface DetectedIngredient {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface CalorieTrackerProps {
  ingredients: DetectedIngredient[];
}

export const CalorieTracker = ({ ingredients }: CalorieTrackerProps) => {
  const totalCalories = ingredients.reduce((sum, ing) => sum + ing.calories, 0);
  const totalProtein = ingredients.reduce((sum, ing) => sum + ing.protein, 0);
  const totalCarbs = ingredients.reduce((sum, ing) => sum + ing.carbs, 0);
  const totalFats = ingredients.reduce((sum, ing) => sum + ing.fats, 0);

  return (
    <section className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <Apple className="w-8 h-8 text-primary animate-bounce-slow" />
        <h2 className="text-4xl font-bold text-center gradient-text font-poppins">
          Detected Ingredients
        </h2>
      </motion.div>
      
      <Card className="glass-card border border-border/30">
        <CardHeader className="bg-gradient-to-br from-primary/10 to-transparent">
          <CardTitle className="flex items-center gap-2 font-poppins">
            <Flame className="w-5 h-5 text-primary" />
            Total Nutritional Value
          </CardTitle>
          <CardDescription>
            Based on the ingredients detected in your fridge
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-4 mb-8 p-4 glass-card rounded-xl border border-primary/30"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{totalCalories}</p>
              <p className="text-sm text-muted-foreground">Total Calories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{totalProtein}g</p>
              <p className="text-sm text-muted-foreground">Protein</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{totalCarbs}g</p>
              <p className="text-sm text-muted-foreground">Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{totalFats}g</p>
              <p className="text-sm text-muted-foreground">Fats</p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Ingredient Breakdown</h3>
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 rounded-lg glass-card border border-border/30 hover:border-primary/50 hover:glow-effect transition-all"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{ingredient.name}</h4>
                  <p className="text-sm text-muted-foreground">{ingredient.quantity}</p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-primary">{ingredient.calories}</p>
                    <p className="text-xs text-muted-foreground">cal</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{ingredient.protein}g</p>
                    <p className="text-xs text-muted-foreground">protein</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{ingredient.carbs}g</p>
                    <p className="text-xs text-muted-foreground">carbs</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{ingredient.fats}g</p>
                    <p className="text-xs text-muted-foreground">fats</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
