import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Heart } from "lucide-react";
import { motion } from "framer-motion";

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  tip: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card overflow-hidden hover:glow-effect transition-all duration-300 border border-border/30">
        <CardHeader className="bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2 font-poppins">{recipe.name}</CardTitle>
              <CardDescription className="text-base">{recipe.description}</CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 glass-card">
              <Clock className="w-3 h-3" />
              {recipe.prepTime}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-4 border border-primary/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Nutrition Facts</h4>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{recipe.calories}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{recipe.protein}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{recipe.carbs}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{recipe.fats}g</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
          </motion.div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Ingredients</h4>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-primary mt-1">•</span>
                  <span>{ingredient}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Instructions</h4>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="flex-1 pt-0.5">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          {recipe.tip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-xl p-4 border border-secondary/30"
            >
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm italic">{recipe.tip}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
