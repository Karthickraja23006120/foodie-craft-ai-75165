import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IngredientInputProps {
  onGenerate: (ingredients: string, image?: File) => void;
  isLoading: boolean;
}

export const IngredientInput = ({ onGenerate, isLoading }: IngredientInputProps) => {
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [sparkle, setSparkle] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim() && !image) {
      toast({
        title: "Missing input",
        description: "Please enter ingredients or upload a fridge photo",
        variant: "destructive",
      });
      return;
    }
    setSparkle(true);
    setTimeout(() => setSparkle(false), 600);
    onGenerate(ingredients, image || undefined);
  };

  return (
    <section className="container mx-auto max-w-3xl px-4 -mt-10 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ingredients" className="text-lg font-semibold text-foreground">
              What's in your kitchen? 🥗
            </Label>
            <Input
              id="ingredients"
              placeholder="e.g., eggs, spinach, tomatoes, cheese..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="h-14 text-lg glass-card border-border/50 focus:border-primary transition-all"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold text-foreground">Or upload a fridge photo 📸</Label>
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="relative overflow-hidden glass-card border-border/50 hover:border-primary hover:glow-effect transition-all"
                  disabled={isLoading}
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {image ? "Change Photo" : "Upload Photo"}
                </Button>
              </motion.div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <img
                    src={imagePreview}
                    alt="Fridge preview"
                    className="h-20 w-20 rounded-lg object-cover border-2 border-primary/50"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-effect transition-all relative overflow-hidden"
              disabled={isLoading}
            >
              {sparkle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-white/30 rounded-md"
                />
              )}
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Cooking up recipes...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Recipes
                </span>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};
