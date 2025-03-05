import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const GenerateLeadsButton = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Search Icon */}
        <div className="p-3 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-md">
            <Search className="h-8 w-8 text-white" />
        </div>      

      {/* Animated Button */}
      <motion.button
        className="relative px-6 py-3 text-white font-semibold rounded-lg shadow-xl 
                   bg-gradient-to-br from-[#C552D6] via-[#E98AF0] to-[#F0A8F8]
                   hover:scale-[1.02] transform transition-all duration-300
                   ring-[#E98AF0] hover:ring-[#FF60F6] animate-pulse"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Leads
      </motion.button>
    </div>
  );
};

export default GenerateLeadsButton;
