import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ff7b42] via-[#e94b82] to-[#ff6b5a] text-white py-20 px-4">
      {/* Floating gradient blobs */}
      <div className="floating-blob w-96 h-96 bg-orange-500/30 top-10 left-10" />
      <div className="floating-blob w-80 h-80 bg-pink-500/30 bottom-20 right-20" />
      <div className="floating-blob w-72 h-72 bg-coral-500/30 top-40 right-40" />
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-bounce-slow"
        >
          <ChefHat className="w-12 h-12" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-7xl font-bold mb-6 tracking-tight font-poppins"
        >
          <span className="inline-block">FoodAI</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl md:text-3xl mb-4 text-white/95 font-semibold"
        >
          Your AI Recipe Creator & Calorie Tracker
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-white/80 max-w-2xl mx-auto"
        >
          Turn ingredients into delicious, healthy recipes with AI. Get instant nutrition info and cook with confidence! 🍳
        </motion.p>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
    </section>
  );
};
